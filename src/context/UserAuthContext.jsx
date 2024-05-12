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
  Timestamp 
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { isEqual } from "date-fns";

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
  const recentActivityRef = collection(db, 'recent_activities');

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
     await addRecentActivity(userID, 'profile_details',null);
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

  async function addConnection(userId, targetId, flag) {
    try {
      let userToConnect = doc(connectionRef, `${userId}_${targetId}`);
      setDoc(userToConnect, { userId, targetId, flag });
    } catch (err) {
      console.log(err);
    }
  }

  async function getConnection(userId, setconnectionsList) {
    try {
        console.log(userId, "useiisdhi")

        var reqconnection;
        var recvconnection;
        var connection = [];
        var singleconnection = await query(connectionRef, where("userId", "==", userId), where("flag", "==", "Pending"))

        onSnapshot(singleconnection, async (res) => {
            reqconnection = res.docs.map((doc) => doc.data());
            for (var i = 0; i < reqconnection.length; i++) {
              var newData = reqconnection[i];
              console.log(newData)
              const userDocRef = doc(userRef, reqconnection[i]['targetId']);
              const userDocSnapshot = await getDoc(userDocRef);
              if (userDocSnapshot.exists()) {
                  const userData = userDocSnapshot.data();
                  newData['name'] = userData
              }
              connection.push({"reqconnection" : reqconnection});
              
              console.log(connection)
              setconnectionsList(connection);
             // setconnectionsList(connection);
            }
        })

        //var reqconnection;
        var reqsingleconnection = await query(connectionRef, where("targetId", "==", userId))

        onSnapshot(reqsingleconnection, async (res) => {
            recvconnection = res.docs.map((doc) => doc.data());
            for (var i = 0; i < recvconnection.length; i++) {
              var newData = recvconnection[i];
              console.log(newData)
              const userDocRef = doc(userRef, recvconnection[i]['userId']);
              const userDocSnapshot = await getDoc(userDocRef);
              if (userDocSnapshot.exists()) {
                  const userData = userDocSnapshot.data();
                  newData['name'] = userData
              }
              connection.push({"recvconnection" : recvconnection});
             // connection.push(recvconnection);
              
              console.log(connection)
              setconnectionsList(connection);
            
            }
        })
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
        await addRecentActivity(userId, 'like',postId);
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
  async function postComment(postId, comment, timeStamp, userName, useruid,userProfilePhoto) {
    try {
      addDoc(commentRef, {
        postId,
        comment,
        timeStamp,
        userName,
        useruid,
        userProfilePhoto
      });
      console.log(postId, 'postId')
      await addRecentActivity(useruid, 'comment',postId);
    } catch (err) {
      console.log(err);
    }
  }

  async function getComments(postId, setCommentList, setCommentCount) {
    try{
      console.log(postId, 'post id')
      let comments
      let singlePostQuery = await query(commentRef, where("postId", "==",  postId))
      onSnapshot(singlePostQuery, async(res)=> {  
         comments = res.docs.map((doc) => doc.data());
      console.log(comments, 'commentsCange1')
        // let newRes = await JSON.parse(res)
        // res.docs.map((doc) => {
        //  console.log(doc, 'doc')
        //   return {
        //     id: doc.id,
        //     ...doc.data(),
           
        //   }
        // })
        setCommentList(comments);
        setCommentCount(comments.length); // Set the comment count
      
      })
      
    }
    catch(err) {
      console.log(err)
    }
  }

  async function updatePost(id, status, postImage) {
    let postToUpdate = doc(postRef, id);
    try {
      if (postImage) {
        await updateDoc(postToUpdate, { status, postImage });
      } else {
        await updateDoc(postToUpdate, { status });
      }
    } catch (err) {
      console.log(err);
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

  async function addRecentActivity(userId, activityType, postId=null) {
    try {
        const timestamp = Timestamp.now();
        await addDoc(recentActivityRef, {
            userId,
            activityType,
            timestamp,
            postId
        });
    } catch (err) {
        console.log(err);
    }
}

async function getRecentActivity(userId) {
  try { 
      const q = query(recentActivityRef, where("userId", "==", userId));   
      const querySnapshot = await getDocs(q);
      const recentActivities = [];
      for (const docSnapshot of querySnapshot.docs) {
          const activity = {
              activityType: docSnapshot.data().activityType,
              postId: docSnapshot.data().postId,
              timestamp: docSnapshot.data().timestamp.toDate(),
          };
          const postDocRef = doc(postRef, activity.postId); 
          const postDocSnapshot = await getDoc(postDocRef);
          if (postDocSnapshot.exists()) { 
              const postData = postDocSnapshot.data();
              activity.postUsername = postData.userName; 
          }
          recentActivities.push(activity);
      }

      console.log(recentActivities);

      return recentActivities;
  } catch (err) {
      console.log(err);
      return [];
  }
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
        getConnection,
        deletePost,
        uploadPostImage,
        getRecentActivity
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
