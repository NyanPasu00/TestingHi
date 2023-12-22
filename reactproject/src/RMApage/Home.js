import React, { useState } from "react";
import { RegisProduct } from "./RegisProduct";
import { CreateRMA } from "./CreateRMA";
import "./style.css";
export function Home() {
  const [orderStatus, setorderStatus] = useState(false);
  const [rmaStatus, setrmaStatus] = useState(false);
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

  const logout = () => {
    localStorage.clear();
    window.location.reload();
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

  return (
    <div>
      <div>
        <h1>Welcome to Home Page , User!</h1>

        <div>
          <button onClick={logout}>Logout</button>

          <div>
            Step 1 : &nbsp;
            <button onClick={handleRegisProduct}>Register Product</button>
            {orderStatus ? (
              <RegisProduct handleRegisProduct={handleRegisProduct} />
            ) : null}
          </div>
          <div>
            Step 2 : &nbsp;
            <button onClick={handleRMA}>Create RMA</button>
            {rmaStatus ? <CreateRMA handleRMA={handleRMA} /> : null}
          </div>
          {confirmStatus ? (
            <div style={{ border: "1px solid black", width: 700, padding: 30 }}>
              <p>
                <b>Customer Information</b> <br />
                Customer Name : Wong Wai Feng <br />
                Phone : 0125919199 <br />
                Email : wong20030323@gmail.com <br />
                Address : NO.10 JALAN BPP 3/6 <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                BANDAR PUTRA PERMAI <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                43300 SERI KEMBANGAN <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                SELANGOR
                <br />
                <br />
                <b>Product Information</b> <br />
                RMA Number : RMA33365 <br />
                Serial Number : SRN002 <br />
                Product Name : Laptop <br />
                Reason of Return : Damaged <br />
                Warranty End Dates : 12/12/2025 <br />
              </p>
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                value="agreed"
              />
              <label htmlFor="agreeTerms">
                Make sure the above information is correct. Once confirmed, it
                cannot be changed.
              </label>
              <br />
              <button onClick={handleconfirmStatus}>Confirm</button>
              <button onClick={() => handleconfirmStatus("cancel")}>
                Cancel
              </button>
            </div>
          ) : null}
          {instructionStatus ? (
            <div style={{ border: "1px solid black", width: 700, padding: 30 }}>
              <p>
                <h3>Approved RMA Details</h3>
                <b>Return Instruction</b>
                <br />
                <br />
                1. Packaging : Securely pack the item in its original packaging{" "}
                <br />
                2. RMA Number : Include the RMA number inside the package <br />
                3. Shipping Address : Ship the package to the following address{" "}
                <br />
                <br />
                NO.28 JALAN BPP 3/6 <br /> BANDAR PUTRA PERMAI <br />
                43300 SERI KEMBANGAN SELANGOR
                <br />
                <br />
                RMA Number : RMA33365 <br />
                Serial Number : SRN003 <br />
                Product Number : Monitor <br />
                Reason of Return : Damaged <br />
              </p>
              <button onClick={() => handleInstruction("close")}>
                Back To Home Page
              </button>
            </div>
          ) : null}

          {rejectStatus ? (
            <div style={{ border: "1px solid black", width: 700, padding: 30 }}>
              <p>
                <h3>Reject RMA Details</h3>
                <b>Reason for Rejection : Item not meeting return criteria </b>
                <br />
                Alternatives : Please ensure the item meets return conditions
                and resubmit the RMA <br />
                Contact Support : For assistance, contact us at
                eclipse@company.com or 1-800-XXX-XXXX. <br />
              </p>
              <button onClick={() => handleReject("close")}>
                Back To Home Page
              </button>
            </div>
          ) : null}
        </div>

        <div style={{ border: "1px solid black" }}>
          <div>
            {/* Display RMA table or details */}
            <h2>RMA Table</h2>
            <div>Customer Information You want To Edit :</div>
            <button>Edit</button>
            <table>
              <thead>
                <tr>
                  <th>Register Date</th>
                  <th>Customer Name</th>
                  <th>Serial Number</th>
                  <th>Product Name</th>
                  <th>Warranty Status</th>
                  <th>Warranty Expired Date</th>
                  <th>Product Status</th>
                  <th>RMA Number</th>
                  <th>Reason of Return</th>
                  <th>RMA Status</th>
                </tr>
                <tr>
                  <td>16/11/2022</td>
                  <td>Wong</td>
                  <td>SRN001</td>
                  <td>Keyboard</td>
                  <td>Active</td>
                  <td>21/12/2024</td>
                  <td>Validated</td>
                  <td>RMA77281</td>
                  <td>No Function</td>
                  <td>Reject</td>
                  <td>
                    <button
                      onClick={() => {
                        handleRMA("shortcut");
                      }}
                    >
                      Create RMA
                    </button>
                  </td>
                  <td>
                    <button onClick={handleReject}>RMA Information</button>
                  </td>
                </tr>
                <tr>
                  <td>16/01/2023</td>
                  <td>Wong</td>
                  <td>SRN002</td>
                  <td>Laptop</td>
                  <td>Active</td>
                  <td>21/12/2024</td>
                  <td>Validated</td>
                  <td>RMA14785</td>
                  <td>Screen Broke</td>
                  <td>Pending</td>
                  <td>
                    <button
                      onClick={() => {
                        handleRMA("shortcut");
                      }}
                    >
                      Create RMA
                    </button>
                  </td>
                  <td>
                    <button>Cancel</button>
                  </td>
                </tr>

                <tr>
                  <td>16/11/2022</td>
                  <td>Wong</td>
                  <td>SRN003</td>
                  <td>Monitor</td>
                  <td>Active</td>
                  <td>21/12/2024</td>
                  <td>Validated</td>
                  <td>RMA33365</td>
                  <td>No Function</td>
                  <td>Approve</td>
                  <td>
                    <button
                      onClick={() => {
                        handleRMA("shortcut");
                      }}
                    >
                      Create RMA
                    </button>
                  </td>
                  <td>
                    <button onClick={handleInstruction}>RMA Information</button>
                  </td>
                  <td>
                    <a href="http://localhost:3000">WayBill</a>
                  </td>
                </tr>
                <tr>
                  <td>16/11/2022</td>
                  <td>Wong</td>
                  <td>SRN004</td>
                  <td>Monitor</td>
                  <td>Expired</td>
                  <td>20/10/2023</td>
                  <td>Validated</td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                </tr>
                <tr>
                  <td>16/12/2023</td>
                  <td>Wong</td>
                  <td>SRN005</td>
                  <td>Monitor</td>
                  <td> - </td>
                  <td> - </td>
                  <td>Validation</td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td>
                    <button
                      onClick={() => {
                        handleRMA("shortcut");
                      }}
                    >
                      Create RMA
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>16/11/2022</td>
                  <td>Wong</td>
                  <td>SRN006</td>
                  <td>Monitor</td>
                  <td> - </td>
                  <td> - </td>
                  <td>Unsuccessful</td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td>
                    <button
                      onClick={() => {
                        handleRMA("shortcut");
                      }}
                    >
                      Create RMA
                    </button>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
