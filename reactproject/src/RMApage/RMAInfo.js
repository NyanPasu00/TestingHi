import { Button, MenuItem, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";

export default function RMAInfo({ handleInfo }) {
  const { allRmaInfo, infoSectionStyle, contentStyle, labelStyle } =
    useContext(AuthContext);

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    const addressText = `39-3, Jalan SP 2/2, Taman Serdang Perdana, 43300 Seri Kembangan, Selangor, Malaysia`;
    navigator.clipboard
      .writeText(addressText)
      .then(() => setCopySuccess(true))
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#E0FFFF",
            padding: "20px",
            height: "100%",
          }}
        >
          <div
            style={{
              flex: 1,
              marginRight: "20px",
              border: "3px solid black",
              borderRadius: "5px",
              padding: "15px",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <h2>All Your Info</h2>
            <div style={infoSectionStyle}>
              <div style={contentStyle}>
                <label style={labelStyle}>Name :</label>
                <div>{allRmaInfo.name}</div>
              </div>
              <div style={contentStyle}>
                <label style={labelStyle}>Phone :</label>
                <div>{allRmaInfo.phone}</div>
              </div>
              <div style={contentStyle}>
                <label style={labelStyle}>Email :</label>
                <div>{allRmaInfo.email}</div>
              </div>

              <div style={contentStyle}>
                <label style={labelStyle}>Address :</label>
                <div style={{ paddingTop: "10px" }}>
                  <div>{allRmaInfo.address}</div>
                  <div>{allRmaInfo.address2}</div>
                  <div>
                    {allRmaInfo.city},{allRmaInfo.postcode},{allRmaInfo.country}
                  </div>
                </div>
              </div>

              <div style={contentStyle}>
                <label style={labelStyle}>Serial Number :</label>
                <div>{allRmaInfo.serialNum}</div>
              </div>
              <div style={contentStyle}>
                <label style={labelStyle}>RMA ID:</label>
                <div>
                  {" "}
                  {allRmaInfo.rma_id !== null && allRmaInfo.rma_id !== undefined
                    ? `RMA${String(allRmaInfo.rma_id).padStart(4, "0")}`
                    : "-"}
                </div>
              </div>
              <div style={contentStyle}>
                <label style={labelStyle}>Reason :</label>
                <div>{allRmaInfo.reason}</div>
              </div>
              <div style={contentStyle}>
                <label style={labelStyle}>
                  Supporting <br />
                  Image And Video :{" "}
                </label>
                <div>
                  <div>
                    <a
                      href={`http://localhost:3001/${allRmaInfo.receiptImage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Receipt
                    </a>
                  </div>
                  <div>
                    <a
                      href={`http://localhost:3001/${allRmaInfo.productImage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Product Image
                    </a>
                  </div>
                  <div>
                    <a
                      href={`http://localhost:3001/${allRmaInfo.productVideo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Product Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              style={{ width: "20px" }}
              onClick={() => handleInfo("close")}
            >
              Close
            </Button>
          </div>
          {allRmaInfo.rmaStatus === "Approve" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
                border: "3px solid black",
                borderRadius: "5px",
                padding: "15px",
              }}
            >
              <h2>Confirmation of RMA Approval</h2>
              <div>
                Your RMA are Approved , and Please follow Our Instruction.
              </div>
              <div>
                <b>Return Instruction</b>
              </div>
              <div>
                1. Packaging : Securely pack the item in its original packaging
              </div>
              <div>
                2. RMA Number : Include the RMA number inside the package
              </div>
              <div>
                3. Shipping Address : Ship the package to the following address
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <b>Shipping Address:</b>
                  <div>39-3, Jalan SP 2/2,</div>
                  <div>Taman Serdang Perdana,</div>
                  <div>43300 Seri Kembangan, Selangor , Malaysia</div>
                </div>
                <Button
                  variant="contained"
                  onClick={handleCopy}
                  style={{ width: "10px", height: "30px" }}
                >
                  Copy
                </Button>
                {copySuccess && <span>Copy Success</span>}
              </div>
              <div>Please Insert Your WayBill Tracking Number</div>
              <div>
                <TextField
                  label="Waybill"
                  id="waybill"
                  size="small"
                  type="text"
                  style={{
                    width: "40ch",
                    textAlign: "center",
                  }}
                  required
                />
              </div>
              <div>
                <TextField
                  select
                  label="Courier Provider"
                  id="courier"
                  size="small"
                  style={{
                    width: "40ch",
                  }}
                  required
                >
                  <MenuItem value="DHL Express">DHL Express</MenuItem>
                  <MenuItem value="J & T Express">J & T Express</MenuItem>
                  <MenuItem value="Flash Express">Flash Express</MenuItem>
                  <MenuItem value="Ninjavan">Ninjavan</MenuItem>
                  <MenuItem value="Shopee Express">Shopee Express</MenuItem>
                  <MenuItem value="Pos Laju">Pos Laju</MenuItem>
                </TextField>
              </div>
              <Button variant="contained">Submit</Button>
            </div>
          )}

          {allRmaInfo.rmaStatus === "Reject" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
                border: "3px solid black",
                borderRadius: "5px",
                padding: "15px",
              }}
            >
              <div>
                <h2>Confirmation of RMA Rejection</h2>
              </div>
              <div>
                <b>Reason for Rejection : Item not meeting return criteria</b>
              </div>
              <div>
                Contact Support : For assistance, contact us at
                eclipse@company.com or 1-800-XXX-XXXX.
              </div>
            </div>
          )}
          {allRmaInfo.rmaStatus === "Pending" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
                border: "3px solid black",
                borderRadius: "5px",
                padding: "15px",
              }}
            >
              <h2>Your RMA Confirmation Still In Pending</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
