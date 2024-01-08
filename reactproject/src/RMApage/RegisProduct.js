import { Button, TextField, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
export function RegisProduct({ handleRegisProduct }) {
  const defaultDate = moment();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const { user } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    address: "",
    address2: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [product, setProduct] = useState([
    {
      serialNum: "",
      purchaseDate: moment().format("DD-MM-YYYY"),
      sellerName: "",
      checkSerialResult: null,
      serialResult: {},
    },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [productCount, setProductCount] = useState(1);
  const handleAddProduct = () => {
    setProductCount(() => productCount + 1);
    setProduct([
      ...product,
      {
        serialNum: "",
        checkSerialResult: null,
        serialResult: null,
        purchaseDate: moment().format("DD-MM-YYYY"),
        sellerName: "",
      },
    ]);
  };
  const handleCancelProduct = (indexToRemove) => {
    if (productCount > 1) {
      setProductCount(() => productCount - 1);
      setProduct((prevProducts) =>
        prevProducts.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSerialNumberChange = (newValue, index) => {
    setProduct((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        serialNum: newValue,
      };
      return updatedProducts;
    });
  };

  const handleDateOfPurChaseChange = (newValue, index) => {
    console.log(newValue._d);
    setProduct((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        purchaseDate: moment(newValue._d).format("DD-MM-YYYY"),
      };
      return updatedProducts;
    });
  };

  const handleSellerNameChange = (newValue, index) => {
    setProduct((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        sellerName: newValue,
      };
      return updatedProducts;
    });
  };

  const handleCheckSerialResultToNull = (value, index) => {
    setProduct((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        checkSerialResult: value,
      };
      return updatedProducts;
    });
  };

  const handleCheckSerialNumber = (serialnumber, index) => {
    axios
      .get(
        "http://localhost:3001/checkserialnumber?serialnumber=" +
          (serialnumber || "")
      )
      .then((response) => {
        setProduct((prevProducts) => {
          const updatedProducts = [...prevProducts];
          updatedProducts[index] = {
            ...updatedProducts[index],
            checkSerialResult: response.data.exists,
            serialResult: response.data.result[0],
          };
          return updatedProducts;
        });
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
  };

  const handleInputAddressChange = (e) => {
    const { id, value } = e.target;
    setAddress({
      ...address,
      [id]: value,
    });
  };

  const handleCheckingRegisProduct = (event) => {
    event.preventDefault();
    if (
      !fullName ||
      !email ||
      !phone ||
      !address.address ||
      !address.address2 ||
      !address.city ||
      !address.postcode ||
      !address.country ||
      !selectedFile
    ) {
      alert("Please full in all required Fields");
      return;
    }

    let missingFields = false;

    product.forEach((item, index) => {
      if (!item.serialNum || !item.purchaseDate || !item.sellerName) {
        missingFields = true;
        alert("Some products have missing fields");
      } else if (item.checkSerialResult === null) {
        missingFields = true;
        alert("Please Check Your Serial Number");
        return;
      }
    });

    if (!missingFields) {
      handleRegisProduct("registed");
      regisProduct();
      alert("Success Registered");
    }
  };
  const regisProduct = () => {
    product.forEach((item) => {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address.address);
      formData.append("address2", address.address2);
      formData.append("city", address.city);
      formData.append("postcode", address.postcode);
      formData.append("country", address.country);
      formData.append("serialNum", item.serialNum);
      formData.append("purchaseDate", item.purchaseDate);
      formData.append("sellerName", item.sellerName);
      formData.append("creatingDate", moment().format("DD-MM-YYYY"));
      formData.append("uid", user?.uid);
      formData.append("file", selectedFile);

      axios
        .post("http://localhost:3001/regisProduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          console.log("Sending Success");
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    });
  };

  const openImageInNewTab = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      window.open(imageUrl);
    }
  };

  return (
    <>
      <div className="overlay">
        <div className="overlay-content">
          <form onSubmit={handleCheckingRegisProduct}>
            <div className="regisProduct">
              <h1>Register Product</h1>
              <h3>Contact Information</h3>
              <div className="flex-container">
                <div>
                  <TextField
                    label="Full Name"
                    id="fname"
                    size="small"
                    style={{ width: "40ch", textAlign: "center" }}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="Email"
                    id="email"
                    size="small"
                    type="email"
                    style={{ width: "40ch", textAlign: "center" }}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="Phone"
                    id="phone"
                    size="small"
                    type="tel"
                    style={{
                      width: "40ch",
                      textAlign: "center",
                    }}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="Address"
                    id="address"
                    size="small"
                    type="address"
                    style={{
                      width: "40ch",
                      textAlign: "center",
                    }}
                    onChange={handleInputAddressChange}
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="Address 2"
                    id="address2"
                    size="small"
                    type="address"
                    style={{
                      width: "40ch",
                      textAlign: "center",
                    }}
                    onChange={handleInputAddressChange}
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="City"
                    id="city"
                    size="small"
                    type="address"
                    style={{
                      width: "40ch",
                      textAlign: "center",
                    }}
                    onChange={handleInputAddressChange}
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="Postal Code"
                    id="postcode"
                    size="small"
                    type="text"
                    style={{
                      width: "40ch",
                      textAlign: "center",
                    }}
                    onChange={handleInputAddressChange}
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="Country"
                    id="country"
                    size="small"
                    type="text"
                    style={{
                      width: "40ch",
                      textAlign: "center",
                    }}
                    onChange={handleInputAddressChange}
                    required
                  />
                </div>
              </div>
              {product.map((product, index) => (
                <div key={index}>
                  <h3>Product Information {index + 1}</h3>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex" }}>
                      <TextField
                        label="Serial Number"
                        id={`serialNum-${index}`}
                        size="small"
                        type="text"
                        style={{
                          width: "40ch",
                          textAlign: "center",
                        }}
                        value={product.serialNum}
                        onChange={(e) => {
                          handleSerialNumberChange(e.target.value, index);
                          handleCheckSerialResultToNull(null, index);
                        }}
                        required
                        InputProps={{
                          endAdornment: (
                            <>
                              {product.checkSerialResult === true && (
                                <CheckCircleIcon style={{ color: "green" }} />
                              )}
                              {product.checkSerialResult === false && (
                                <ReportProblemIcon
                                  style={{ color: "orange" }}
                                />
                              )}
                              {product.checkSerialResult === null && (
                                <CancelIcon style={{ color: "red" }} />
                              )}
                            </>
                          ),
                        }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        style={{ width: "125px", height: "40px" }}
                        onClick={() =>
                          handleCheckSerialNumber(product.serialNum, index)
                        }
                      >
                        Check Serial Number
                      </Button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "inherit", // Horizontal centering
                        marginTop: "10px",
                      }}
                    >
                      {product.checkSerialResult === true && (
                        <div
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "10px",
                            marginTop: "10px",
                            width: "39.25%",
                          }}
                        >
                          <div
                            style={{
                              marginBottom: "5px",
                              fontWeight: "bold",
                            }}
                          >
                            Serial Number: {product.serialResult.serialnumber}
                          </div>
                          <div>
                            Product Name: {product.serialResult.product_name}
                          </div>
                          <div>
                            Warranty Expired Date:{" "}
                            {moment(
                              product.serialResult.date_manufacture
                            ).format("DD-MM-YYYY")}
                          </div>
                          <div>
                            K Plus: {product.serialResult.kplus ? "Yes" : "No"}
                          </div>
                        </div>
                      )}
                      {product.checkSerialResult === false && (
                        <div
                          style={{
                            textAlign: "right",
                            width: "41%",
                            fontWeight: "bold",
                          }}
                        >
                          Serial Number Are Not In Our List <br /> Please Check
                          Correctly or <br /> After You Submit We check for you
                        </div>
                      )}
                      {product.checkSerialResult === null && (
                        <div
                          style={{
                            textAlign: "right",
                            width: "41%",
                            fontWeight: "bold",
                          }}
                        >
                          Please Check Serial Number
                        </div>
                      )}
                    </div>

                    <div>
                      Date of Purchase :
                      <div className="datepicker-overlay">
                        <DatePicker
                          defaultValue={defaultDate}
                          onChange={(e) => handleDateOfPurChaseChange(e, index)}
                          format="DD/MM/YYYY"
                          PopperProps={{
                            placement: "right-end",
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <TextField
                        label="Reseller Name"
                        id="sellerName"
                        size="small"
                        type="text"
                        style={{
                          height: "7ch",
                          width: "40ch",
                          textAlign: "center",
                        }}
                        onChange={(e) =>
                          handleSellerNameChange(e.target.value, index)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Button variant="contained" onClick={handleAddProduct}>
                      Add Product
                    </Button>
                    {index === 0 ? null : (
                      <Button
                        variant="contained"
                        onClick={() => handleCancelProduct(index)}
                      >
                        Cancel Product
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <br />
              <div>
                <div>Upload Your Receipt/Invoice with PDF or Image file :</div>
                <div style={{ height: "300px" }}>
                  <div>
                    <Button
                      component="label"
                      variant="contained"
                      size="small"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleImageUpload}
                        name="file"
                      />
                    </Button>
                  </div>

                  {selectedFile && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        <p>
                          Selected file:
                          <a
                            href="#"
                            onClick={() => openImageInNewTab(selectedFile)}
                            style={{ marginLeft: "5px" }}
                          >
                            {selectedFile.name}
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <br />
              <div>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleRegisProduct("cancel");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
