import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {collection, doc, setDoc, updateDoc} from 'firebase/firestore'


const userAuthContext = createContext();


export function UserAuthContextProvider({ children }) {

  const navigate = useNavigate()

  const [user, setUser] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const userRef = collection(db, "users");

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

  async function editProfile (userID, payload){
    let userToEdit = doc(userRef, userID)
    await updateDoc(userToEdit, payload)
    .then(()=> {
      console.log("profile updated")
      setUser(prevUser => ({ ...prevUser, ...payload }));
     })
    .catch((err)=> console.log(err))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
      if (currentuser && currentuser.emailVerified) {
        navigate("/");
      }
    });
   return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ 
        user, 
        logIn, 
        signUp, 
        logOut,
        googleSignIn, 
        facebookSignIn, 
        forgotPassword , 
        darkMode, 
        toggleDarkMode,
        editProfile
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}