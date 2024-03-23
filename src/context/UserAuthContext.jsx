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
  sendEmailVerification,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const userRef = collection(db, "users");
  const connectionRef = collection(db, "connections");
  const postRef = collection(db, "posts");
  const likeRef = collection(db, "likes");
  const commentRef = collection(db, "comments");

  async function logIn(email, password) {
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

  async function signUp(
    email,
    password,
    firstName,
    lastName,
    fullPhoneNumber,
    country
  ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(auth.currentUser);
      try {
        await setDoc(doc(userRef, user.uid), {
          email,
          firstName,
          lastName,
          phoneNumber: fullPhoneNumber,
          country,
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

      const userDocRef = doc(userRef, user.uid);

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

  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function toggleDarkMode() {
    // Function to toggle dark mode
    setDarkMode((prevMode) => !prevMode);
  }

  async function editProfile(userID, payload) {
    let userToEdit = doc(userRef, userID);
    await updateDoc(userToEdit, payload)
      .then(() => {
        console.log("profile updated");
        setUser((prevUser) => ({ ...prevUser, ...payload }));
      })
      .catch((err) => console.log(err));
  }

  async function uploadImage(file, id, setModalOpen, setProgress) {
    const profilePicsRef = ref(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(profilePicsRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
          editProfile(id, { imageLink: response });
          setModalOpen(false);
        });
      }
    );
  }

  async function uploadCoverPhoto(file, id, setModalOpen, setProgress) {
    const profilePicsRef = ref(storage, `coverImages/${file.name}`);
    const uploadTask = uploadBytesResumable(profilePicsRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
          editProfile(id, { coverPhotoLink: response });
          setModalOpen(false);
        });
      }
    );
  }

  async function getAllUsers() {
    try {
      const usersSnapshot = await getDocs(userRef);
      const users = [];
      usersSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async function addConnection(userId, targetId) {
    try {
      let userToConnect = doc(connectionRef, `${userId}_${targetId}`);
      setDoc(userToConnect, { userId, targetId });
    } catch (err) {
      console.log(err);
    }
  }

  async function postStatus(obj) {
    addDoc(postRef, obj)
      .then((res) => {
        console.log("Document added");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getStatus(setAllStatus) {
    onSnapshot(postRef, (response) => {
      setAllStatus(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
      );
    });
  }
  async function likePost(userId, postId, liked) {
    try {
      let docToLike = doc(likeRef, `${userId}_${postId}`);
      if (liked) {
        deleteDoc(docToLike);
      } else {
        setDoc(docToLike, { userId, postId });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getLikesByUser(userId, postId, setLikesCount, setLiked) {
    try {
      let likeQuery = query(likeRef, where("postId", "==", postId));
      onSnapshot(likeQuery, (res) => {
        let likes = res.docs.map((doc) => doc.data());
        let likesCount = likes?.length;
        const isLiked = likes.some((like) => like.userId === userId);
        setLikesCount(likesCount);
        setLiked(isLiked);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function postComment(postId, comment, timeStamp, userName, useruid) {
    try {
      addDoc(commentRef, {
        postId,
        comment,
        timeStamp,
        userName,
        useruid
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getComments(postId, setCommentList, setCommentCount) {
    try{
      let singlePostQuery = query(commentRef, where('postId', '==', postId))
      onSnapshot(singlePostQuery, (res)=> {
        const comments = res.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
           
          }
        })
        setCommentList(comments);
        setCommentCount(comments.length); // Set the comment count
      })
    }
    catch(err) {
      console.log(err)
    }
  }

  async function updatePost (id, status){
    let postToUpdate = doc(postRef, id);
    try{
      updateDoc(postToUpdate, {status})
    }
    catch(err){
      console.log(err)
    }
  }

  async function deletePost (id) {
    let postToDelete = doc(postRef,id)
    try{
      deleteDoc(postToDelete)
    }
    catch(err){
      console.log(err)
    }
  }

  async function uploadPostImage(file, setPostImage, setProgress) {
    const postImagesRef = ref(storage, `postImages/${file.name}`);
    const uploadTask = uploadBytesResumable(postImagesRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress)
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
          setPostImage(response)
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
            console.log("uuuuuu", userData);
            setUser((prevUser) => ({ ...prevUser, ...userData }));
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
        forgotPassword,
        darkMode,
        toggleDarkMode,
        editProfile,
        uploadImage,
        uploadCoverPhoto,
        getAllUsers,
        addConnection,
        postStatus,
        getStatus,
        likePost,
        getLikesByUser,
        postComment,
        getComments,
        updatePost,
        deletePost,
        uploadPostImage
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
