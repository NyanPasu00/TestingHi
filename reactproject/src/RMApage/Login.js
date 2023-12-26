import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Login() {
  const { googleSignIn, user } = UserAuth();
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

  const checkAndInsertUser = (fetchedUid) => {
    const checking = fetchedUid.filter((arr) => arr.uid === user?.uid);
    console.log(checking);
    if (checking.length === 0) {
      axios
        .post("http://localhost:3001/insert", {
          email: user?.email,
          name: user?.displayName,
          uid: user?.uid,
        })
        .then(() => {
          console.log("Sending Success");
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
        });
    }
  };
  useEffect(() => {
    if (user != null) {
      axios
        .get("http://localhost:3001/getAdminUid")
        .then((response) => {
          const fetchedAdminUid = response.data;
          const admin = fetchedAdminUid.filter((arr) => arr.admin_uid === user?.uid);
          
          if (admin.length === 1) {
            navigate("/admin")
          }else{
            axios
              .get("http://localhost:3001/getUid")
              .then((response) => {
                const fetchedUid = response.data;
                checkAndInsertUser(fetchedUid);
                navigate("/home");
              })
              .catch((error) => {
                console.error("Error getting UID:", error);
              });
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
        <h1>Login Page</h1>
        <button onClick={() => handleGoogleSignIn()}>
          Sign In With Google
        </button>
      </div>
    </>
  );
}
