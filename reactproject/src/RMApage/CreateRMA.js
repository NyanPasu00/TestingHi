import React, { useState } from "react";


export function CreateRMA({ handleRMA }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  return (
    <>
      <div>
        <h4>Product Information</h4>
        <label for="product">Choose a Product You Want to Create RMA : </label>
        <select name="product" id="product">
          <option value="item1">SRN001 Keyboard</option>
          <option value="item2">SRN002 Monitor</option>
          <option value="item3">SRN003 Laptor</option>
          <option value="item4">SRN004 Monitor</option>
        </select>
        <br /><br /><br />
        <label htmlFor="bigTextArea">Reason Of Return :</label>
        <br />
        <textarea
          id="bigTextArea"
          name="bigTextArea"
          rows="5"
          cols="50"
        ></textarea>
       <br /><br /><br />

        <label htmlFor="fileUpload">
          Please 'Upload File' to show the item's condition for evaluation.
        </label>
        <br />
        <input
          type="file"
          id="fileUpload"
          name="fileUpload"
          onChange={handleFileChange}
        />
        <p>Selected file: {selectedFile ? selectedFile.name : "None"}</p>
      </div>
      <button
        onClick={() => {
          handleRMA("created");
          
        }}
      >
        Submit
      </button>
       <button
        onClick={() => {
          handleRMA("cancel");
        }}
      >
        Cancel
      </button>
      
    </>
  );
}
