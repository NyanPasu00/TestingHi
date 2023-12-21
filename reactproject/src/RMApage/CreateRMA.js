import React from "react";

export function CreateRMA({ handleRMA }) {
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      // Handle the image file upload
      console.log("Uploaded image file:", imageFile);
    } else {
      console.log("Please select an image file.");
    }
  };

  const handleVideoChange = (event) => {
    const videoFile = event.target.files[0];
    if (videoFile) {
      // Handle the video file upload
      console.log("Uploaded video file:", videoFile);
    } else {
      console.log("Please select a video file.");
    }
  };
  return (
    <>
      <div>
        <h4>Product Information</h4>
        <label htmlFor="product">Product You Choose To Return :</label>
        <p>
          Serial Number : SRN002 <br />
          Product Name : Laptop <br />
          Image <br />
        </p>
        <br />
        <label htmlFor="bigTextArea">Reason Of Return :</label>
        <br />
        <textarea
          id="bigTextArea"
          name="bigTextArea"
          rows="5"
          cols="50"
        ></textarea>
        <br />
        <p>
          Shipping Address : NO.10 JALAN BPP 3/6 <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          BANDAR PUTRA PERMAI <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          43300 SERI KEMBANGAN SELANGOR
        </p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button>Edit</button> <br />
        <b>
          Please verify that the above address <br /> is our intended shipping
          destination.
        </b>
        <br />
        <br />
        <br />
        <label htmlFor="fileUpload">
          Please 'Choose File' to Show the item's condition for evaluation.
        </label>
        <br />
        <div>Upload Item with Image : </div>
        <input
          type="file"
          id="imageFileUpload"
          name="imageFileUpload"
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />
        <br />
        <div>Upload Item with Video : </div>
        <input
          type="file"
          id="videoFileUpload"
          name="videoFileUpload"
          accept="video/*"
          onChange={handleVideoChange}
        />
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
