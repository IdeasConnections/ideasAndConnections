import {
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { likesCollection } from "../firebase";
import { addRecentActivity } from "./recentActivity";

export async function likePost(userId, postId, liked) {
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
export async function getLikesByUser(userId, postId, setLikesCount, setLiked) {
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
