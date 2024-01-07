const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "signup2",
    port : "3307"
})

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

app.post( '/signup' , (req,res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
})

app.post( '/login' , (req,res) => {
    const sql = "SELECT * FROM login WHERE `email`= ? AND `password` = ? ";
    db.query(sql, [req.body.email,req.body.password,], (err, data) => {
        if (err) {
           return res.json("Error");
        }
        if (data.length>0) {
            return res.json("Success");
         }
         else{
            return res.json("Faile");
         }
        
    });
})

app.listen(8081, ()=> {
    console.log("listening");
})