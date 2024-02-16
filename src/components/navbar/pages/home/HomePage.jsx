import React, { useState } from "react";
import { useUserAuth } from '../../../../context/UserAuthContext'
import './Home.css'
import { Card , Badge} from 'react-bootstrap';

export default function HomePage() {
  const { darkMode } = useUserAuth();

  return (
    <>
    <div className="home-card-container d-flex flex-column justify-content-center align-items-center flex">
      <Card className={`home ${darkMode ? 'dark-mode' : ''}`}>
        <Card.Body>
        <Card.Title>Home</Card.Title>
       
        </Card.Body>
      </Card>   
      <Card className={`home1 ${darkMode ? 'dark-mode' : ''}`}>
        <Card.Body>
        <Card.Title>Home</Card.Title>
       
        </Card.Body>
      </Card>   
      
      
   
    </div>

    </>
  );
}
