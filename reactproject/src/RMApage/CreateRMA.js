import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import "./style.css";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
export function CreateRMA({ handleRMA }) {
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

  const { productData } = useContext(AuthContext);

  const [isChecked, setIsChecked] = useState(false);
  const [confirmStatus, setconfirmStatus] = useState(false);
  const [reasonReturn, setReasonReturn] = useState("");
  const reasonTextFieldRef = useRef(null);

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

  useEffect(() => {
    if (reasonTextFieldRef.current) {
      reasonTextFieldRef.current.focus();
    }
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    border: "1px solid black",
    width: 640,
    padding: 30,
  };

  const infoSectionStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 10,
  };

  const labelStyle = {
    marginRight: 10,
    fontWeight: "bold",
    minWidth: "150px",
  };

  const contentStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
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
              <div>Reason Of Return :</div>
              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Reason"
                  size="small"
                  multiline
                  rows={2}
                  style={{ width: "40%" }}
                  onChange={(e) => setReasonReturn(e.target.value)}
                  inputRef={reasonTextFieldRef}
                  required
                />
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
                {/* <Button variant="contained" size="small">
                  Edit
                </Button>{" "} */}
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
                <label>Upload File With Image : </label>
                <Button
                  component="label"
                  variant="contained"
                  size="small"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImageChange}
                    name="file"
                  />
                </Button>
              </div>
              <div>
                <label>Upload File With Video : </label>
                <Button
                  component="label"
                  variant="contained"
                  size="small"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImageChange}
                    name="file"
                  />
                </Button>
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
                      fontFamily: "Arial, sans-serif",
                      backgroundColor: "#f8f8f8",
                      borderRadius: 10,
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                      margin: "auto",
                    }}
                  >
                    <h2>Your Info</h2>
                    <div style={containerStyle}>
                      
                      <div>
                        <div>
                          <b>Customer Information</b>
                        </div>
                        <br />
                        <div style={infoSectionStyle}>
                          <div style={contentStyle}>
                            <label style={labelStyle}>Customer Name :</label>
                            <div>{productData.name}</div>
                          </div>
                          <div style={contentStyle}>
                            <label style={labelStyle}>Phone :</label>
                            <div>{productData.phone}</div>
                          </div>
                          <div style={contentStyle}>
                            <label style={labelStyle}>Email :</label>
                            <div>{productData.email}</div>
                          </div>
                          <div style={contentStyle}>
                            <label style={labelStyle}>Shipping Address :</label>
                            <div>
                              {productData.address}, {productData.address2},{" "}
                              {productData.postcode}, {productData.city},{" "}
                              {productData.country}
                            </div>
                          </div>
                        </div>

                        <div>
                          <b>Product Information</b>
                        </div>
                        <br />
                        <div style={infoSectionStyle}>
                          <div style={contentStyle}>
                            <label style={labelStyle}>Serial Number :</label>
                            <div>{productData.serialNum}</div>
                          </div>
                          <div style={contentStyle}>
                            <label style={labelStyle}>Product Name :</label>
                            <div>Keyboard</div>
                          </div>
                          <div style={contentStyle}>
                            <label style={labelStyle}>Reason of Return :</label>
                            <div>{reasonReturn}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      value="agreed"
                      onChange={handleCheckBoxChange}
                      style={{ margin: "10px 0" }}
                    />
                    <label htmlFor="agreeTerms" style={{ fontSize: 14 }}>
                      Make sure the above information is correct. Once
                      confirmed, it cannot be changed.
                    </label>
                    <br />
                    <div style={{ marginTop: 10 }}>
                      <Button
                        variant="contained"
                        disabled={!isChecked}
                        onClick={() => {
                          handleDoubleConfirm();
                        }}
                        style={{ marginRight: 10 }}
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
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
