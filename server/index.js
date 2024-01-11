require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
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

app.post("/regisProduct", upload.single("file"), (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    address2,
    city,
    postcode,
    country,
    serialNum,
    purchaseDate,
    sellerName,
    creatingDate,
    uid,
    productname,
    kplus,
    warrantyExpiredDate
  } = req.body;
  const uploadedFile = req.file.filename;

  const query = `
  INSERT client.registerproduct
  SET name = "${name}" , email = "${email}" , phone = "${phone}",address = "${address}"
  , address2 = "${address2}", city = "${city}", postcode = ${postcode}, country = "${country}"
  , serialNum = "${serialNum}", purchaseDate = STR_TO_DATE("${purchaseDate}","%d-%m-%Y"), sellerName = "${sellerName}" ,
  creatingDate = STR_TO_DATE("${creatingDate}","%d-%m-%Y"), uid = "${uid}", receiptImage = "${uploadedFile}" , productname = "${productname}", 
  kplus = "${kplus}" , warrantyexpired = STR_TO_DATE("${warrantyExpiredDate}","%d-%m-%Y") ;
`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);

      res.status(500).send("Database query error");
    } else {
      console.log(result);
      res.status(200).send("Success");
    }
  });
});

app.post(
  "/createrma",
  upload.fields([
    { name: "imagefile", maxCount: 1 },
    { name: "imagefile2", maxCount: 1 },
    { name: "videofile", maxCount: 1 },
  ]),
  (req, res) => {
    const imageFile =
      req.files["imagefile"]?.map(({ filename }) => filename) || [];
    const imageFile2 =
      req.files["imagefile2"]?.map(({ filename }) => filename) || [];

    const videoFile =
      req.files["videofile"]?.map(({ filename }) => filename) || [];
    const reason = req.body.reason;
    const serialNum = req.body.serialNum;
    const query = `INSERT client.createrma
  SET reason = "${reason}" , serialNum = "${serialNum}" 
  , productImage="${imageFile}",productImage2="${imageFile2}",productVideo="${videoFile}" ;`;

    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Database query error");
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  }
);

app.get("/getregisProduct", (req, res) => {
  const uid = req.query.uid;
  const rowsPerPage = req.query.rowsPerPage;
  const page = req.query.page;

  const query = `
  SELECT * , R.serialNum
  FROM client.registerproduct R
  LEFT JOIN client.createrma E ON R.serialNum = E.serialNum
  WHERE uid = "${uid}" AND display = true
  ORDER BY R.serialNum
  LIMIT ${rowsPerPage} OFFSET ${page * rowsPerPage};
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      res.status(200).json(result);
    }
  });
});

app.get("/getTotalRegisProduct", (req, res) => {
  const uid = req.query.uid;

  const query = `SELECT *, R.serialNum
  FROM client.registerproduct R
  LEFT JOIN client.createrma E ON R.serialNum = E.serialNum
  WHERE R.uid = "${uid}" AND R.display = true;`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      res.status(200).json(result);
    }
  });
});
app.get("/serialnumber", (req, res) => {
  const query = `SELECT * FROM client.product`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      res.status(200).json(result);
    }
  });
});

app.get("/checkserialnumber", (req, res) => {
  const serialnumber = req.query.serialnumber;
  const query = `SELECT * FROM client.product WHERE serialnumber="${serialnumber}"`;
  console.log(serialnumber);
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      const exists = result.length > 0;

      res.status(200).json({ exists, result });
    }
  });
});
app.put("/cancelproduct", (req, res) => {
  const id = req.query.id;

  const query = `UPDATE client.registerproduct SET display = false WHERE id=${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      res.status(200).json(result);
    }
  });
});

app.put("/updateAddress", (req, res) => {
  const { serialNum, address, address2, city, postcode, country } = req.body;

  const query = `UPDATE client.registerproduct SET address="${address}" , address2="${address2}" 
  , city="${city}" , postcode="${postcode}" , country="${country}" WHERE serialNum="${serialNum}" `;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      res.status(200).json(result);
    }
  });
});

app.put("/updateWaybill", (req, res) => {
  const { waybill, courier, serialNum } = req.body;

  const query = `UPDATE client.registerproduct SET waybill="${waybill}" , courier="${courier}" 
  WHERE serialNum="${serialNum}";`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database query error");
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Running In Port 3001");
});
