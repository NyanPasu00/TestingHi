import React, { useState, useContext, useEffect } from "react";
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
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Register Order",
    description:
      "Hello, before you proceed to create an RMA, please register the product.It requires a series of checks to streamline the subsequent actions.",
  },
  { label: "Create RMA", description: "Create RMA" },
];

export function HomeCopy() {
  const { user, logOut, newUser, setProductData } = useContext(AuthContext);

  const [orderStatus, setorderStatus] = useState(false);
  const [rmaStatus, setrmaStatus] = useState(false);
  const [instructionStatus, setinstructionStatus] = useState(false);
  const [rejectStatus, setrejectStatus] = useState(false);
  const [productTable, setProductTable] = useState([]);

  //Stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted();
  };
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
    console.log(product);
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
  }, [user, orderStatus, rmaStatus]);

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
                  <b>Step 1 : &nbsp;</b>
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
                  {rmaStatus ? <CreateRMA handleRMA={handleRMA} /> : null}
                </div>
              </div>
              {productTable.length === 1 ? (
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
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Customer Name
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Serial Number
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Product Name
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Warranty Status
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Warranty ExpiredDate
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Product Status
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          RMA Number
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Reason of Return
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          RMA Status
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          
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
                          <TableCell align="center">
                            <img
                              src={
                                `http://localhost:3001/` + rmatable.receiptImage
                              }
                              alt="Items"
                              width="100px"
                              height="100px"
                            />
                          </TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">
                            {rmatable.rma_number ?? "-"}
                          </TableCell>
                          <TableCell align="center">
                            {rmatable.reason ?? "-"}
                          </TableCell>
                          <TableCell align="center">
                            {rmatable.rmaStatus ?? "-"}
                          </TableCell>
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
              ) : (
                <Box sx={{ width: "50%", margin: "auto" }}>
                  <Stepper
                    nonLinear
                    activeStep={activeStep}
                    sx={{
                      width: "100%", // Set the width to 100%
                      padding: "24px", // Add padding for a larger appearance
                    }}
                  >
                    {steps.map((step, index) => (
                      <Step key={step.label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                          {step.label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                  <div>
                    {allStepsCompleted() ? (
                      <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button onClick={handleReset}>Reset</Button>
                        </Box>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                          {steps[activeStep].description}
                        </Typography>

                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Back
                          </Button>
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button onClick={handleNext} sx={{ mr: 1 }}>
                            Next
                          </Button>
                          {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                              <Typography
                                variant="caption"
                                sx={{ display: "inline-block" }}
                              >
                                Step {activeStep + 1} already completed
                              </Typography>
                            ) : (
                              <Button onClick={handleComplete}>
                                {completedSteps() === totalSteps() - 1
                                  ? "Finish"
                                  : "Complete Step"}
                              </Button>
                            ))}
                        </Box>
                      </React.Fragment>
                    )}
                  </div>
                </Box>
              )}
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
