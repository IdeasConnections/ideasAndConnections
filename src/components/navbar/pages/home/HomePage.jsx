import React, { useState } from "react";
import "./Home.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import PostStatus from "./posts/PostStatus";
import SelfProfile from "./self-profile/SelfProfile";
import News from "./news-section/News";

export default function HomePage() {
  return (
    <>
      <Container fluid className="home">

        <Row >
          <Col lg={2} xs={3}>
            <SelfProfile />
          </Col>
          <Col lg={7} xs={6}>
            <PostStatus />
          </Col>
          <Col lg={2} xs={3}>
            <News />
          </Col>
        </Row>

      </Container>
    </>
  );
}
