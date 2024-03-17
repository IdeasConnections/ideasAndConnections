import React, { useState, useEffect } from "react";
import "./PostCard.css";
import { Card, CardBody } from "react-bootstrap";
import LikeButton from "./likesButton/LikeButton";
import { useUserAuth } from "../../../../../context/UserAuthContext";
import defaultProfile from '../../../../../assets/profile.png'

export default function PostCard({ posts }) {
  const { user, getAllUsers } = useUserAuth();
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

  const filteredImages = usersList
    .filter((item) => item.uid === posts.userId)
    .map((item) => item.imageLink);

  console.log("post", posts);
  return (
    <Card className="posts-list">
      <CardBody>
        <div>
          <div className="post-img-wrapper">
           <img src={filteredImages[2] || defaultProfile } className="post-img"/>
            <p className="userName">{posts.userName}</p>
          </div>
          <p className="timestamp">{posts.timeStamp}</p>
          <p>{posts.status}</p>
          <LikeButton userId={user?.uid} postId={posts.id} />
        </div>
      </CardBody>
    </Card>
  );
}
