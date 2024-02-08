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
import { auth, db, storage } from "../firebase";
import {collection, doc, setDoc, updateDoc, getDoc} from 'firebase/firestore'
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'



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

  async function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      console.log('test', user)
   // Extract user data
      const { displayName, email } = user;
    // Write user data to Firestore
      await setDoc(doc(userRef, user.uid), {
        displayName,
        email,
        // Any other data you want to store
      });
      return result;
    } catch (error) {
      // Handle sign-in errors
      console.error("Google sign-in error:", error);
      throw error;
    }
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

  async function uploadImage (file){
   const profilePicsRef = ref(storage, `files/${file.name}`)
   const uploadTask = uploadBytesResumable(profilePicsRef, file )
   uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
      if (currentuser && currentuser.emailVerified) {
        navigate("/");
      }
      if (currentuser) {
        const userDocRef = doc(userRef, currentuser.uid);
        try {
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUser(prevUser => ({ ...prevUser, ...userData }));
          } else {
            console.log("User document does not exist in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
        }
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
        editProfile,
        uploadImage
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}