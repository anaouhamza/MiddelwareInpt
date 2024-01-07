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

// Ajoutez cette route au serveur constateur
app.get('/getAllClaims', (req, res) => {
    const sql = "SELECT * FROM dbreclamation2";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/home/:claimId', (req, res) => {
    const claimId = req.params.claimId;
    const sql = "UPDATE dbreclamation2 SET `RepNumber` = ?, `Deductible` = ?, `Days_Policy_Accident` = ?, `Days_Policy_Claim` = ?, `PastNumberOfClaims` = ?, `PoliceReportFiled` = ?, `WitnessPresent` = ?, `AgentType` = ?, `AddressChange_Claim` = ? WHERE `id` = ?";
    
    const values = [
        req.body.RepNumber,
        req.body.Deductible,
        req.body.Days_Policy_Accident,
        req.body.Days_Policy_Claim,
        req.body.PastNumberOfClaims,
        req.body.PoliceReportFiled,
        req.body.WitnessPresent,
        req.body.AgentType,
        req.body.AddressChange_Claim ,
        claimId,  // L'ID à mettre à jour
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});


app.listen(8084, ()=> {
    console.log("listening");
})