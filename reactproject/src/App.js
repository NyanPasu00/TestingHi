import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./RMApage/Home";
import { NotFound } from "./RMApage/NotFound";
function App() {
  
  return (
    <div>
   <h4>TechQuila Solutions</h4>

    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>

      
    </Routes>
    </div>
  );
}

export default App;

