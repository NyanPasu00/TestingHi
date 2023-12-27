import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./RMApage/Home";
import { NotFound } from "./RMApage/NotFound";
// import { Hook } from "./RMApage/reacthook";
// import { MyComponent } from "./RMApage/reacthook2";
import { Login } from "./RMApage/Login";
import Protected from "./RMApage/Protected";
import OverlayExample from "./RMApage/overlay";
import Admin from "./RMApage/Admin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/overlay" element={<OverlayExample />}></Route>
        {/* <Route path="/testhook2" element={<MyComponent />}></Route> */}
        {/* <Route path="/testhook" element={<Hook />}></Route> */}

        <Route
          path="/home"
          element={
            <Protected>
              {" "}
              <Home />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            <Protected>
              {" "}
              <Admin />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;