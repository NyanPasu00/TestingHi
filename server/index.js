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

const commit = () => {
  db.query("COMMIT;", (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Committed");
  });
};

app.post("/loginInformation", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const uid = req.body.uid;

  db.query("START TRANSACTION;", async (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Transaction Start");
    db.query(
      `SELECT IFNULL((SELECT 1 FROM client.rma_uid WHERE uid = "${uid}"),0) "RecordExists" , 
       IFNULL((SELECT admin FROM client.rma_uid WHERE uid = "${uid}"),0) "admin"`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Database query error");
          commit();
        } else {
  
          const recordExists = Boolean(result[0].RecordExists);
          const isAdmin = Boolean(result[0].admin);

          if (!recordExists) {
            db.query(
              `INSERT client.rma_uid SET email="${email}",name="${name}",uid="${uid}" `,
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).send("Error inserting values");
                } else {
                  res.status(200).json({
                    record: recordExists,
                    admin: isAdmin,
                    message: "Values Inserted",
                  });
                  commit();
                }
              }
            );
          } else {
            res.status(200).json({
              record: recordExists,
              admin: isAdmin,
              message: "Record Exists",
            });
            commit();
          }
        }
      }
    );
  });
});

//testing

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
