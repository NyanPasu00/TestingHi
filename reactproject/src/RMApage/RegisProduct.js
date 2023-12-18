import React, { useState } from "react";

export function RegisProduct({handleRegisProduct}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productCount, setProductCount] = useState(1); // Initially, one product section is displayed

  const handleAddProduct = () => {
    setProductCount(productCount + 1); 
  };
  const handleCancelProduct = () => {
    if(productCount > 1){
    setProductCount(productCount - 1); 
    }
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  
  return (
    <>
      <h2>Register Product</h2>
      <h4>Customer Information</h4>
    
      <label for="fname">Full Name:</label>
      <br />
      <input type="text" id="fname" name="fname" />
      <br />
      <label for="femail">Email :</label>
      <br />
      <input type="email" id="femail" name="femail" />
      <br />
      <label for="fphone">Phone :</label>
      <br />
      <input type="text" id="fphone" name="fphone" />
      <br />

      <label for="address">Address :</label><br />
        <textarea id="address" name="address" rows="4" cols="50" placeholder="Enter your address..."></textarea>

         {[...Array(productCount)].map((_, index) => (
          
        <div key={index}>
          <h4>Product Information {index + 1}</h4>
          <label>Serial Number:</label>
          <br /> 
          <input type="text" />
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

      <br /><br />
      <label htmlFor="fileUpload">Upload Receipt or Invoice File:</label>
      <br />
      <input
        type="file"
        id="fileUpload"
        name="fileUpload"
        onChange={handleFileChange}
      />
    
      <p>Selected file: {selectedFile ? selectedFile.name : "None"}</p>
        <button onClick={() => handleRegisProduct("registed")}>Submit</button>
        <button onClick={() => handleRegisProduct("cancel")}>Cancel</button>
     
    </>
  );
}
