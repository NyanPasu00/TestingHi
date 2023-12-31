import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./RMApage/Home";
import { NotFound } from "./RMApage/NotFound";
import { Hook } from "./RMApage/reacthook";
import { Login } from "./RMApage/Login";
import Protected from "./RMApage/Protected";
import Admin from "./RMApage/Admin";
import { HomeCopy } from "./RMApage/Home Copying";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/testhook" element={<Hook />}></Route>
        <Route path="/example" element={<HomeCopy/>}></Route>

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