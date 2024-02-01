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
  
      // Send verification email and wait for confirmation
      await sendEmailVerification(auth.currentUser);
      if (user.emailVerified) {
        // User is verified, now add details to Firestore
        await setDoc(doc(userRef, user.uid), {
          email,
          firstName,
          lastName,
          phoneNumber: fullPhoneNumber,
          country
        });
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


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
      if (currentuser && currentuser.emailVerified) {
        // Redirect user to login page
        navigate("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, facebookSignIn, forgotPassword }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}