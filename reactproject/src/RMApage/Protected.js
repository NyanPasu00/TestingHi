import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);

  <Loading />;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
