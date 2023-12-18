import React, { useState } from "react";
import { Login } from "./Login";
import { RegisProduct } from "./RegisProduct";
import { CreateRMA } from "./CreateRMA";

export function Home() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [orderStatus, setorderStatus] = useState(false);
  const [rmaStatus, setrmaStatus] = useState(false);
  const [profileStatus, setprofileStatus] = useState(false);
  const [confirmStatus, setconfirmStatus] = useState(false);
  const [instructionStatus, setinstructionStatus] = useState(false);
  const [rejectStatus, setrejectStatus] = useState(false);

  const handleInstruction = (instruction) => {
    setinstructionStatus(instruction === "close" ? false : true);
  };
  const handleReject = (reject) => {
    setrejectStatus(reject === "close" ? false : true);
  };
  const handleconfirmStatus = (confirm) => {
    if (confirm === "cancel") {
      setrmaStatus(true);
    }
    setconfirmStatus(false);
  };

  const handleLogin = (login) => {
    setLoginStatus(login === "logout" ? false : true);
    if (login === "logout") {
      setorderStatus(false);
      setrmaStatus(false);
      setprofileStatus(false);
      setconfirmStatus(false);
      setinstructionStatus(false);
      setrejectStatus(false);
    }
  };

  const handleRegisProduct = (product) => {
    setorderStatus(
      product === "registed" || product === "cancel" ? false : true
    );
  };

  const handleRMA = (rma) => {
    if (rma === "shortcut") {
      setrmaStatus(true);
    }
    setrmaStatus(rma === "created" || rma === "cancel" ? false : true);
    setconfirmStatus(rma === "created" ? true : false);
  };

  const handleProfile = (updated) => {
    setprofileStatus(updated === "update" ? false : true);
  };

  return (
    <div>
      {!loginStatus ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <div>
          <h1>Welcome to Home Page , User!</h1>
          <div>
            <button onClick={() => handleLogin("logout")}>Logout</button>
            {!loginStatus ? <Login handleLogin={handleLogin} /> : null}

            <button onClick={handleProfile}>Edit Profile</button>
            {profileStatus ? (
              <div>
                <h4>Customer Information</h4>
                <label for="fname">Your Name:</label>
                <br />
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  defaultValue={"Wong Wai Feng"}
                />
                <br />
                <label for="femail">Email :</label>
                <br />
                <input
                  type="email"
                  id="femail"
                  name="femail"
                  defaultValue={"wong20030323@gmail.com"}
                />
                <br />
                <label for="fphone">Phone :</label>
                <br />
                <input
                  type="text"
                  id="fphone"
                  name="fphone"
                  defaultValue={"0125919199"}
                />
                <br />
                <label for="address">Address :</label>
                <br />
                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  cols="50"
                  placeholder="Enter your address..."
                  defaultValue={"NO.10 JALAN BPP 3/6"}
                ></textarea>
                <br />
                <button
                  onClick={() => {
                    handleProfile("update");
                  }}
                >
                  Updated
                </button>
                <button
                  onClick={() => {
                    handleProfile("update");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : null}
            <button onClick={handleRegisProduct}>Register Product</button>
            {orderStatus ? (
              <RegisProduct handleRegisProduct={handleRegisProduct} />
            ) : null}
            <button onClick={handleRMA}>Create RMA</button>
            {rmaStatus ? <CreateRMA handleRMA={handleRMA} /> : null}

            {confirmStatus ? (
              <div
                style={{ border: "1px solid black", width: 700, padding: 30 }}
              >
                <p>
                  <b>Customer Information</b> <br />
                  Customer Name : Wong Wai Feng <br />
                  Phone : 0125919199 <br />
                  Email : wong20030323@gmail.com <br />
                  Address : NO.10 JALAN BPP 3/6 <br /> BANDAR PUTRA PERMAI{" "}
                  <br />
                  43300 SERI KEMBANGAN SELANGOR
                  <br />
                  <br />
                  <b>Product Information</b> <br />
                  RMA Number : RMA33365 <br />
                  Serial Number : SRN004 <br />
                  Reason of Return : Damaged <br />
                  Warranty End Dates : 12/12/2025 <br />
                </p>
                <button onClick={handleconfirmStatus}>Confirm</button>
                <button onClick={() => handleconfirmStatus("cancel")}>
                  Cancel
                </button>
              </div>
            ) : null}
            {instructionStatus ? (
              <div
                style={{ border: "1px solid black", width: 700, padding: 30 }}
              >
                <p>
                <h3>Approved RMA Details</h3> 
                  <b>Return Instruction</b><br /><br />
                  1. Packaging : Securely pack the item in its original
                  packaging <br />
                  2. RMA Number : Include the RMA number inside the package{" "}
                  <br />
                  3. Shipping Address : Ship the package to the following
                  address <br /><br />
                  NO.28 JALAN BPP 3/6 <br /> BANDAR PUTRA PERMAI <br />
                  43300 SERI KEMBANGAN SELANGOR
                  <br />
                  <br />
                  
                  RMA Number : RMA33365 <br />
                  Serial Number : SRN004 <br />
                  Reason of Return : Damaged <br />
                  要在这部分加个日期? 让他在什么时候寄回来?
                </p>
                <button onClick={() => handleInstruction("close")}>Back To Home Page</button>
            
              </div>
            ) : null}

              {rejectStatus ? (
              <div
                style={{ border: "1px solid black", width: 700, padding: 30 }}
              >
                <p>
                <h3>Reject RMA Details</h3> 
            
                  <b>Reason for Rejection : Item not meeting return criteria </b><br />
                  Alternatives : Please ensure the item meets return conditions and resubmit the RMA <br />
                  Contact Support : For assistance, contact us at eclipse@company.com or 1-800-XXX-XXXX. <br />
                </p>
                <button onClick={() => handleReject("close")}>Back To Home Page</button>
            
              </div>
            ) : null}
          </div>

          <div style={{ border: "1px solid black" }}>
            <div>
              {/* Display RMA table or details */}
              <h2>RMA Table</h2>

              <table>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Serial Number</th>
                    <th>Product Name</th>
                    <th>Warranty Status</th>
                    <th>RMA Number</th>
                    <th>Reason of Return</th>
                    <th>RMA Status</th>
                  </tr>
                  <tr>
                    <td>Wong</td>
                    <td>SRN001</td>
                    <td>Keyboard</td>
                    <td>Active</td>
                    <td>RMA77281</td>
                    <td>No Function</td>
                    <td>Reject</td>
                    <button
                      onClick={() => {
                        handleRMA("shortcut");
                      }}
                    >
                      Create RMA
                    </button>
                    <button
                      onClick={handleReject}
                    >
                      RMA Information
                    </button>
                  </tr>
                  <tr>
                    <td>Wong</td>
                    <td>SRN002</td>
                    <td>Laptop</td>
                    <td>Expired</td>
                    <td>RMA14785</td>
                    <td>Screen Broke</td>
                    <td>Pending</td>
                    <button
                      onClick={() => {
                        handleRMA("shortcut");
                      }}
                    >
                      Create RMA
                    </button>
                  </tr>

                  <tr>
                    <td>Wong</td>
                    <td>SRN003</td>
                    <td>Monitor</td>
                    <td>Active</td>
                    <td>RMA00893</td>
                    <td>No Function</td>
                    <td>Approve</td>
                    <button
                      onClick={() => {
                        handleRMA("shortcut");
                      }}
                    >
                      Create RMA
                    </button>
                    <button onClick={handleInstruction}>
                      RMA Information
                    </button>
                  </tr>
                  <tr>
                    <td>Wong</td>
                    <td>SRN004</td>
                    <td>Monitor</td>
                    <td>Active</td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <button
                      onClick={() => {
                        handleRMA("shortcut");
                      }}
                    >
                      Create RMA
                    </button>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
