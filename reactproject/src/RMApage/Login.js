import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase";
export function Login() {
  const { googleSignIn, user } = useContext(AuthContext);
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

    getRedirectResult(auth).finally(() => setIsLoading(false));
  }, []);

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
          "Loading..."
        ) : (
          <div>
            <h1>Login Page</h1>
            <button onClick={() => handleGoogleSignIn()}>
              Sign In With Google
            </button>
          </div>
        )}
      </div>
    </>
  );
}
