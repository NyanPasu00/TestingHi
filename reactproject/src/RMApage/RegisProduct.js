import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import "./style.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
export function RegisProduct({ handleRegisProduct }) {
  const { user } = useContext(AuthContext);
  const [productCount, setProductCount] = useState(1);

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
  const [serialNum, setSerialNum] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(moment());
  const [sellerName, setSellerName] = useState("");

  const handleAddProduct = () => {
    setProductCount(productCount + 1);
  };
  const handleCancelProduct = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };
  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the PDF file upload (e.g., send it to the server, process it, etc.)
      console.log("Uploaded PDF file:", file);
    } else {
      console.log("Please select a PDF file.");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the image file upload (e.g., send it to the server, process it, etc.)
      console.log("Uploaded image file:", file);
    } else {
      console.log("Please select an image file.");
    }
  };

  const handleInputAddressChange = (e) => {
    const { id, value } = e.target;
    setAddress({
      ...address,
      [id]: value,
    });
  };

  const handleCheckingRegisProduct = (action) => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !address.address ||
      !address.address2 ||
      !address.city ||
      !address.postcode ||
      !address.country ||
      !serialNum ||
      !purchaseDate ||
      !sellerName
    ) {
      alert("Please full in all required Fields");
      return;
    } else {
      handleRegisProduct("registed");
      regisProduct();
      alert("Success Registered");
    }
  };
  const regisProduct = () => {
    axios
      .post("http://localhost:3001/regisProduct", {
        name: fullName,
        email: email,
        phone: phone,
        address: address.address,
        address2: address.address2,
        city: address.city,
        postcode: address.postcode,
        country: address.country,
        serialNum: serialNum,
        purchaseDate: moment(purchaseDate).format("DD-MM-YYYY"),
        sellerName: sellerName,
        creatingDate: moment().format("DD-MM-YYYY"),
        uid: user?.uid,
      })
      .then(() => {
        console.log("Sending Success");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <>
      <div class="overlay">
        <div class="overlay-content">
          <form onSubmit={handleCheckingRegisProduct}>
            <div class="regisProduct">
              <h1>Register Product</h1>
              <h3>Customer Information</h3>
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
                      height: "10ch",
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
                      height: "10ch",
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
                      height: "10ch",
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
                      height: "10ch",
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
                      height: "10ch",
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
                      height: "10ch",
                      width: "40ch",
                      textAlign: "center",
                    }}
                    onChange={handleInputAddressChange}
                    required
                  />
                </div>
              </div>

              {[...Array(productCount)].map((_, index) => (
                <div key={index}>
                  <h3>Product Information {index + 1}</h3>
                  <div>
                    <TextField
                      label="Serial Number"
                      id="serialNum"
                      size="small"
                      type="text"
                      style={{
                        height: "7ch",
                        width: "40ch",
                        textAlign: "center",
                      }}
                      onChange={(e) => setSerialNum(e.target.value)}
                      required
                    />
                    <Button
                      variant="contained"
                      size="small"
                      style={{ width: "125px", height: "40px" }}
                    >
                      Check Serial Number
                    </Button>

                    <div>
                      Date of Purchase :
                      <div className="datepicker-overlay">
                        <DatePicker
                          defaultValue={purchaseDate}
                          onChange={(e) => setPurchaseDate(e)}
                          format="DD/MM/YYYY"
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
                        onChange={(e) => setSellerName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Button variant="contained" onClick={handleAddProduct}>
                      Add Product
                    </Button>
                    <Button variant="contained" onClick={handleCancelProduct}>
                      Cancel Product
                    </Button>
                  </div>
                </div>
              ))}
              <label>Please Upload Your Receipt or Invoice File:</label>

              <div>Upload Receipt/Invoice with PDF file :</div>
              <input
                type="file"
                id="pdfFileUpload"
                name="pdfFileUpload"
                accept=".pdf"
                onChange={handlePDFUpload}
              />
              <br />
              <br />
              <div>Upload Receipt/Invoice with Image file :</div>
              <input
                type="file"
                id="imageFileUpload"
                name="imageFileUpload"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <br />
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
