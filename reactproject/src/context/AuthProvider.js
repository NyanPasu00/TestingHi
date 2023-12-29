import { createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [productData, setProductData] = useState({});

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
    <AuthContext.Provider value={{ googleSignIn, logOut, user , newUser, setNewUser ,productData,setProductData }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;


