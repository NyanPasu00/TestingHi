import React, { useState } from "react";

export function RegisProduct({handleRegisProduct}) {
  const [selectedFile, setSelectedFile] = useState(null);

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

      <h4>Product Information</h4>
      <label for="fserial">Serial Number :</label>
      <br />
      <input type="text" id="fserial" name="fserial" />
      <br />
      <label for="fdate">Date of Purchase :</label>
      <br />
      <input type="text" id="fdate" name="fdate" />
      <br />
      <label for="fseller">Reseller Name :</label>
      <br />
      <input type="text" id="fseller" name="fseller" />
      <br /><br /><br />
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
    </>
  );
}
