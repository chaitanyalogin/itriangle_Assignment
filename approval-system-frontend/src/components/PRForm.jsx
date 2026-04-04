import { useState } from "react";
import API from "../services/api";

function PRForm(){

const [form,setForm] = useState({

pr_number:"",
customer_name:"",
product_name:"",
quantity:"",
unit_price:"",
created_by:1

});

const [loading,setLoading] = useState(false);
const [success,setSuccess] = useState(false);

const handleChange = (e)=>{

setForm({

...form,
[e.target.name]:e.target.value

});

};

const totalPrice =
Number(form.quantity || 0) * Number(form.unit_price || 0);

const handleSubmit = async(e)=>{

e.preventDefault();

try{

setLoading(true);

await API.post("/pr",{

...form,
quantity:Number(form.quantity),
unit_price:Number(form.unit_price),
total_price:totalPrice,
created_by:Number(form.created_by)

});

setSuccess(true);

setForm({
pr_number:"",
customer_name:"",
product_name:"",
quantity:"",
unit_price:"",
created_by:1
});

}
catch(error){

console.log(error);

}
finally{

setLoading(false);

setTimeout(()=>{

setSuccess(false);

},3000);

}

};

return(

<div>

{success && (

<div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">

PR Created Successfully

</div>

)}

<form
onSubmit={handleSubmit}
className="space-y-4 bg-white p-8 rounded shadow w-[500px]"
>

<input
name="pr_number"
placeholder="PR Number"
value={form.pr_number}
onChange={handleChange}
className="border border-gray-300 p-2 w-full rounded"
/>

<input
name="customer_name"
placeholder="Customer"
value={form.customer_name}
onChange={handleChange}
className="border border-gray-300 p-2 w-full rounded"
/>

<input
name="product_name"
placeholder="Product"
value={form.product_name}
onChange={handleChange}
className="border border-gray-300 p-2 w-full rounded"
/>

<input
name="quantity"
placeholder="Quantity"
type="number"
value={form.quantity}
onChange={handleChange}
className="border border-gray-300 p-2 w-full rounded"
/>

<input
name="unit_price"
placeholder="Unit Price"
type="number"
value={form.unit_price}
onChange={handleChange}
className="border border-gray-300 p-2 w-full rounded"
/>


<div className="border border-gray-300 p-2 w-full rounded bg-gray-100 font-medium">

Total Price: ₹ {totalPrice}

</div>


<button
disabled={loading}
className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-semibold disabled:bg-gray-400"
>

{loading ? "Creating..." : "Create PR"}

</button>

</form>

</div>

);

}

export default PRForm;