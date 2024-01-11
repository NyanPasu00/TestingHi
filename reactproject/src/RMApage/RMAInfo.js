import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";

export default function RMAInfo({ handleInfo }) {
  const { allRmaInfo , labelStyle } =
    useContext(AuthContext);

  const [copySuccess, setCopySuccess] = useState(false);
  const [waybill, setWaybill] = useState("");
  const [courier, setCourier] = useState("");
  const handleCopy = () => {
    const addressText = `39-3, Jalan SP 2/2, Taman Serdang Perdana, 43300 Seri Kembangan, Selangor, Malaysia`;
    navigator.clipboard
      .writeText(addressText)
      .then(() => setCopySuccess(true))
      .catch((err) => console.error("Failed to copy:", err));
  };

  const handleWaybill = () => {
    axios
      .put("http://localhost:3001/updateWaybill", {
        waybill: waybill,
        courier: courier,
        serialNum: allRmaInfo.serialNum,
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
  };
  console.log(allRmaInfo);
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
            <h2>RMA Info</h2>

            <table>
              <tbody>
                <tr>
                  <td style={labelStyle}>Name</td>
                  <td>:</td>
                  <td>{allRmaInfo.name}</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Phone</td>
                  <td>:</td>
                  <td>{allRmaInfo.phone}</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Email</td>
                  <td>:</td>
                  <td>{allRmaInfo.email}</td>
                </tr>

                <tr>
                  <td style={labelStyle}>Address</td>
                  <td>:</td>
                  <td>
                    <div style={{ paddingTop: "10px" }}>
                      <div>{allRmaInfo.address}</div>
                      <div>{allRmaInfo.address2}</div>
                      <div>
                        {allRmaInfo.city}, {allRmaInfo.postcode},{" "}
                        {allRmaInfo.country}
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={labelStyle}>Serial Number</td>
                  <td>:</td>
                  <td>{allRmaInfo.serialNum}</td>
                </tr>

                <tr>
                  <td style={labelStyle}>Product Name</td>
                  <td>:</td>
                  <td>{allRmaInfo.productname}</td>
                </tr>
                <tr>
                  <td style={labelStyle}>K Plus</td>
                  <td>:</td>
                  <td>{allRmaInfo.kplus ? "Yes" : "No"}</td>
                </tr>

                <tr>
                  <td style={labelStyle}>RMA ID</td>
                  <td>:</td>
                  <td>
                    {allRmaInfo.rma_id !== null &&
                    allRmaInfo.rma_id !== undefined
                      ? `RMA${String(allRmaInfo.rma_id).padStart(4, "0")}`
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td style={labelStyle}>Reason </td>
                  <td>:</td>
                  <td>{allRmaInfo.reason}</td>
                </tr>
                <tr>
                  <td style={labelStyle}>
                    Supporting <br /> Image And Video
                  </td>
                  <td>:</td>
                  <td>
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
                  </td>
                </tr>
              </tbody>
            </table>
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
              <h2>RMA Status</h2>
              <h3>Confirmation of RMA Approval</h3>
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
                {copySuccess && <div>Copy Success</div>}
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
                  onChange={(e) => setWaybill(e.target.value)}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Courier Provider"
                  id="courier"
                  size="small"
                  style={{
                    width: "40ch",
                  }}
                  onChange={(e) => setCourier(e.target.value)}
                  required
                ></TextField>
              </div>
              <Button
                variant="contained"
                style={{ width: "20px" }}
                onClick={handleWaybill}
              >
                Submit
              </Button>
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
                <h2>RMA Status</h2>
                <h3>Confirmation of RMA Rejection</h3>
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
              <h2>RMA Status</h2>
              <h3>
                Your RMA confirmation is still pending. Please be patient, and
                we will notify you of any updates.
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
