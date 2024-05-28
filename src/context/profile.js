import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { usersCollection } from "../firebase";
import { addRecentActivity } from "./recentActivity";

export async function editProfile(userID, payload) {
  let userToEdit = doc(usersCollection, userID);
  await updateDoc(userToEdit, payload)
    .then(() => {
      console.log("profile updated");
      setUser((prevUser) => ({ ...prevUser, ...payload }));
    })
    .catch((err) => console.log(err));
  await addRecentActivity(userID, "profile_details", null);
}
export async function uploadCoverPhoto(file, id, setModalOpen, setProgress) {
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
