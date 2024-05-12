import React, { useState } from "react";
import "./Home.css";
import { Card, Row, Col } from "react-bootstrap";
import PostStatus from "./posts/PostStatus";
import SelfProfile from "./self-profile/SelfProfile";
import News from "./news-section/News";

export default function HomePage() {
  return (
    <>
      <Card className="home">
        <Card.Body>
          <Row>
          <Col>
              <SelfProfile />
            </Col>
            <Col>
              <PostStatus />
            </Col>
            { <Col>
              <News />
            </Col> }
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
