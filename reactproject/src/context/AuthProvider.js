import { createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [productData, setProductData] = useState({});
  const [allRmaInfo, setallRmaInfo] = useState({});

  const infoSectionStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 10,
  };

  const labelStyle = {
    marginRight: 10,
    fontWeight: "bold",
    minWidth: "150px",
  };
  const contentStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  };
  const googleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        user,
        newUser,
        setNewUser,
        productData,
        setProductData,
        allRmaInfo,
        setallRmaInfo,
        infoSectionStyle,
        labelStyle,
        contentStyle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
