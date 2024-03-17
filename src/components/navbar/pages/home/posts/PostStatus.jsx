import React, { useState, useEffect , useMemo} from "react";
import "./PostStatus.css";
import { Card, CardBody } from "react-bootstrap";
import { toast, ToastContainer  } from 'react-toastify';
import ModalPost from "./modal/ModalPost";
import { useUserAuth } from "../../../../../context/UserAuthContext";
import PostCard from "./PostCard";
import { getCurrentDateTimeStamp } from "../../../../helpers/useMoment";
import { getUniqueID } from "../../../../helpers/getUniqueID";

export default function PostStatus() {
  const { postStatus, getStatus, user } = useUserAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([])
  const userName = `${user?.firstName} ${user?.lastName}` || user?.displayName 

  console.log('from post status', user)
  const sendStatus = async () => { 
    let obj = {
      status: status,
      timeStamp: getCurrentDateTimeStamp('LLL'),
      userName: userName,
      postID: getUniqueID(),
      userId: user?.uid
    }
    await postStatus(obj);
    setModalOpen(false);
    setStatus("");
    toast.success('Post added successfully')
  };
useMemo (()=>{
  getStatus(setAllStatus)
}, [getStatus])

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
      <div>
      {allStatus.map((posts, index)=>{
          return (
            <>
              <PostCard key = {index}
              posts = {posts}/>
            </>
          )
        })}
  
      </div>
        
      <ToastContainer/>
    </>
  );
}
