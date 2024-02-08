import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import { auth, db } from "../firebase";
import {collection, doc, setDoc} from 'firebase/firestore'


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const userRef = collection(db, "users");
  const [user, setUser] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  async function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.emailVerified) {
          return userCredential;
        } else {
          throw new Error("Email not verified");
        }
      });
  }
  
  
  async function signUp(email, password, firstName, lastName, fullPhoneNumber, country) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(auth.currentUser);
        try {
          await setDoc(doc(userRef, user.uid), {
            email,
            firstName,
            lastName,
            phoneNumber: fullPhoneNumber,
            country
          });
        } catch (error) {
          console.error("Error adding user data to Firestore:", error);
          // Additional error handling, e.g., displaying an error message to the user
        }     
  
      return userCredential;
    } catch (error) {
      throw error;
    }
  }
  

  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  }
  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function toggleDarkMode() { // Function to toggle dark mode
    setDarkMode(prevMode => !prevMode);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
      if (currentuser && currentuser.emailVerified) {
        // Redirect user to login page
        navigate("/");
      }
  
      // Save user details to local storage
      if (currentuser) {
        localStorage.setItem("user", JSON.stringify(currentuser));
      } else {
        localStorage.removeItem("user");
      }
    });
  
    // Retrieve user details from local storage if available
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, facebookSignIn, forgotPassword , darkMode, toggleDarkMode}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}