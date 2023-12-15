import React, { useState } from "react";
import { Login } from "./Login";
import { RegisProduct } from "./RegisProduct";
import { CreateRMA } from "./CreateRMA";

export function Home() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [orderStatus, setorderStatus] = useState(false);
  const [rmaStatus, setrmaStatus] = useState(false);
  const [profileStatus, setprofileStatus] = useState(false);
  const [confirmStatus, setconfirmStatus] = useState(true);

  const handleconfirmStatus = (confirm) => {
    setconfirmStatus(true);
  };

  const handleLogin = (login) => {
    setLoginStatus(login === "logout" ? false : true);
  };

  const handleRegisProduct = (product) => {
    setorderStatus(product === "registed" ? false : true);
  };

  const handleRMA = (rma) => {
    setrmaStatus(rma === "created" ? false : true);
    setconfirmStatus(rma === "created" ? false : true);
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
                <input type="text" id="fname" name="fname" defaultValue={"Wong Wai Feng"}/>
                <br />
                <label for="femail">Email :</label>
                <br />
                <input type="email" id="femail" name="femail" defaultValue={"wong20030323@gmail.com"}/>
                <br />
                <label for="fphone">Phone :</label>
                <br />
                <input type="text" id="fphone" name="fphone" defaultValue={"0125919199"}/>
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
                ></textarea><br />
                  <button onClick={() => {handleProfile("update")}}>Updated</button>
                  <button onClick={() => {handleProfile("update")}}>Cancel</button>
              </div>
            
            ) : null}
            <button onClick={handleRegisProduct}>Register Product</button>
            {orderStatus ? (
              <RegisProduct handleRegisProduct={handleRegisProduct} />
            ) : null}
            <button onClick={handleRMA}>Create RMA</button>
            {rmaStatus ? <CreateRMA handleRMA={handleRMA} /> : null}

           

            {!confirmStatus ? (
              <div
                style={{ border: "1px solid black", width: 300, padding: 30 }}
              >
                <p>
                  Customer Information <br />
                  Customer Name : Wong Wai Feng <br />
                  Phone : 0125919199 <br />
                  Email : wong20030323@gmail.com <br />
                  Address : NO.10 JALAN BPP 3/6 <br /> BANDAR PUTRA PERMAI{" "}
                  <br />
                  43300 SERI KEMBANGAN SELANGOR
                  <br />
                  Product Information <br />
                  Serial Number : SRN004 <br />
                  Reason of Return : Damaged <br />
                  Warranty End Dates : 12/12/2025 <br />
                  RMA Number : RMA33365 <br />
                </p>
                <button onClick={handleconfirmStatus}>Confirm</button>
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
                    <th>Warranty End Date</th>
                    <th>RMA Number</th>
                    <th>Reason of Return</th>
                    <th>RMA Status</th>
                  </tr>
                  <tr>
                  
                    <td>Wong</td>
                    <td>SRN001</td>
                    <td>Keyboard</td>
                    <td>12/12/2024</td>
                    <td>RMA77281</td>
                    <td>No Function</td>
                    <td>Received</td>
                    <button>Create RMA</button>
                  </tr>
                  <tr>
                   
                    <td>Wong</td>
                    <td>SRN002</td>
                    <td>Laptop</td>
                    <td>12/12/2025</td>
                    <td>RMA14785</td>
                    <td>Screen Broke</td>
                    <td>Pending</td>
                    <button>Create RMA</button>
                  </tr>
                  <tr>
                    <td>Wong</td>
                    <td>SRN003</td>
                    <td>Monitor</td>
                    <td>12/12/2024</td>
                    <td>RMA00893</td>
                    <td>No Function</td>
                    <td>Pending</td>
                    <button>Create RMA</button>
                  </tr>
                  <tr>
                    <td>Wong</td>
                    <td>SRN004</td>
                    <td>Monitor</td>
                    <td>12/12/2025</td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <button>Create RMA</button>
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
