const express=require("express");
const axios =require("axios");
require("dotenv").config();
const app=express();
const port=process.env.PORT || 3000;
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("<h1>github analyser started</h1>");
})
app.get("/github/:username",async (req, res) => {
    try{
        const username = req.params.username;
        const response= await axios.get(`https://api.github.com/users/${username}`)
        const data=response.data;
        res.json({
        username: data.login,
        name: data.name,
        followers: data.followers,
        following: data.following,
        publicRepos: data.public_repos,
        publicGists: data.public_gists,
        profileUrl: data.html_url,
        avatarUrl: data.avatar_url,
        accountCreated: data.created_at
        });
    }catch(error){
        res.status(404).json({
            message:"user not found"
        });
    }
    
});
app.listen(port,()=>{
    console.log(`server started at ${port}`);
});
