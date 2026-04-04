const pool = require("../db/connection");


const getPendingApprovals = async (req,res)=>{

try{

const { user_id } = req.query;

const result = await pool.query(

`SELECT 
ars.approval_request_id,
ar.entity_type,
ar.entity_id,
ars.level_no,
ars.status,

pr.pr_number,
pr.customer_name,
pr.product_name,
pr.total_price

FROM approval_request_steps ars

JOIN approval_requests ar
ON ar.id = ars.approval_request_id

JOIN purchase_requests pr
ON pr.id = ar.entity_id

WHERE ars.approver_user_id=$1
AND ars.status='PENDING'
AND ar.current_level = ars.level_no`,

[user_id]

);

res.json(result.rows);

}
catch(error){

res.status(500).json(error.message);

}

};



const approveRequest = async (req,res)=>{

try{

await pool.query("BEGIN");

const requestId = req.params.id;
const { user_id } = req.body;


// validate step
const step = await pool.query(

`SELECT *
FROM approval_request_steps
WHERE approval_request_id=$1
AND approver_user_id=$2
AND status='PENDING'`,

[requestId,user_id]

);

if(step.rows.length === 0){

await pool.query("ROLLBACK");

return res.status(400).json({
message:"No pending approval for this user"
});

}


// approve step
await pool.query(

`UPDATE approval_request_steps
SET status='APPROVED',
action_at=NOW()
WHERE approval_request_id=$1
AND approver_user_id=$2`,

[requestId,user_id]

);


// insert action history
await pool.query(

`INSERT INTO approval_actions
(approval_request_id,level_no,action,action_by)
VALUES($1,$2,'APPROVE',$3)`,

[
requestId,
step.rows[0].level_no,
user_id
]

);


// check next level
const nextLevel = await pool.query(

`SELECT *
FROM approval_request_steps
WHERE approval_request_id=$1
AND level_no=$2`,

[
requestId,
step.rows[0].level_no + 1
]

);


if(nextLevel.rows.length > 0){

// move workflow forward
await pool.query(

`UPDATE approval_requests
SET current_level=current_level+1
WHERE id=$1`,

[requestId]

);

}else{

// final approval
await pool.query(

`UPDATE approval_requests
SET status='APPROVED'
WHERE id=$1`,

[requestId]

);

const request = await pool.query(

`SELECT entity_id
FROM approval_requests
WHERE id=$1`,

[requestId]

);

await pool.query(

`UPDATE purchase_requests
SET status='APPROVED'
WHERE id=$1`,

[request.rows[0].entity_id]

);

}


await pool.query("COMMIT");

res.json({
message:"Approved successfully"
});

}
catch(error){

await pool.query("ROLLBACK");

res.status(500).json(error.message);

}

};



const rejectRequest = async (req,res)=>{

try{

await pool.query("BEGIN");

const requestId = req.params.id;
const { user_id } = req.body;


// validate step
const step = await pool.query(

`SELECT *
FROM approval_request_steps
WHERE approval_request_id=$1
AND approver_user_id=$2
AND status='PENDING'`,

[requestId,user_id]

);

if(step.rows.length === 0){

await pool.query("ROLLBACK");

return res.status(400).json({
message:"No pending approval for this user"
});

}


// reject step
await pool.query(

`UPDATE approval_request_steps
SET status='REJECTED',
action_at=NOW()
WHERE approval_request_id=$1
AND approver_user_id=$2`,

[requestId,user_id]

);


// insert action history
await pool.query(

`INSERT INTO approval_actions
(approval_request_id,level_no,action,action_by)
VALUES($1,$2,'REJECT',$3)`,

[
requestId,
step.rows[0].level_no,
user_id
]

);


// reject request
await pool.query(

`UPDATE approval_requests
SET status='REJECTED'
WHERE id=$1`,

[requestId]

);


// reject PR
const request = await pool.query(

`SELECT entity_id
FROM approval_requests
WHERE id=$1`,

[requestId]

);

await pool.query(

`UPDATE purchase_requests
SET status='REJECTED'
WHERE id=$1`,

[request.rows[0].entity_id]

);


await pool.query("COMMIT");

res.json({
message:"Request rejected"
});

}
catch(error){

await pool.query("ROLLBACK");

res.status(500).json(error.message);

}

};



module.exports = {
getPendingApprovals,
approveRequest,
rejectRequest
};