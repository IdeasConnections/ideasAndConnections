import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, usersCollection } from "../firebase";

export async function googleSignIn() {
  const googleAuthProvider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;

    const userDocRef = doc(usersCollection, user.uid);

    // Check if the user document exists in Firestore before writing data
    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // User document doesn't exist, create it with extracted data
        await setDoc(userDocRef, {
          displayName: user.displayName,
          email: user.email,
          // Add any other relevant user data you want to store
        });
      } else {
        console.log(
          "User document already exists in Firestore, data not re-written."
        );
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
      throw error; // Re-throw the error to be handled appropriately
    }

    return result;
  } catch (error) {
    // Handle Google sign-in errors here
    console.error("Google sign-in error:", error);
    throw error; // Re-throw the error for centralized handling
  }
}
export function facebookSignIn() {
  const facebookAuthProvider = new FacebookAuthProvider();
  return signInWithPopup(auth, facebookAuthProvider);
}

export async function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      if (userCredential.user.emailVerified) {
        return userCredential;
      } else {
        throw new Error("Email not verified");
      }
    }
  );
}

export async function logOut() {
  return signOut(auth);
}
