const express = require("express");
const app = express();
const studentRoutes = require("./invoice");
const studentRoutes1 = require("./post");
const mysql = require("mysql");

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

app.use(express.json());
app.use('/', studentRoutes(db)); // Use the student router
app.use('/', studentRoutes1(db));

app.listen(3000, () => console.log("Listening on port 3000..."));

let a = "hi";
let hi = "bye";
// const express = require("express");
// const mysql = require("mysql");
// const app = express();

// app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "sql_workbench",
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log("MySql Connected");
// });


// app.get('/getStudent', (req, res) => {
//   db.query('SELECT * FROM students', (error, result) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('An error occurred while fetching students');
//     } else {
//       console.log(result);
//       res.send(result);
//     }
//   });
// });

// app.listen(3000, () => console.log("Listening on port 3000..."));

// app.get("/rma", (req, res) => {
//     res.send("")
// });

// app.get("/api/courses", (req, res) => {
//   res.send(courses);
// });

// app.post("/update", (req, res) => {
//   const id = req.body.id;
//   const name = req.body.name;

//   db.query(`INSERT INTO student SET id = ${id} , name = '${name}' `, (err) => {
//     if (err) {
//       throw err;
//     }

//     res.send("Update Student Posted");
//   });
// });

// app.get("/getTable", (req, res) => {
//   db.query("SELECT * FROM sql_workbench.students", (err,result) => {
//     if (err) {
//       throw err;
//     }
    
//     console.log(result);
//     res.send(result);
//   });
// });
// app.put('/', (req, res) => {
//     res.send("PUT Request Called")
// })

// app.put("/update/:id",(req,res)=> {
//     const name = req.body.name;
//     const id = req.params.id;

//     db.query("UPDATE nodemysql.student SET name = ?  WHERE id = ?;",[name,id],(err)=> {
//         if (err) {
//             res.status(500).send("Error updating data in the database");
//             console.log(err);
//             return;
//           }
          
//           res.send("UPDATED");
//     });
// });

// app.delete("/delete/:id",(req,res) => {
//     const id = req.params.id;
//     db.query("DELETE FROM nodemysql.student WHERE id = ?;",[id],(err,result) => {
//         if(err) {
//             console.log(err);
//             return;
//         }
//         res.send("DELETED");
//     });
// })



//form and normal input difference 什么时候用form and normal

//http , https
//HTTPS 比 HTTP 更加安全 有保护用户的隐私信息 , 涉及账户登录 , 支付或者任何敏感数据传输的网站 
//HTTPS 使用SSL / TLS 加密数据传输 , HTTP 没提供


//api insert 一些东西   
//middleware 

//open student.js for query的 

//RMA UI (PowerSlide)   明天弄这个


//Bonus  (JWT) (CORS , 看一看Theory)