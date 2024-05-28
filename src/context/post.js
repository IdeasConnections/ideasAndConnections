import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { postsCollection } from "../firebase";

export async function getPostStatus(setAllStatus) {
  onSnapshot(postsCollection, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
}

export async function updatePost(id, status, postImage) {
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

export async function deletePost(id) {
  let postToDelete = doc(postsCollection, id);
  try {
    deleteDoc(postToDelete);
  } catch (err) {
    console.log(err);
  }
}
export async function postStatus(obj) {
  addDoc(postsCollection, obj)
    .then((res) => {
      console.log("Document added");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function uploadPostImage(file, setPostImage, setProgress) {
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
