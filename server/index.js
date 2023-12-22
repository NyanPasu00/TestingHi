const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sql_workbench",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected");
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;

  db.query(
    `INSERT testing.testing SET name="${name}",age=${age},country="${country}",position="${position}"`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting values");
      } else {
        console.log("Values Inserted");
        res.status(200).send("Values Inserted");
      }
    }
  );
});

app.get("/getemployee", (req, res) => {
  db.query("SELECT * FROM testing.testing", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const age = req.body.age;
  db.query(
    `UPDATE testing.testing SET age =${age} WHERE id =${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM testing.testing WHERE id=${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Running In Port 3001");
});
