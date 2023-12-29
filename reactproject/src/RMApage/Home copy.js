import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { RegisProduct } from "./RegisProduct";
import { CreateRMA } from "./CreateRMA";
import AuthContext from "../context/AuthProvider";
import "./style.css";
import { Avatar, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import moment from "moment";
export function HomeCopy() {
  const { user, logOut, newUser, setProductData } = useContext(AuthContext);

  const [orderStatus, setorderStatus] = useState(false);
  const [rmaStatus, setrmaStatus] = useState(false);
  const [instructionStatus, setinstructionStatus] = useState(false);
  const [rejectStatus, setrejectStatus] = useState(false);
  const [productTable, setProductTable] = useState([]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInstruction = (instruction) => {
    setinstructionStatus(instruction === "close" ? false : true);
  };
  const handleReject = (reject) => {
    setrejectStatus(reject === "close" ? false : true);
  };

  const handleRegisProduct = (product) => {
    setorderStatus(
      product === "registed" || product === "cancel" ? false : true
    );
  };

  const handleRMA = (rma, product) => {
    if (rma === "shortcut") {
      setrmaStatus(true);
    }

    setrmaStatus(rma === "created" || rma === "cancel" ? false : true);
    if (product) {
      setProductData(product);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getregisProduct?uid=" + (user?.uid || ""))
      .then((response) => {
        setProductTable(response.data);
        console.log(productTable);
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
  }, [user]);

  useEffect(() => {
    document.title = "RMA";
  }, []);
  return (
    <html>
      <head>
        <title>Your Page Title</title>
      </head>
      <body>
        <div class="container">
          <main class="main-content">
            {newUser ? <h3>Hii New User</h3> : <h3>Welcome Back User</h3>}
            <div class="user-content">
              <div className="avatar-name-container">
                <p>
                  {user?.displayName} , {user?.email}
                </p>
                <Avatar alt={user?.displayName} src={user?.photoURL} />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleSignOut()}
                  style={{ width: "50px", height: "25px", margin: "10px" }}
                >
                  Logout
                </Button>
              </div>
            </div>
            <div>
              <div className="function">
                <h2>RMA Table</h2>
                <div className="button">
                  Step 1 : &nbsp;
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleRegisProduct}
                  >
                    Register Product
                  </Button>
                  {orderStatus ? (
                    <RegisProduct handleRegisProduct={handleRegisProduct} />
                  ) : null}
                  &nbsp;&nbsp;Step 2 : &nbsp;
                  <Button variant="contained" size="small" onClick={handleRMA}>
                    Create RMA
                  </Button>
                  {rmaStatus ? <CreateRMA handleRMA={handleRMA} /> : null}
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead className="table_header">
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold", width: "75px" }}
                      >
                        Register Date
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Customer Name
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Serial Number
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Product Name
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Warranty Status
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Warranty ExpiredDate
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Product Status
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        RMA Number
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Reason of Return
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        RMA Status
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        RMA Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productTable.map((rmatable) => (
                      <TableRow
                        key={rmatable.serialNum}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {moment(rmatable.creatingDate).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell align="center">{rmatable.name}</TableCell>
                        <TableCell align="center">
                          {rmatable.serialNum}
                        </TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              handleRMA("shortcut", rmatable);
                            }}
                          >
                            Create RMA
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </main>
        </div>

        <div>
          <div>
            {instructionStatus ? (
              <div
                style={{ border: "1px solid black", width: 700, padding: 30 }}
              >
                <p>
                  <h3>Approved RMA Details</h3>
                  <b>Return Instruction</b>
                  <br />
                  <br />
                  1. Packaging : Securely pack the item in its original
                  packaging <br />
                  2. RMA Number : Include the RMA number inside the package{" "}
                  <br />
                  3. Shipping Address : Ship the package to the following
                  address <br />
                  <br />
                  NO.28 JALAN BPP 3/6 <br /> BANDAR PUTRA PERMAI <br />
                  43300 SERI KEMBANGAN SELANGOR
                  <br />
                  <br />
                  RMA Number : RMA33365 <br />
                  Serial Number : SRN003 <br />
                  Product Number : Monitor <br />
                  Reason of Return : Damaged <br />
                </p>
                <button onClick={() => handleInstruction("close")}>
                  Back To Home Page
                </button>
              </div>
            ) : null}
            {rejectStatus ? (
              <div
                style={{ border: "1px solid black", width: 700, padding: 30 }}
              >
                <p>
                  <h3>Reject RMA Details</h3>
                  <b>
                    Reason for Rejection : Item not meeting return criteria{" "}
                  </b>
                  <br />
                  Alternatives : Please ensure the item meets return conditions
                  and resubmit the RMA <br />
                  Contact Support : For assistance, contact us at
                  eclipse@company.com or 1-800-XXX-XXXX. <br />
                </p>
                <button onClick={() => handleReject("close")}>
                  Back To Home Page
                </button>
              </div>
            ) : null}
          </div>

          <div style={{ border: "1px solid black" }}>
            <div>
              {/* Display RMA table or details */}
              <h2>RMA Table</h2>

              <table>
                <thead>
                  <tr>
                    <th>Register Date</th>
                    <th>Customer Name</th>
                    <th>Serial Number</th>
                    <th>Product Name</th>
                    <th>Warranty Status</th>
                    <th>Warranty Expired Date</th>
                    <th>Product Status</th>
                    <th>RMA Number</th>
                    <th>Reason of Return</th>
                    <th>RMA Status</th>
                  </tr>
                  <tr>
                    <td>16/11/2022</td>
                    <td>Wong</td>
                    <td>SRN001</td>
                    <td>Keyboard</td>
                    <td>Active</td>
                    <td>21/12/2024</td>
                    <td>Validated</td>
                    <td>RMA77281</td>
                    <td>No Function</td>
                    <td>Reject</td>
                    <td>
                      <button
                        onClick={() => {
                          handleRMA("shortcut");
                        }}
                      >
                        Create RMA
                      </button>
                    </td>
                    <td>
                      <button onClick={handleReject}>RMA Information</button>
                    </td>
                  </tr>
                  <tr>
                    <td>16/01/2023</td>
                    <td>Wong</td>
                    <td>SRN002</td>
                    <td>Laptop</td>
                    <td>Active</td>
                    <td>21/12/2024</td>
                    <td>Validated</td>
                    <td>RMA14785</td>
                    <td>Screen Broke</td>
                    <td>Pending</td>
                    <td>
                      <button
                        onClick={() => {
                          handleRMA("shortcut");
                        }}
                      >
                        Create RMA
                      </button>
                    </td>
                    <td>
                      <button>Cancel</button>
                    </td>
                  </tr>

                  <tr>
                    <td>16/11/2022</td>
                    <td>Wong</td>
                    <td>SRN003</td>
                    <td>Monitor</td>
                    <td>Active</td>
                    <td>21/12/2024</td>
                    <td>Validated</td>
                    <td>RMA33365</td>
                    <td>No Function</td>
                    <td>Approve</td>
                    <td>
                      <button
                        onClick={() => {
                          handleRMA("shortcut");
                        }}
                      >
                        Create RMA
                      </button>
                    </td>
                    <td>
                      <button onClick={handleInstruction}>
                        RMA Information
                      </button>
                    </td>
                    <td>
                      <a href="http://localhost:3000">WayBill</a>
                    </td>
                  </tr>
                  <tr>
                    <td>16/11/2022</td>
                    <td>Wong</td>
                    <td>SRN004</td>
                    <td>Monitor</td>
                    <td>Expired</td>
                    <td>20/10/2023</td>
                    <td>Validated</td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                  </tr>
                  <tr>
                    <td>16/12/2023</td>
                    <td>Wong</td>
                    <td>SRN005</td>
                    <td>Monitor</td>
                    <td> - </td>
                    <td> - </td>
                    <td>Validation</td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td>
                      <button
                        onClick={() => {
                          handleRMA("shortcut");
                        }}
                      >
                        Create RMA
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>16/11/2022</td>
                    <td>Wong</td>
                    <td>SRN006</td>
                    <td>Monitor</td>
                    <td> - </td>
                    <td> - </td>
                    <td>Unsuccessful</td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td>
                      <button
                        onClick={() => {
                          handleRMA("shortcut");
                        }}
                      >
                        Create RMA
                      </button>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
