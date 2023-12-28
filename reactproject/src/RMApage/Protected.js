import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);

  
  
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    let redirectTimer;
    if (user) {
      redirectTimer = setTimeout(() => {
        setLoadingUser(false);
      }, 500); // Delay for an additional 0.5 seconds after user authentication
    }

    return () => clearTimeout(redirectTimer); // Clean up timer on component unmount or user change
  }, [user]);

  if(loadingUser){
   return <Loading />;
  }
  if (!user) {
    return <Navigate to="/" />;
  }else{
  return children;
  }
};

export default Protected;
