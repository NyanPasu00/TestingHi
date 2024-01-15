import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import moment from "moment";
import { RegisProduct } from "./RegisProduct";
import { CreateRMA } from "./CreateRMA";
import AuthContext from "../context/AuthProvider";
import RMAInfo from "./RMAInfo";
import "./style.css";

//Material UI
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
} from "@mui/material";

export function Home() {

  //Display Stepper Details
  const steps = [
    {
      label: "Register Product",
      description:
        "Before proceeding with the RMA request, please take a moment to register the product. Thank you!",
    },
    {
      label: "Create RMA",
      description:
        "After product registration, please await our inspection approval before initiating the RMA process. Click the button below to start registering your product. Thank you!",
    },
  ];


  const { user, logOut, newUser, setProductData, setallRmaInfo } =
    useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState(0);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [productPage, setRegisterProductPage] = useState(false);
  const [rmaStatus, setrmaStatus] = useState(false);
  const [rmaInfo, setRmaInfo] = useState(false);
  const [productTable, setProductTable] = useState([]);
  const [totalproduct, setTotalProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Stepper
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  //Sign Out Function
  const handleSignOut = async () => {
    try {
      await logOut(); //logOut() from AuthContext
    } catch (error) {
      console.log(error);
    }
  };

  //Open Register Product Page or Close it
  const handleRegisProductPage = (product) => {
    setRegisterProductPage(
      product === "registed" || product === "cancel" ? false : true
    );
  };


 //Open a Confirm Page ask Delete Product or Not
  const handleOpenConfirm = (id) => {
    setOpenConfirmDelete(true);
    setId(id);
  };

  //Close the Confirm Page  
  const handleCloseConfirm = () => {
    setOpenConfirmDelete(false);
  };

  //Confirm Delete the Product
  const handleConfirmCancel = () => {
    axios
      .put("http://localhost:3001/cancelproduct?id=" + (id || ""))
      .then(() => {
        console.log("Success Cancel");
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });

    handleCloseConfirm();
  };

  //Search Item 
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  let paginatedData = productTable;

  if (searchQuery) {
    const filteredData = totalproduct.filter((rmatable) => {
      const searchQueryLowerCase = searchQuery.toLowerCase();

      const customerNameMatch =
        rmatable.name &&
        rmatable.name.toLowerCase().includes(searchQueryLowerCase);
      const rmaStatusMatch =
        rmatable.rmaStatus &&
        rmatable.rmaStatus.toLowerCase().includes(searchQueryLowerCase);
      const serialNumMatch =
        rmatable.serialNum &&
        rmatable.serialNum.toLowerCase().includes(searchQueryLowerCase);
      const warrantyStatusMatch =
        rmatable.warrantyStatus &&
        rmatable.warrantyStatus.toLowerCase().includes(searchQueryLowerCase);
      const productNameMatch =
        rmatable.productname &&
        rmatable.productname.toLowerCase().includes(searchQueryLowerCase);
      const reasonMatch =
        rmatable.reason &&
        rmatable.reason.toLowerCase().includes(searchQueryLowerCase);
      const rmaIDMatch =
        rmatable.rma_id !== null &&
        rmatable.rma_id !== undefined &&
        `RMA${String(rmatable.rma_id).padStart(4, "0")}`
          .toLowerCase()
          .includes(searchQueryLowerCase);
      const registerDateMatch =
        rmatable.registerDate &&
        new Date(rmatable.registerDate)
          .toLocaleDateString()
          .includes(searchQueryLowerCase);
      const warrantyExpiredDateMatch =
        rmatable.registerDate &&
        moment(rmatable.warrantyexpired)
          .format("DD-MM-YYYY")
          .toLowerCase()
          .includes(searchQueryLowerCase);
      return (
        customerNameMatch ||
        rmaStatusMatch ||
        serialNumMatch ||
        warrantyStatusMatch ||
        productNameMatch ||
        reasonMatch ||
        rmaIDMatch ||
        registerDateMatch ||
        warrantyExpiredDateMatch
      );
    });

    paginatedData = filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }

//Open RMA Info  or Close RMA Info
  const handleInfo = (status, information) => {
    setRmaInfo(status === "open" ? true : false);

    if (information) {
      setallRmaInfo(information);
    }
  };

  //Open Create RMA or Close Create RMA
  const handleRMA = (rma, product) => {
    if (rma === "create") {
      setrmaStatus(true);
    }
    setrmaStatus(rma === "created" || rma === "cancel" ? false : true);
    if (product) {
      setProductData(product);
    }
  };

  //This For Get the Register Product Table 
  useLayoutEffect(() => {
    axios
      .get(
        "http://localhost:3001/getregisProduct?uid=" +
          (user?.uid || "") +
          "&rowsPerPage=" +
          rowsPerPage +
          "&page=" +
          page
      )
      .then((response) => {
        setProductTable(response.data);
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
  }, [user, productPage, rmaStatus, openConfirmDelete, rowsPerPage, page]);

  //Find Out the Total Register Product For the TablePagination 123
  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/getTotalRegisProduct?uid=" + (user?.uid || "")
      )
      .then((response) => {
        setTotalProduct(response.data);
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
  }, [user, productPage, rmaStatus, openConfirmDelete]);

  //If Search a TablePagination Page back to First Page
  useEffect(() => {
    if (searchQuery) {
      setPage(0);
    }
  }, [searchQuery, setPage]);
  return (
    <>
      <div>
        <main className="main-content">
          <div className="user-content">
            <div>
              {newUser ? (
                <h2>Hii New User , {user?.displayName}</h2>
              ) : (
                <h2>Welcome Back , {user?.displayName} !!</h2>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "45px",
                  marginRight: "10px",
                }}
              >
                {user?.email}
              </div>
              <Avatar alt={user?.displayName} src={user?.photoURL} />
              {/* {LogOut Button} */}
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
            <div style={{ display: "flex", justifyContent: "right" }}>
              {/* {Register Product Button} */}
              <Button
                variant="contained"
                size="small"
                onClick={handleRegisProductPage}
              >
                Register Product
              </Button>
              {/* {Open the Register Product Page} */}
              {productPage ? (
                <RegisProduct handleRegisProductPage={handleRegisProductPage} />
              ) : null}
            </div>
            {/* {Display the Table or Stepper} */}
            {productTable.length > 0 ? (
              <>
                <h2>My Product</h2>

                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="simple table"
                  >
                    <TableHead>
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
                          Invoice Picture
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
                          Warranty Expired Date
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
                        <TableCell colSpan={2}>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <TextField
                              type="text"
                              placeholder="Search Here"
                              value={searchQuery}
                              onChange={handleSearch}
                              style={{ width: "100%" }}
                              size="small"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedData.map((rmatable, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {moment(rmatable.registerDate).format("DD-MM-YYYY")}
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
                              Invoice
                            </a>
                          </TableCell>
                          <TableCell align="center">
                            {rmatable.productname}
                          </TableCell>
                          <TableCell align="center">
                            {rmatable.warrantyexpired
                              ? moment(rmatable.warrantyexpired).format(
                                  "DD-MM-YYYY"
                                )
                              : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {rmatable.warrantyStatus}
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
                                onClick={() => handleInfo("open", rmatable)}
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
                                  handleRMA("create", rmatable);
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
                {/* {TablePagination} */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalproduct.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(event, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                  }}
                />
              </>
            ) : (
              <Box sx={{ width: "50%", margin: "auto", paddingTop: "100px" }}>
                {/* {Stepper} */}
                <Stepper nonLinear activeStep={activeStep}>
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
                    <Typography sx={{ mt: 3, mb: 1, py: 1 }}>
                      {steps[activeStep].description}
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBackStep}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        onClick={handleNextStep}
                        disabled={activeStep === 1}
                        sx={{ mr: 1 }}
                      >
                        Next
                      </Button>
                      {activeStep === 1 ? (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleRegisProductPage}
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
       {/* {Ask For Delete Product} */}
      <Dialog open={openConfirmDelete} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Delete this Product or RMA ??
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
        {/* {Open Create RMA} */}
        {rmaStatus ? <CreateRMA handleRMA={handleRMA} /> : null}
         {/* {Open RMA Info} */}
        {rmaInfo ? <RMAInfo handleInfo={handleInfo} /> : null}
      </div>
    </>
  );
}
