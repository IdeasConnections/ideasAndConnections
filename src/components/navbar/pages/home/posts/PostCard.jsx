import React, { useState, useEffect } from "react";
import "./PostCard.css";
import { Card, CardBody } from "react-bootstrap";
import LikeButton from "./likesButton/LikeButton";
import { useUserAuth } from "../../../../../context/UserAuthContext";
import defaultProfile from "../../../../../assets/profile.png";
import { BsPencil, BsTrash } from "react-icons/bs";
import { toast, ToastContainer  } from 'react-toastify';

export default function PostCard({ posts, getEditData }) {
  const { user, getAllUsers, deletePost } = useUserAuth();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsersList(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  const deletePosts = () =>{
    deletePost(posts.id)
    toast.success("Post deleted successfully");
  }

  console.log("uaerrrid", user?.uid);
  console.log("uerwhdeid", posts?.userId);

  const filteredImages = usersList
    .filter((item) => item.uid === posts.userId)
    .map((item) => item.imageLink);

  console.log("post", posts);
  return (
    <Card className="posts-list">
      <CardBody>
        <div>
          <div className="post-img-wrapper">
            {user?.uid === posts.userId ? (
              <div className="action-container">
                <BsPencil
                  size={20}
                  className="action-icon"
                  onClick={() => getEditData(posts)}
                />
                <BsTrash size={20} className="action-icon" onClick={()=>deletePosts()} />
              </div>
            ) : (
              <></>
            )}
            <img
              src={filteredImages[2] || defaultProfile}
              className="post-img"
            />
            <p className="userName">{posts.userName}</p>
          </div>
          <p className="timestamp">{posts.timeStamp}</p>
          <p>{posts.status}</p>
          <div className="posted-pic">
            <img src={posts.postImage}/>
          </div>
          <LikeButton userId={user?.uid} postId={posts.id} />
        </div>
      </CardBody>
    </Card>
  );
}
