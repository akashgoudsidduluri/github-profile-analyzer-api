const express=require("express");
const axios =require("axios");
const mysql=require("mysql2");
require("dotenv").config();
const app=express();
const port=process.env.PORT || 3000;
app.use(express.json());
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: "github_analyzer"
});
connection.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }
    console.log("MySQL connected successfully!");
});
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
app.get("/profiles", (req, res) => {
    const query = "SELECT * FROM github_profiles";
    connection.query(query, (err, results) => {
        if(err){
            return res.status(500).json({
                message: err.message
            });
        }
        res.json(results);
    });
});
app.get("/profiles/:username", (req,res)=>{
    const query=`SELECT * FROM github_profiles
    WHERE username = ?`
    const username=req.params.username;
    connection.query(query, [username], (err, result) => {
        if(err){
            return res.status(500).json({
                message: err.message
            });
        }
        res.json(result[0]);
    });
    
})
app.post("/analyze/:username", async (req, res) => {
    try{
        const username = req.params.username;
        const response= await axios.get(`https://api.github.com/users/${username}`)
        const data=response.data;
        
        const values = [
        data.login,
        data.name,
        data.followers,
        data.following,
        data.public_repos,
        data.public_gists,
        data.html_url,
        data.avatar_url,
        new Date(data.created_at)
        ];
        const query = `INSERT INTO github_profiles(
        username,
        name,
        followers,
        following,
        public_repos,
        public_gists,
        profile_url,
        avatar_url,
        account_created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(query, values, (err, result) => {
            if(err){
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json({
                message: "Profile stored successfully"
            });
        });
    }
    catch(error){
        if(error.response?.status === 404){
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


app.listen(port,()=>{
    console.log(`server started at ${port}`);
});
