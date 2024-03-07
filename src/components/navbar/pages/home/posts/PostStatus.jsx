import React, { useState, useEffect , useMemo} from "react";
import "./PostStatus.css";
import { Card, CardBody } from "react-bootstrap";
import { toast, ToastContainer  } from 'react-toastify';
import ModalPost from "./modal/ModalPost";
import { useUserAuth } from "../../../../../context/UserAuthContext";

export default function PostStatus() {
  const { postStatus, getStatus } = useUserAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([])
  const sendStatus = async () => {
    await postStatus(status);
    setModalOpen(false);
    setStatus("");
    toast.success('Post added successfully')
  };
useMemo (()=>{
  getStatus(setAllStatus)
})

  return (
    <>
      <Card className="post-status-main">
        <Card.Body>
          <div className="post-status">
            <button
              className="open-post-modal"
              onClick={() => setModalOpen(true)}
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
        />
      
      </Card>
      <Card className="post-list">
        <CardBody>
        {allStatus.map((posts)=>{
          return (
            <>
            <p>{posts.status}</p>
            </>
          )
        })}
        </CardBody>
      </Card>
      <ToastContainer/>
    </>
  );
}
