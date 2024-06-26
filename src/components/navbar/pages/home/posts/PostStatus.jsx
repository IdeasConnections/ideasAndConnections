import React, { useState, useEffect, useMemo } from "react";
import "./PostStatus.css";
import { Card, CardBody, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import ModalPost from "./modal/ModalPost";
import { AiOutlinePicture, AiOutlineEdit } from "react-icons/ai";
import { useUserAuth } from "../../../../../context/UserAuthContext";
import PostCard from "./PostCard";
import { getCurrentDateTimeStamp } from "../../../../helpers/useMoment";
import { getUniqueID } from "../../../../helpers/getUniqueID";

export default function PostStatus() {
  const { postStatus, getStatus, user, updatePost, uploadPostImage } = useUserAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({})
  const [currentImage, setCurrentImage] = useState({})
  const [postImage, setPostImage] = useState('')
  const userName = (user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : user?.displayName;
  const sendStatus = async () => {
    let obj = {
      status: status,
      timeStamp: getCurrentDateTimeStamp("LLL"),
      userName: userName,
      postId: getUniqueID(),
      userId: user?.uid,
      postImage: postImage
    };
    await postStatus(obj);
    setModalOpen(false);
    setStatus("");
    setIsEdit(false)
    toast.success("Post added successfully");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setCurrentPost(posts)
    setStatus(posts?.status);
    setPostImage(posts?.postImage)
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage)
    setModalOpen(false)
    toast.success("Post updated successfully.");
  }
  const sortedStatus = [...allStatus].sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
  useMemo(() => {
    getStatus(setAllStatus);
  }, [getStatus]);

  return (
    <>
      <Card className="post-status-main">
        <Card.Body>
          <div className="post-status">
            <button
              className="open-post-modal"
              onClick={() => {
                setModalOpen(true);
                setIsEdit(false);
              }}
            >
              Start Post
            </button>
          </div>
        </Card.Body>
        <div className="outer-container">
          <AiOutlinePicture size={30} className="post-picture" onClick={() => {
            setModalOpen(true)
            setIsEdit(false)
          }} />{"Media"}
          <AiOutlineEdit size={30} className="post-picture" onClick={() => {
            setModalOpen(true)
            setIsEdit(false)
          }} />{"Write article"}
        </div>

        <ModalPost
          sendStatus={sendStatus}
          setStatus={setStatus}
          status={status}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isEdit={isEdit}
          updateStatus={updateStatus}
          uploadPostImage={uploadPostImage}
          setPostImage={setPostImage}
          postImage={postImage}
        />
      </Card>

      {sortedStatus.map((posts, index) => (
        <PostCard key={index} posts={posts} getEditData={getEditData} />
      ))}


      <ToastContainer />
    </>
  );
}
