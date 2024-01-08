import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
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
  const [editAddress, setEditAddress] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [confirmEditAddress, setConfirmEditAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: "",
    address2: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [reasonReturn, setReasonReturn] = useState("");
  const reasonTextFieldRef = useRef(null);
  const [serialNumberTable, setSerialNumber] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/serialnumber")
      .then((response) => {
        setSerialNumber(response.data);
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
    document.title = "RMA";
  }, []);

  const handleNewAddress = (e) => {
    const { id, value } = e.target;
    setNewAddress({
      ...newAddress,
      [id]: value,
    });
  };
  const handleEditAddress = () => {
    setConfirmEditAddress(true);
  };
  const handleCancelEditAddress = () => {
    setConfirmEditAddress(false);
  };

  const handleConfirmEditAddress = () => {
    setEditAddress(true);
    setConfirmEditAddress(false);
  };
  const handleconfirmStatus = (confirm) => {
    if (editAddress) {
      if (
        !newAddress.address ||
        !newAddress.address2 ||
        !newAddress.city ||
        !newAddress.postcode ||
        !newAddress.country
      ) {
        alert("Please full in all required Fields");
        return;
      }
    }

    if (!productData.serialNum || !reasonReturn || !imageFile || !videoFile) {
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

    if (editAddress) {
      updateAddress();
    }
  };
  const updateAddress = () => {
    axios
      .put("http://localhost:3001/updateAddress", {
        serialNum: productData.serialNum,
        address: newAddress.address,
        address2: newAddress.address2,
        city: newAddress.city,
        postcode: newAddress.postcode,
        country: newAddress.country,
      })
      .then(() => {
        console.log("Sending Success");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const createRMA = () => {
    const formData = new FormData();
    formData.append("reason", reasonReturn);
    formData.append("serialNum", productData.serialNum);
    formData.append("imagefile", imageFile);
    formData.append("videofile", videoFile);
    formData.append("imagefile2", imageFile2);

    axios
      .post("http://localhost:3001/createRMA", formData, {
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
  };
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setImageFile(image);
  };
  const handleImageChange2 = (event) => {
    const image = event.target.files[0];
    setImageFile2(image);
  };

  const handleVideoChange = (event) => {
    const video = event.target.files[0];
    setVideoFile(video);
  };

  const openImageInNewTab = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      window.open(imageUrl);
    }
  };
  const openVideoInNewTab = () => {
    if (videoFile) {
      const videoUrl = URL.createObjectURL(videoFile);
      window.open(videoUrl);
    }
  };
  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
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
              <div>
                Product Name :{" "}
                {serialNumberTable.find(
                  (serial) => productData.serialNum === serial.serialnumber
                )?.product_name || "-"}{" "}
              </div>
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
                  inputProps={{ maxLength: 45 }}
                  required
                />
              </div>

              <div>
                <b>Shipping Address :</b>
                <div style={{ paddingLeft: "10px" }}>
                  {!editAddress ? (
                    <div>
                      <div>{productData.address}</div>
                      <div>{productData.address2}</div>
                      <div>
                        {productData.city},{productData.postcode},
                        {productData.country}
                      </div>
                      <div>
                        <div style={{ paddingTop: "10px", textAlign: "right" }}>
                          <Button
                            onClick={handleEditAddress}
                            variant="contained"
                            size="small"
                          >
                            Edit
                          </Button>{" "}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
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
                          onChange={handleNewAddress}
                          required
                        />
                      </div>
                      <div style={{ paddingTop: "10px" }}>
                        <TextField
                          label="Address 2"
                          id="address2"
                          size="small"
                          type="address"
                          style={{
                            width: "40ch",
                            textAlign: "center",
                          }}
                          onChange={handleNewAddress}
                          required
                        />
                      </div>
                      <div style={{ paddingTop: "10px" }}>
                        <TextField
                          label="City"
                          id="city"
                          size="small"
                          type="address"
                          style={{
                            width: "40ch",
                            textAlign: "center",
                          }}
                          onChange={handleNewAddress}
                          required
                        />
                      </div>
                      <div style={{ paddingTop: "10px" }}>
                        <TextField
                          label="Postal Code"
                          id="postcode"
                          size="small"
                          type="text"
                          style={{
                            width: "40ch",
                            textAlign: "center",
                          }}
                          onChange={handleNewAddress}
                          required
                        />
                      </div>
                      <div style={{ paddingTop: "10px" }}>
                        <TextField
                          label="Country"
                          id="country"
                          size="small"
                          type="text"
                          style={{
                            width: "40ch",
                            textAlign: "center",
                          }}
                          onChange={handleNewAddress}
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <b>
                  Please confirm if the address shown above is <br /> where we
                  want the items to be shipped.
                </b>
              </div>
              <div></div>
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
                    name="imagefile"
                  />
                </Button>
              </div>

              {imageFile && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <p>
                      Selected file:
                      <a
                        href="#"
                        onClick={() => openImageInNewTab(imageFile)}
                        style={{ marginLeft: "5px" }}
                      >
                        {imageFile.name}
                      </a>
                    </p>

                    {/* <img
                          src={imageUrl}
                          alt="Uploaded"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        /> */}
                  </div>
                </div>
              )}
              <div>
                <label>Upload File With Image 2: </label>
                <Button
                  component="label"
                  variant="contained"
                  size="small"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImageChange2}
                    name="imagefile"
                  />
                </Button>
              </div>
              {imageFile2 && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <p>
                      Selected file:
                      <a
                        href="#"
                        onClick={() => openImageInNewTab(imageFile2)}
                        style={{ marginLeft: "5px" }}
                      >
                        {imageFile2.name}
                      </a>
                    </p>

                    {/* <img
                          src={imageUrl}
                          alt="Uploaded"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        /> */}
                  </div>
                </div>
              )}
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
                    onChange={handleVideoChange}
                    name="videofile"
                  />
                </Button>
              </div>
              {videoFile && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <p>
                      Selected file:
                      <a
                        href="#"
                        onClick={openVideoInNewTab}
                        style={{ marginLeft: "5px" }}
                      >
                        {videoFile.name}
                      </a>
                    </p>

                    {/* <img
                          src={imageUrl}
                          alt="Uploaded"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        /> */}
                  </div>
                </div>
              )}
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
                            {editAddress ? (
                              <div style={{ paddingTop: "10px" }}>
                                <div>{newAddress.address}</div>
                                <div>{newAddress.address2}</div>
                                <div>
                                  {newAddress.postcode},{newAddress.city},
                                  {newAddress.country}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div style={{ paddingTop: "10px" }}>
                                  <div>{productData.address}</div>
                                  <div>{productData.address2}</div>
                                  <div>
                                    {productData.postcode},{productData.city},
                                    {productData.country}
                                  </div>
                                </div>
                              </div>
                            )}
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
                          <div style={contentStyle}>
                            <label style={labelStyle}>
                              Supporting Information :
                            </label>
                            <div>
                              <div>
                                <a
                                  href="#"
                                  onClick={() => openImageInNewTab(imageFile)}
                                  style={{ marginLeft: "5px" }}
                                >
                                  {imageFile.name}
                                </a>
                              </div>
                              {imageFile2 ?
                                <div>
                                  <a
                                    href="#"
                                    onClick={() =>
                                      openImageInNewTab(imageFile2)
                                    }
                                    style={{ marginLeft: "5px" }}
                                  >
                                    {imageFile2.name}
                                  </a>
                                </div>
                              : null}
                              <div>
                                <a
                                  href="#"
                                  onClick={openVideoInNewTab}
                                  style={{ marginLeft: "5px" }}
                                >
                                  {videoFile.name}
                                </a>
                              </div>
                            </div>
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
      <Dialog open={confirmEditAddress} onClose={handleEditAddress}>
        <DialogTitle>Confirm Edit Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change your address?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEditAddress} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmEditAddress} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
