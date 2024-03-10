import React, { useState } from "react";
import "./Home.css";
import { Card } from "react-bootstrap";
import PostStatus from "./posts/PostStatus";

export default function HomePage() {
  return (
    <>
      <Card className={`home `}>
        <Card.Body>
          <PostStatus />
        </Card.Body>
      </Card>
    </>
  );
}
