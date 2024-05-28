import React, { useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import { AiOutlineEdit, AiOutlinePicture } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useUserAuth } from "../../../../../context/UserContext";
import { getPostStatus } from "../../../../../context/post";
import { getUniqueID } from "../../../../helpers/getUniqueID";
import { getCurrentDateTimeStamp } from "../../../../helpers/useMoment";
import PostCard from "./PostCard";
import "./PostStatus.css";

export default function PostStatus() {
  const { user } = useUserAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [postImage, setPostImage] = useState("");
  const userName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.displayName;
  const sendStatus = async () => {
    let obj = {
      status: status,
      timeStamp: getCurrentDateTimeStamp("LLL"),
      userName: userName,
      postId: getUniqueID(),
      userId: user?.uid,
      postImage: postImage,
    };
    await postStatus(obj);
    setModalOpen(false);
    setStatus("");
    setIsEdit(false);
    toast.success("Post added successfully");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setCurrentPost(posts);
    setStatus(posts?.status);
    setPostImage(posts?.postImage);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
    toast.success("Post updated successfully.");
  };
  const sortedStatus = [...allStatus].sort(
    (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
  );
  useMemo(() => {
    getPostStatus(setAllStatus);
  }, [getPostStatus]);

  return (
    <>
      <Card className='post-status-main'>
        <Card.Body>
          <div className='post-status'>
            <button
              className='open-post-modal'
              onClick={() => {
                setModalOpen(true);
                setIsEdit(false);
              }}
            >
              Start Post
            </button>
          </div>
        </Card.Body>
        <div className='outer-container'>
          <AiOutlinePicture
            size={30}
            className='post-picture'
            onClick={() => {
              setModalOpen(true);
              setIsEdit(false);
            }}
          />
          {"Media"}
          <AiOutlineEdit
            size={30}
            className='post-picture'
            onClick={() => {
              setModalOpen(true);
              setIsEdit(false);
            }}
          />
          {"Write article"}
        </div>

        {/* <ModalPost
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
        /> */}
      </Card>

      {sortedStatus.map((posts, index) => (
        <PostCard key={index} posts={posts} getEditData={getEditData} />
      ))}

      <ToastContainer />
    </>
  );
}
