import { onAuthStateChanged } from "firebase/auth";
import {
  and,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  connectionsCollection,
  storage,
  usersCollection,
} from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    // Function to toggle dark mode
    setDarkMode((prevMode) => !prevMode);
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

  async function getAllUsers(userId = null, setUsersList) {
    try {
      const usersSnapshot = await getDocs(usersCollection);
      //var singleconnection = await query(connectionsCollection, where("userId", "==", userId), where("flag", "==", "Pending"))
      const users = [];

      if (userId == null || userId == "") {
        usersSnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
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
            // return userconnection;
            usersSnapshot.forEach((doc) => {
              const isIdPresent = users.some((user) => user.id === doc.id);
              if (!isIdPresent) {
                users.push({ id: doc.id, ...doc.data() });
              }
              //users.push({ id: doc.id, ...doc.data() });
            });

            for (let i = 0; i < users.length; i++) {
              for (let j = 0; j < userconnection.length; j++) {
                if (users[i].id === userconnection[j]) {
                  users.splice(i, 1);
                  break;
                }
              }
            }

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
        darkMode,
        toggleDarkMode,
        uploadImage,
        getAllUsers,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
