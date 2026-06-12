const express=require("express");
require("dotenv").config();
const app=express();
const port=process.env.PORT || 3000;
app.use(express.json());
const profileRoutes = require("./routes/profileRoutes");
app.use("/", profileRoutes);
app.listen(port,()=>{
    console.log(`server started at ${port}`);
});
