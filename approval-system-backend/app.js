const express = require("express");
const cors = require("cors");
const pool = require("./db/connection");
const prRoutes = require("./routes/prRoutes");
const approvalRoutes = require("./routes/approvalRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req,res)=>{

try{

const result = await pool.query("SELECT NOW()");

res.json({
message:"Server running",
time:result.rows[0].now
});

}
catch(error){

res.status(500).json(error.message);

}

});

app.use("/api", prRoutes);
app.use("/api", approvalRoutes);

app.listen(5000,()=>{

console.log("Server running on port 5000");

});
