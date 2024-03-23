import React, { useState, useEffect, useMemo } from "react";
import "./PostStatus.css";
import { Card, CardBody } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import ModalPost from "./modal/ModalPost";
import { useUserAuth } from "../../../../../context/UserAuthContext";
import PostCard from "./PostCard";
import { getCurrentDateTimeStamp } from "../../../../helpers/useMoment";
import { getUniqueID } from "../../../../helpers/getUniqueID";

export default function PostStatus() {
  const { postStatus, getStatus, user, updatePost } = useUserAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({})
  const userName = `${user?.firstName} ${user?.lastName}` || user?.displayName;

  console.log("from post status", user);
  const sendStatus = async () => {
    let obj = {
      status: status,
      timeStamp: getCurrentDateTimeStamp("LLL"),
      userName: userName,
      postID: getUniqueID(),
      userId: user?.uid,
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
    setStatus( posts?.status);
    setIsEdit(true);
  };

  const updateStatus = () =>{
    console.log('postpost', currentPost)
    updatePost(currentPost.id, status)
    setModalOpen(false)
    toast.success("Post updated successfully.");
  }
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
        <ModalPost
          sendStatus={sendStatus}
          setStatus={setStatus}
          status={status}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isEdit={isEdit}
          updateStatus= {updateStatus}
        />
      </Card>
      <div>
        {allStatus.map((posts, index) => {
          return (
            <>
              <PostCard key={index} posts={posts} getEditData={getEditData} />
            </>
          );
        })}
      </div>

      <ToastContainer />
    </>
  );
}
