import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import CreatePR from "./pages/CreatePR";
import PendingApprovals from "./pages/PendingApprovals";
import PRList from "./pages/PRList";

function App(){

return(

<BrowserRouter>

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-3xl font-bold mb-6 text-gray-800">Approval Workflow System</h1>


<div className="flex gap-4 mb-8 bg-white p-4 rounded shadow">

<Link
to="/"
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Create PR
</Link>

<Link
to="/approvals"
className="bg-gray-700 text-white px-4 py-2 rounded"
>
Pending Approvals
</Link>

<Link
to="/prlist"
className="bg-purple-600 text-white px-4 py-2 rounded"
>
PR List
</Link>

</div>


<Routes>

<Route path="/" element={<CreatePR/>} />

<Route path="/approvals" element={<PendingApprovals/>} />

<Route path="/prlist" element={<PRList/>} />

</Routes>

</div>

</BrowserRouter>

);

}

export default App;