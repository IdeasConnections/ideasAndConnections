import React from "react";
import "./PostCard.css";
import { Card, CardBody } from "react-bootstrap";
import LikeButton from "./likesButton/LikeButton";
import { useUserAuth } from "../../../../../context/UserAuthContext";

export default function PostCard({ posts }) {
  
  const { user } = useUserAuth();
  console.log('post', posts)
  return (
    <Card className="posts-list">
      <CardBody>
        <div>
          <p className="userName">{posts.userName}</p>
          <p className="timestamp">{posts.timeStamp}</p>
          <p>{posts.status}</p>
          <LikeButton userId={user?.uid} postId={posts.id} />
        </div>
      </CardBody>
    </Card>
  );
}
