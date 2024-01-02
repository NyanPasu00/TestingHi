import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import "./style.css";
import axios from "axios";
export function CreateRMA({ handleRMA }) {
  const { productData } = useContext(AuthContext);

  const [isChecked, setIsChecked] = useState(false);
  const [confirmStatus, setconfirmStatus] = useState(false);
  const [reasonReturn, setReasonReturn] = useState("");

  const handleconfirmStatus = (confirm) => {
    if (!productData.serialNum || !reasonReturn) {
      alert("Please full in all required Fields");
      return;
    } else {
      setconfirmStatus(confirm === "created" ? true : false);
    }
  };

  const handleDoubleConfirm = () => {
    setconfirmStatus(false);
    handleRMA("created");
    createRMA();
  };

  const createRMA = () => {
    axios
      .post("http://localhost:3001/createRMA", {
        rmaNum: generateRMANumber(),
        reason: reasonReturn,
        serialNum: productData.serialNum,
      })
      .then(() => {
        console.log("Sending Success");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
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

  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const generateRMANumber = () => {
    const prefix = "RMA";
    const length = 4;
    const randomPart = Array.from({ length }, () =>
      Math.floor(Math.random() * 10).toString()
    ).join("");

    const rmaNumber = `${prefix}${randomPart}`;

    return rmaNumber;
  };

  

  return (
    <>
      <div className="overlay">
        <div className="overlay-content">
          <div className="insertRMA">
            <div className="rmaInformation">
              <h2>Product Information</h2>
              <label>
                <b>Product You Choose To Return :</b>
              </label>
              <div>Serial Number : {productData.serialNum}</div>
              <div>Product Name : Keyboard</div>
              <br />
              <div>
                <div>
                  Reason Of Return :
                  <TextField
                    id="outlined-multiline-static"
                    label="Reason"
                    size="small"
                    multiline
                    rows={2}
                    style={{ width: "100%" }}
                    onChange={(e) => setReasonReturn(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <b>Shipping Address :</b>
              </div>
              <div>{productData.address}</div>
              <div>{productData.address2}</div>
              <div>
                {productData.city},{productData.postcode},{productData.country}
              </div>
              <div>
                <Button variant="contained" size="small">
                  Edit
                </Button>{" "}
              </div>
              <div>
                <b>
                  Please verify that the above address <br /> is our intended
                  shipping destination.
                </b>
              </div>
              <div>
                <label htmlFor="fileUpload">
                  Please 'Choose File' to Show the item's condition for
                  evaluation.
                </label>
              </div>
            
              <div>
                Upload Item with Image :
                <input
                  type="file"
                  id="imageFileUpload"
                  name="imageFileUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                Upload Item with Video :
                <input
                  type="file"
                  id="videoFileUpload"
                  name="videoFileUpload"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  handleconfirmStatus("created");
                }}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  handleRMA("cancel");
                }}
              >
                Cancel
              </Button>
            </div>
            {confirmStatus ? (
              <div className="overlay2">
                <div className="overlay2-content">
                  <div
                    style={{
                      border: "1px solid black",
                      width: 700,
                      padding: 30,
                    }}
                  >
                    <div>
                      <b>Customer Information</b>
                      <div>Customer Name : {productData.name}</div>
                      <div>Phone : {productData.phone}</div>
                      <div>Email : {productData.email}</div>
                      <div>Shipping Address :</div>
                      <div>{productData.address}</div>
                      <div>{productData.address2}</div>
                      <div>
                        {productData.postcode},{productData.city},
                        {productData.country}
                      </div>

                      <div>
                        <b>Product Information</b>
                      </div>
                      <div>Serial Number : {productData.serialNum}</div>
                      <div>Product Name : Keyboard</div>
                      <div>Reason of Return : {reasonReturn}</div>
                    </div>
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      value="agreed"
                      onChange={handleCheckBoxChange}
                    />
                    <label htmlFor="agreeTerms">
                      Make sure the above information is correct. Once
                      confirmed, it cannot be changed.
                    </label>
                    <br />
                    <Button
                      variant="contained"
                      disabled={!isChecked}
                      onClick={() => {
                        handleDoubleConfirm();
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleconfirmStatus("cancel");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
