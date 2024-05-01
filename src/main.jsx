import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { isMobile, isTablet } from 'react-device-detect';
import { TbAlertTriangle } from "react-icons/tb";


const renderApp = () => {
  if (isMobile || isTablet) {

    ReactDOM.createRoot(document.getElementById("root")).render(
      <div className="container">
        <div className="content">  
          <TbAlertTriangle size={30} style={{color: 'yellow'}} />
         <h1>Please use a desktop to view this site.</h1>
       {/* <h1> Mobile view is not available.Thanks!</h1> */}

        </div>
      
      </div>
      
    );
  } else {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
};

renderApp();