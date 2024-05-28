import { addDoc, onSnapshot, query, where } from "firebase/firestore";
import { commentsCollection } from "../firebase";
import { addRecentActivity } from "./recentActivity";

export async function postComment(
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

    await addRecentActivity(useruid, "comment", postId);
  } catch (err) {
    console.log(err);
  }
}

export async function getComments(postId, setCommentList, setCommentCount) {
  try {
    let comments;
    let singlePostQuery = query(
      commentsCollection,
      where("postId", "==", postId)
    );
    onSnapshot(singlePostQuery, async (res) => {
      comments = res.docs.map((doc) => doc.data());
      setCommentList(comments);
      setCommentCount(comments.length); // Set the comment count
    });
  } catch (err) {
    console.log(err);
  }
}
