import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  Timestamp,
  addDoc,
  and,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  commentsCollection,
  connectionsCollection,
  likesCollection,
  recentActivityCollections,
  storage,
  usersCollection,
} from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [darkMode, setDarkMode] = useState(false);

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
        await setDoc(doc(usersCollection, user.uid), {
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

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function toggleDarkMode() {
    // Function to toggle dark mode
    setDarkMode((prevMode) => !prevMode);
  }

  async function editProfile(userID, payload) {
    let userToEdit = doc(usersCollection, userID);
    await updateDoc(userToEdit, payload)
      .then(() => {
        console.log("profile updated");
        setUser((prevUser) => ({ ...prevUser, ...payload }));
      })
      .catch((err) => console.log(err));
    await addRecentActivity(userID, "profile_details", null);
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

  async function getAllUsers(userId = null, setUsersList) {
    try {
      const usersSnapshot = await getDocs(usersCollection);
      //var singleconnection = await query(connectionsCollection, where("userId", "==", userId), where("flag", "==", "Pending"))
      const users = [];

      if (userId == null || userId == "") {
        usersSnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        console.log(users);
        //setUsersList(users);
        return users;
      } else {
        var reqconnection;
        var singleconnection = query(
          connectionsCollection,
          and(
            or(where("userId", "==", userId), where("targetId", "==", userId)),
            or(where("flag", "==", "Pending"), where("flag", "==", "Accept"))
          )
        );

        onSnapshot(singleconnection, async (res) => {
          var userconnection = [];
          reqconnection = res.docs.map((doc) => doc.data());
          for (var i = 0; i < reqconnection.length; i++) {
            var newData = reqconnection[i]["targetId"];
            userconnection.push(newData);
            console.log(userconnection);
            // return userconnection;
            usersSnapshot.forEach((doc) => {
              console.log(doc);
              const isIdPresent = users.some((user) => user.id === doc.id);
              if (!isIdPresent) {
                users.push({ id: doc.id, ...doc.data() });
              }
              //users.push({ id: doc.id, ...doc.data() });
            });

            console.log(users, "userlist");
            for (let i = 0; i < users.length; i++) {
              console.log(userconnection, "bcbxbchxbchxb");
              for (let j = 0; j < userconnection.length; j++) {
                if (users[i].id === userconnection[j]) {
                  users.splice(i, 1);
                  break;
                }
              }
            }
            console.log(users);
            setUsersList(users);
            //return users;
          }
        });
        //setUsersList(users);
        return users;
      }
      //return users;

      // singleconnection.forEach((doc) => {
      //   connection.push({ id: doc.id, ...doc.data() });
      // });
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async function addConnection(userId, targetId, flag) {
    try {
      if (flag == "Accept") {
        var userToConnect = doc(connectionsCollection, `${targetId}_${userId}`);
      } else {
        var userToConnect = doc(connectionsCollection, `${userId}_${targetId}`);
      }
      setDoc(userToConnect, { userId, targetId, flag });
    } catch (err) {
      console.log(err);
    }
  }

  async function getConnection(userId, setconnectionsList) {
    try {
      console.log(userId, "useiisdhi");

      var reqconnection;
      var recvconnection;
      var connection = [];
      var singleconnection = query(
        connectionsCollection,
        where("userId", "==", userId),
        where("flag", "==", "Pending")
      );

      onSnapshot(singleconnection, async (res) => {
        reqconnection = res.docs.map((doc) => doc.data());
        for (var i = 0; i < reqconnection.length; i++) {
          var newData = reqconnection[i];
          console.log(newData);
          const userDocRef = doc(usersCollection, reqconnection[i]["targetId"]);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            newData["name"] = userData;
          }
          connection.push({ reqconnection: reqconnection });

          console.log(connection);
          setconnectionsList(connection);
          // setconnectionsList(connection);
        }
      });

      //var reqconnection;
      var reqsingleconnection = query(
        connectionsCollection,
        where("targetId", "==", userId)
      );

      onSnapshot(reqsingleconnection, async (res) => {
        recvconnection = res.docs.map((doc) => doc.data());
        for (var i = 0; i < recvconnection.length; i++) {
          var newData = recvconnection[i];
          console.log(newData);
          const userDocRef = doc(usersCollection, recvconnection[i]["userId"]);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            newData["name"] = userData;
          }
          connection.push({ recvconnection: recvconnection });
          // connection.push(recvconnection);

          console.log(connection);
          setconnectionsList(connection);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function postStatus(obj) {
    addDoc(postsCollection, obj)
      .then((res) => {
        console.log("Document added");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getStatus(setAllStatus) {
    onSnapshot(postsCollection, (response) => {
      setAllStatus(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
      );
    });
  }
  async function likePost(userId, postId, liked) {
    try {
      let docToLike = doc(likesCollection, `${userId}_${postId}`);
      if (liked) {
        deleteDoc(docToLike);
      } else {
        setDoc(docToLike, { userId, postId });
        await addRecentActivity(userId, "like", postId);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getLikesByUser(userId, postId, setLikesCount, setLiked) {
    try {
      let likeQuery = query(likesCollection, where("postId", "==", postId));
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
  async function postComment(
    postId,
    comment,
    timeStamp,
    userName,
    useruid,
    userProfilePhoto
  ) {
    try {
      addDoc(commentsCollection, {
        postId,
        comment,
        timeStamp,
        userName,
        useruid,
        userProfilePhoto,
      });
      console.log(postId, "postId");
      await addRecentActivity(useruid, "comment", postId);
    } catch (err) {
      console.log(err);
    }
  }

  async function getComments(postId, setCommentList, setCommentCount) {
    try {
      console.log(postId, "post id");
      let comments;
      let singlePostQuery = query(
        commentsCollection,
        where("postId", "==", postId)
      );
      onSnapshot(singlePostQuery, async (res) => {
        comments = res.docs.map((doc) => doc.data());
        console.log(comments, "commentsCange1");
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
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePost(id, status, postImage) {
    let postToUpdate = doc(postsCollection, id);
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

  async function deletePost(id) {
    let postToDelete = doc(postsCollection, id);
    try {
      deleteDoc(postToDelete);
    } catch (err) {
      console.log(err);
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
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
          setPostImage(response);
        });
      }
    );
  }

  async function addRecentActivity(userId, activityType, postId = null) {
    try {
      const timestamp = Timestamp.now();
      await addDoc(recentActivityCollections, {
        userId,
        activityType,
        timestamp,
        postId,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getRecentActivity(userId) {
    try {
      const q = query(recentActivityCollections, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const recentActivities = [];
      for (const docSnapshot of querySnapshot.docs) {
        const activity = {
          activityType: docSnapshot.data().activityType,
          postId: docSnapshot.data().postId,
          timestamp: docSnapshot.data().timestamp.toDate(),
        };
        const postDocRef = doc(postsCollection, activity.postId);
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
        const userDocRef = doc(usersCollection, currentuser.uid);
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
        signUp,

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
        getRecentActivity,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
