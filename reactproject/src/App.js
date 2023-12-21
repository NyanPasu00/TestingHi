import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./RMApage/Home";
import { NotFound } from "./RMApage/NotFound";
import { Hook } from "./RMApage/reacthook";
import { MyComponent} from "./RMApage/reacthook2";
import { Login } from "./RMApage/Login";
import RequireAuth from "./RMApage/RequireAuth";
function App() {
  return (
    <div>
      <h4>TechQuila Solutions</h4>
      <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="/testhook" element={<Hook />}></Route>
      <Route path="/testhook2" element={<MyComponent />}></Route>

      <Route element={<RequireAuth/>}>
      <Route path="/home" element={<Home />}/>
      </Route>
      </Routes>
      
    </div>
  );
}

export default App;
