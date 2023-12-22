import React, { useEffect, useState ,useContext} from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Home } from "./Home";

export function Login() {
  // const {setAuth} = useContext(AuthContext);

  const [value,setValue] = useState('')
  const handleClick = () =>{
    signInWithPopup(auth,provider).then((data) =>{
     
      setValue(data.user.email)
      localStorage.setItem("email",data.user.email)
    }).catch((error) => {
      if (error.code === 'auth/cancelled-popup-request') {
        // Handle popup cancellation
        console.log('Authentication popup was canceled by the user.');
        // Provide user feedback or perform actions (e.g., display a message)
      } else {
        // Handle other errors
        console.error('Error signing in with Google:', error);
      }
    });
  }

  useEffect(() => {
    setValue(localStorage.getItem('email'))
  })
  return (
    <>
      <div>
        <h1>Login Page</h1>
        
    {value?<Home/>:
        <button onClick={handleClick}>Sign In With Google</button>
    }
      </div>
    </>
  );
}
