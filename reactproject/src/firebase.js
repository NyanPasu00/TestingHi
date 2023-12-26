import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configurationcd
const firebaseConfig = {
  apiKey: "AIzaSyAePx7On3NL9x1g7DVV0O8O1Q3ug4pPCZg",
  authDomain: "auth-testing-fb441.firebaseapp.com",
  projectId: "auth-testing-fb441",
  storageBucket: "auth-testing-fb441.appspot.com",
  messagingSenderId: "980890206862",
  appId: "1:980890206862:web:6d5f2e8c9d664ff89e7fdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};

