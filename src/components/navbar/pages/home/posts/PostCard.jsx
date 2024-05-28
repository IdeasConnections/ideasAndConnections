import React, { useEffect, useState } from "react";
import { Card, CardBody } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import defaultProfile from "../../../../../assets/profile.png";
import { useUserAuth } from "../../../../../context/UserContext";
import "./PostCard.css";
import LikeButton from "./likesButton/LikeButton";

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

  const deletePosts = () => {
    deletePost(posts.id);
    toast.success("Post deleted successfully");
  };

  const filteredImages = usersList
    .filter((item) => item.id === posts.userId)
    .map((item) => item.imageLink);
  return (
    <Card className='posts-list'>
      <CardBody>
        <div>
          <div className='post-img-wrapper'>
            {user?.uid === posts.userId ? (
              <div className='action-container'>
                <BsPencil
                  size={20}
                  className='action-icon'
                  onClick={() => getEditData(posts)}
                />
                <BsTrash
                  size={20}
                  className='action-icon'
                  onClick={() => deletePosts()}
                />
              </div>
            ) : (
              <></>
            )}
            <img
              src={filteredImages[0] || defaultProfile}
              className='post-img'
            />
            <p className='userName'>{posts.userName}</p>
          </div>
          <p className='timestamp'>{posts.timeStamp}</p>
          <p>{posts.status}</p>
          <div className='posted-pic'>
            <img className='posted-img' src={posts.postImage} />
          </div>
          <LikeButton userId={user?.uid} postId={posts.id} />
        </div>
      </CardBody>
    </Card>
  );
}
