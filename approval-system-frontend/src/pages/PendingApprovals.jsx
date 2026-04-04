import { useEffect,useState } from "react";
import API from "../services/api";

function PendingApprovals(){

const [approvals,setApprovals] = useState([]);
const [message,setMessage] = useState({
text:"",
type:""
});

const [loadingId,setLoadingId] = useState(null);

const loadApprovals = async()=>{

try{

const res = await API.get(
"/approval/pending?user_id=2"
);

setApprovals(res.data);

}
catch(error){

console.log(error);

}

};

useEffect(()=>{

loadApprovals();

},[]);


const approve = async(id)=>{

try{

setLoadingId(id);

await API.post(`/approval/${id}/approve`,{
user_id:2
});

setMessage({
text:"Request Approved",
type:"success"
});

loadApprovals();

}
catch(error){

console.log(error);

}
finally{

setLoadingId(null);

setTimeout(()=>{

setMessage({
text:"",
type:""
});

},3000);

}

};


const reject = async(id)=>{

try{

setLoadingId(id);

await API.post(`/approval/${id}/reject`,{
user_id:2
});

setMessage({
text:"Request Rejected",
type:"error"
});

loadApprovals();

}
catch(error){

console.log(error);

}
finally{

setLoadingId(null);

setTimeout(()=>{

setMessage({
text:"",
type:""
});

},3000);

}

};


return(

<div>

<h2 className="text-2xl font-semibold mb-6 text-gray-800">
Pending Approvals
</h2>


{message.text && (

<div className={`mb-4 px-4 py-3 rounded border

${message.type==="success"
? "bg-green-100 border-green-400 text-green-700"
: "bg-red-100 border-red-400 text-red-700"
}

`}>

{message.text}

</div>

)}


{approvals.length === 0 && (

<div className="bg-white p-6 rounded shadow text-gray-600">

No pending approvals

</div>

)}


<div className="space-y-4">

{approvals.map((item)=>(

<div
key={item.approval_request_id}
className="bg-white p-5 rounded shadow border-l-4 border-blue-500"
>

<p>Request ID: {item.approval_request_id}</p>

<p>PR Number: {item.pr_number}</p>

<p>Customer: {item.customer_name}</p>

<p>Product: {item.product_name}</p>

<p>Total: ₹{item.total_price}</p>

<p>Level: {item.level_no}</p>

<p>
Status:

<span className={`ml-2 px-2 py-1 rounded text-sm font-medium

${item.status==="PENDING" ? "bg-yellow-400 text-black" : ""}
${item.status==="APPROVED" ? "bg-green-600 text-white" : ""}
${item.status==="REJECTED" ? "bg-red-600 text-white" : ""}

`}>

{item.status}

</span>

</p>


<div className="flex gap-3 mt-3">

<button
onClick={()=>approve(item.approval_request_id)}
disabled={loadingId === item.approval_request_id}
className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded disabled:bg-gray-400"
>

{loadingId === item.approval_request_id
? "Processing..."
: "Approve"
}

</button>


<button
onClick={()=>reject(item.approval_request_id)}
disabled={loadingId === item.approval_request_id}
className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded disabled:bg-gray-400"
>

{loadingId === item.approval_request_id
? "Processing..."
: "Reject"
}

</button>

</div>

</div>

))}

</div>

</div>

);

}

export default PendingApprovals;