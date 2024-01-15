import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./RMApage/Home";
import { NotFound } from "./RMApage/NotFound";
import { Login } from "./RMApage/Login";
import Protected from "./RMApage/Protected";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>

        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
