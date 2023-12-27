import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function Admin() {
  const { user, logOut } = useContext(AuthContext);

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
      <h1>
        Welcome to Admin Page , {user?.displayName} , {user?.email}
      </h1>
      <img src={user?.photoURL}></img> <br />
    </>
  );
}
