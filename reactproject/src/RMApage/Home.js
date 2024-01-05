import React, { useState, useContext, useEffect } from "react";
import { RegisProduct } from "./RegisProduct";
import { CreateRMA } from "./CreateRMA";
import AuthContext from "../context/AuthProvider";
import "./style.css";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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
import RMAInfo from "./RMAInfo";

const steps = [
  {
    label: "Register Product",
    description:
      "Hello, before you proceed to create an RMA, please register the product. It requires a series of checks to streamline the subsequent actions.",
  },
  {
    label: "Create RMA",
    description:
      "After registering the product, you need to wait for our inspection before you can apply for RMA. You Can Click the Button Below and Start to Register the Product.",
  },
];

export function Home() {
  const { user, logOut, newUser, setProductData , setallRmaInfo} = useContext(AuthContext);

  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [orderStatus, setorderStatus] = useState(false);
  const [rmaStatus, setrmaStatus] = useState(false);
  const [rmaInfo, setRmaInfo] = useState(false);
  const [productTable, setProductTable] = useState([]);
  const [serialNumberTable, setSerialNumber] = useState([]);

  //Stepper
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleOpenConfirm = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleCloseConfirm = () => {
    setOpen(false);
  };

  const handleConfirmCancel = () => {
    axios
      .put("http://localhost:3001/cancelproduct?id=" + (id || ""))
      .then((response) => {
        console.log("Success Cancel");
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });

    handleCloseConfirm();
  };
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInfo = (status, information) => {
    setRmaInfo(status === "open" ? true : false);

    if(information)
    {
      setallRmaInfo(information);
    }
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
  }, [user, orderStatus, rmaStatus, open]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/serialnumber")
      .then((response) => {
        setSerialNumber(response.data);
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
    document.title = "RMA";
  }, []);
  return (
    <>
      <div className="container">
        <main className="main-content">
          {newUser ? (
            <h3>Hii New User , {user?.displayName}</h3>
          ) : (
            <h3>Welcome Back {user?.displayName} !</h3>
          )}
          <div className="user-content">
            <div className="avatar-name-container">
              <p>{user?.email}</p>
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
              <div className="button">
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
              </div>
            </div>
            {productTable.length > 0 ? (
              <>
                <h2>My Product</h2>
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
                          Receipt Picture
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
                          Warranty ExpiredDate
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
                          RMA ID
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
                        ></TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        ></TableCell>
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
                            <a
                              href={`http://localhost:3001/${rmatable.receiptImage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Receipt
                            </a>
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            {serialNumberTable.find(
                              (serial) =>
                                rmatable.serialNum === serial.serialnumber
                            )?.product_name || "-"}
                          </TableCell>
                          <TableCell align="center">
                            {serialNumberTable.find(
                              (serial) =>
                                rmatable.serialNum === serial.serialnumber
                            )?.date_manufacture
                              ? moment(
                                  serialNumberTable.find(
                                    (serial) =>
                                      rmatable.serialNum === serial.serialnumber
                                  ).date_manufacture
                                ).format("DD-MM-YYYY")
                              : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {serialNumberTable.find(
                              (serial) =>
                                rmatable.serialNum === serial.serialnumber
                            )?.product_status || "-"}
                          </TableCell>
                          <TableCell align="center">
                            {rmatable.rma_id !== null &&
                            rmatable.rma_id !== undefined
                              ? `RMA${String(rmatable.rma_id).padStart(4, "0")}`
                              : "-"}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              maxWidth: "350px",
                              wordBreak: "break-word",
                            }}
                          >
                            {rmatable.reason ?? "-"}
                          </TableCell>
                          <TableCell align="center">
                            {rmatable.rmaStatus ?? "-"}
                          </TableCell>
                          <TableCell align="center">
                            {rmatable.rmaStatus ? (
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => handleInfo("open",rmatable)}
                                style={{
                                  width: "30px",
                                  height: "40px",
                                  fontSize: "10px",
                                }}
                              >
                                RMA Info
                              </Button>
                            ) : (
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  handleRMA("shortcut", rmatable);
                                }}
                                style={{
                                  width: "30px",
                                  height: "40px",
                                  fontSize: "10px",
                                }}
                              >
                                Create RMA
                              </Button>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                handleOpenConfirm(rmatable.id);
                              }}
                              style={{ width: "30px", height: "40px" }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Box sx={{ width: "50%", margin: "auto" }}>
                <Stepper
                  nonLinear
                  activeStep={activeStep}
                  sx={{
                    width: "100%", // Set the width to 100%
                  }}
                >
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepButton color="inherit" onClick={handleStep(index)}>
                        {step.label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                      {steps[activeStep].description}
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        onClick={handleNext}
                        disabled={activeStep === 1}
                        sx={{ mr: 1 }}
                      >
                        Next
                      </Button>
                      {console.log(activeStep)}
                      {activeStep === 1 ? (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleRegisProduct}
                        >
                          Register Product
                        </Button>
                      ) : null}
                    </Box>
                  </React.Fragment>
                </div>
              </Box>
            )}
          </div>
        </main>
      </div>
      <Dialog open={open} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this Product or RMA ??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        {rmaStatus ? <CreateRMA handleRMA={handleRMA} /> : null}
        {rmaInfo ? <RMAInfo handleInfo={handleInfo} /> : null}
        {/* <div>
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
          </div> */}
      </div>
    </>
  );
}
