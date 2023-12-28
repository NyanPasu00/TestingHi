import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./style.css"
export function RegisProduct({ handleRegisProduct }) {
  const [productCount, setProductCount] = useState(1); // Initially, one product section is displayed

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

  return (
    <>
      <h2>Register Product</h2>
      <h4>Customer Information</h4>
<div className="flex-container">
  <div>
      <TextField
        label="Full Name"
        id="fname"
        size="small"
        style={{width : '40ch' , textAlign : 'center'}}
      />
      </div>
      <div>
      <TextField
        label="Email"
        id="email"
        size="small"
        type="email"
        style={{width : '40ch' , textAlign : 'center'}}
      />
      </div>
      <div>
      <TextField
        label="Phone"
        id="phone"
        size="small"
        type="tel"
        style={{height:'10ch' , width : '40ch' , textAlign : 'center'}}
      />
      </div>
      </div>
      
      <label htmlFor="streetAddress">Address:</label>
      <br />
      <input
        type="text"
        id="streetAddress"
        name="streetAddress"
        placeholder="Enter street address"
      />
      <br />

      <label htmlFor="streetAddress2">Address 2:</label>
      <br />
      <input
        type="text"
        id="streetAddress2"
        name="streetAddress2"
        placeholder="Enter second address line"
      />
      <br />
      <label htmlFor="city">City:</label>
      <br />
      <input
        type="text"
        id="city"
        name="city"
        placeholder="Enter city"
        required
      />
      <br />
      <label htmlFor="postalCode">Postal Code:</label>
      <br />
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        placeholder="Enter postal code"
        required
      />
      <br />
      <label htmlFor="country">Country:</label>
      <br />
      <input
        type="text"
        id="country"
        name="country"
        placeholder="Enter country"
        required
      />
      <br />

      {[...Array(productCount)].map((_, index) => (
        <div key={index}>
          <h4>Product Information {index + 1}</h4>
          <label>Serial Number:</label>
          <br />
          <input type="text" />
          <button>Check Serial Number</button>
          <br />
          <label>Date of Purchase:</label>
          <br />
          <input type="text" />
          <br />
          <label>Reseller Name:</label>
          <br />
          <input type="text" />
          <br />
        </div>
      ))}
      <button onClick={handleAddProduct}>Add Product</button>
      <button onClick={handleCancelProduct}>Cancel Product</button>
      <br />

      <br />
      <label>Please Upload Your Receipt or Invoice File:</label>
      <br />
      <br />
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
      <button onClick={() => handleRegisProduct("registed")}>Submit</button>
      <button onClick={() => handleRegisProduct("cancel")}>Cancel</button>
    </>
  );
}
