import React from "react";
import { UserAuth } from "../context/AuthProvider";

export default function Admin() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={() => handleSignOut()}>Logout</button>
      <h1>Welcome to Admin Page , {user?.displayName} , {user?.email}</h1>
      <img src={user?.photoURL}></img> <br />
    </>
  );
}
