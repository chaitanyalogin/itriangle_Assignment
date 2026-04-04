const pool = require("../db/connection");


// CREATE PR
const createPR = async (req,res)=>{

try{

const {
pr_number,
customer_name,
product_name,
quantity,
unit_price,
total_price,
created_by
} = req.body;


// Insert PR
const result = await pool.query(

`INSERT INTO purchase_requests
(pr_number,customer_name,product_name,quantity,unit_price,total_price,created_by)
VALUES($1,$2,$3,$4,$5,$6,$7)
RETURNING *`,

[
pr_number,
customer_name,
product_name,
quantity,
unit_price,
total_price,
created_by
]

);


// Get user role
const user = await pool.query(

`SELECT roles.role_name
FROM users
JOIN roles
ON users.role_id = roles.id
WHERE users.id=$1`,

[created_by]

);

const role = user.rows[0].role_name;


// Find rule
const rule = await pool.query(

`SELECT *
FROM approval_workflow_rules
WHERE workflow_id=1
AND condition_type='ROLE'
AND condition_value=$1`,

[role]

);

if(rule.rows.length === 0){

return res.status(400).json({
message:"No matching workflow rule"
});

}

const approvalRequired = rule.rows[0].approval_required;


// Decision
if(!approvalRequired){

await pool.query(

`UPDATE purchase_requests
SET status='APPROVED'
WHERE id=$1`,

[result.rows[0].id]

);

}


// Create approval request
if(approvalRequired){

const approvalRequest = await pool.query(

`INSERT INTO approval_requests
(entity_type,entity_id,action,workflow_id,created_by)
VALUES('PR',$1,'CREATE',1,$2)
RETURNING *`,

[result.rows[0].id,created_by]

);


const level = await pool.query(

`SELECT approver_user_id,level_no
FROM approval_levels
WHERE rule_id=$1`,

[rule.rows[0].id]

);


await pool.query(

`INSERT INTO approval_request_steps
(approval_request_id,level_no,approver_user_id)
VALUES($1,$2,$3)`,

[
approvalRequest.rows[0].id,
level.rows[0].level_no,
level.rows[0].approver_user_id
]

);

}


// Fetch updated PR
const updatedPR = await pool.query(

`SELECT * FROM purchase_requests WHERE id=$1`,

[result.rows[0].id]

);


res.json({

pr: updatedPR.rows[0],
approval_required: approvalRequired

});


}
catch(error){

res.status(500).json(error.message);

}

};


// PR LIST API
const getPRList = async(req,res)=>{

try{

const result = await pool.query(

`SELECT
id,
pr_number,
customer_name,
product_name,
total_price,
status
FROM purchase_requests
ORDER BY id DESC`

);

res.json(result.rows);

}
catch(error){

res.status(500).json(error.message);

}

};


module.exports = {
createPR,
getPRList
};