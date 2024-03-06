import React, { useState } from "react";
import "./PostStatus.css";
import { Card } from "react-bootstrap";
import ModalPost from "./modal/ModalPost";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Card className="post-status-main">
        <Card.Body>
          <div className="post-status">
            <button className="open-post-modal" onClick={()=> setModalOpen(true)}>Start Post</button>
          </div>
        </Card.Body>
        <ModalPost modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      </Card>
    </>
  );
}
