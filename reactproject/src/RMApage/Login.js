import React, { useEffect, useState, useLayoutEffect, useContext} from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

export function Login() {
  const { googleSignIn, user , setNewUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Authentication popup was canceled by the user.");
      } else {
        console.error("Error signing in with Google:", error);
      }
    }
  };

  useLayoutEffect(() => {
    setIsLoading(true);
    const delayRedirect = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delayRedirect);
  }, [user]);

  useEffect(() => {
    if (user != null) {
      axios
        .post("http://localhost:3001/loginInformation", {
          email: user?.email,
          name: user?.displayName,
          uid: user?.uid,
        })
        .then((response) => {
          console.log(response.data);
          if(response.data.affectedRows)
          {
            setNewUser(true);
          }
          if (response.data.admin) {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        })
        .catch((error) => {
          console.error("Error getting UID:", error);
        });
    }
  }, [user]);

  return (
    <>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>Login Page</h1>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleGoogleSignIn()}
            >
              Sign In With Google
            </Button>
          </div>
        )} 
      </div>
    </>
  );
}
