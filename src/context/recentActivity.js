import {
  Timestamp,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { postsCollection, recentActivityCollections } from "../firebase";

export async function addRecentActivity(userId, activityType, postId = null) {
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

export async function getRecentActivity(userId) {
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

    return recentActivities;
  } catch (err) {
    console.log(err);
    return [];
  }
}
