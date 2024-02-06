import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import './Home.css'

export default function HomePage() {
  const { darkMode } = useUserAuth();

  return (
    <div  className={` home ${darkMode ? 'dark-mode' : ''}`}>
     
    Home
      {/* Add other content here */}
    </div>
  );
}
