import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  signInWithRedirect
} from "firebase/auth";
import { auth, provider } from "../firebase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user , setUser] = useState(null);

  const googleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
    });
    return () => {
        unsubscribe();
    }
  },[]);
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
// export default AuthContext;
export const UserAuth = () => {
  return useContext(AuthContext);
};
