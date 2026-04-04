import { useEffect,useState } from "react";
import API from "../services/api";

function PRList(){

const [prs,setPrs] = useState([]);

const loadPRs = async()=>{

try{

const res = await API.get("/pr");

setPrs(res.data);

}
catch(error){

console.log(error);

}

};

useEffect(()=>{

loadPRs();

},[]);


return(

<div>

<h2 className="text-xl font-semibold mb-6">
PR List
</h2>

<div className="space-y-4">

{prs.map((pr)=>(

<div
key={pr.id}
className="border p-4 rounded shadow"
>

<p>PR Number: {pr.pr_number}</p>

<p>Customer: {pr.customer_name}</p>

<p>Product: {pr.product_name}</p>

<p>Total: ₹{pr.total_price}</p>

<p>
Status:
<span className={`ml-2 px-2 py-1 rounded text-sm
${pr.status==="PENDING" ? "bg-yellow-400 text-black" : ""}
${pr.status==="APPROVED" ? "bg-green-600 text-white" : ""}
${pr.status==="REJECTED" ? "bg-red-600 text-white" : ""}
`}>
{pr.status}
</span>
</p>

</div>

))}

</div>

</div>

);

}

export default PRList;