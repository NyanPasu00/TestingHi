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

app.post("/loginInformation", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const uid = req.body.uid;

  const query = `
  INSERT INTO client.rma_uid (email, name, uid)
  SELECT "${email}" AS email, "${name}" AS name, "${uid}" AS uid
  FROM (SELECT 1) as Dummy
  WHERE NOT EXISTS (SELECT 1 FROM client.rma_uid WHERE uid = "${uid}")
  LIMIT 1;
`;

  db.query("START TRANSACTION;", async (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Transaction Start");
  });
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      res.status(200).json({ affectedRows: result.affectedRows });
    }
  });
  db.query("COMMIT;", (err) => {
    if (err) {
      console.error("Commit Failed :", commitError);
    } else {
      console.log("Commit Completed");
    }
  });
});

app.post("/regisProduct", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const address2 = req.body.address2;
  const city = req.body.city;
  const postcode = req.body.postcode;
  const country = req.body.country;
  const serialNum = req.body.serialNum;
  const purchaseDate = req.body.purchaseDate;
  const sellerName = req.body.sellerName;
  const creatingDate = req.body.creatingDate;
  const uid = req.body.uid;
  const query = `
  INSERT client.registerproduct
  SET name = "${name}" , email = "${email}" , phone = "${phone}",address = "${address}"
  , address2 = "${address2}", city = "${city}", postcode = ${postcode}, country = "${country}"
  , serialNum = "${serialNum}", purchaseDate = STR_TO_DATE("${purchaseDate}","%d-%m-%Y"), sellerName = "${sellerName}" ,
  creatingDate = STR_TO_DATE("${creatingDate}","%d-%m-%Y"), uid = "${uid}";
`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      res.status(200).send("Success");
    }
  });
});

app.get("/getregisProduct",(req,res) => {

  const uid = req.query.uid;
  const query = `
  SELECT * FROM client.registerproduct
  WHERE uid = "${uid}";
  `
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      console.log(result);
      res.status(200).json(result);
      
    }
  });
})
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
