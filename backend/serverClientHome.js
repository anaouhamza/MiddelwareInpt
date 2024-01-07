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

app.post( '/HomeClient' , (req,res) => {
    const sql = "INSERT INTO dbreclamation2 (`firstName`, `lastName`, `Month` , `WeekOfMonth`, `DayOfWeek`, `Make` , `AccidentArea` , `DayOfWeekClaimed`, `MonthClaimed`, `WeekOfMonthClaimed`, `Sex`, `MaritalStatus`, `Age`,`Fault`, `VehicleCategory`, `VehiclePrice`, `DriverRating`, `AgeOfVehicle`, `AgeOfPolicyHolder`, `NumberOfSuppliments`, `NumberOfCars`, `Year`, `BasePolicy`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.Month,
        req.body.WeekOfMonth,
        req.body.DayOfWeek,
        req.body.Make,
        req.body.AccidentArea,
        req.body.DayOfWeekClaimed ,
        req.body.MonthClaimed,
        req.body.WeekOfMonthClaimed,
        req.body.Sex,
        req.body.MaritalStatus ,
        req.body.Age ,
        req.body.Fault ,
        req.body.VehicleCategory  ,
        req.body.VehiclePrice,
        req.body.DriverRating ,
        req.body.AgeOfVehicle ,
        req.body.AgeOfPolicyHolder ,
        req.body.NumberOfSuppliments ,
        req.body.NumberOfCars ,
        req.body.Year,
        req.body.BasePolicy,
    ]
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
})


app.listen(8083, ()=> {
    console.log("listening");
})