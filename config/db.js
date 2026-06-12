const mysql=require("mysql2");
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
module.exports=connection;