import React, { useState } from "react";
import "./SelfProfile.css";
import { Card } from "react-bootstrap";
import defaultProfile from "../../../../../assets/profile.png";
import { useUserAuth } from "../../../../../context/UserAuthContext";

export default function SelfProfile() {
  const { user } = useUserAuth();
  const userName = (user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : user?.displayName;
  const profileView = user?.profileCount?.length
  return (
    <>
      <Card className="self-profile">
        <Card.Body>
          <div className="cover-photo-container-p">
            <img
              className="cover-photo-p"
              src={user?.coverPhotoLink || defaultProfile}
              alt="cover photo"
            />
          </div>
          <img className='profile-img-p' src={user?.imageLink || defaultProfile} alt='profile image'/>
          <div className="user-info-div">
                   <h3 className='user-name-p'>{userName}</h3>
                   <p className='headline-p'>{user?.headline}</p>         
         </div>
         <hr/>
        <div className="view-count-main">
        
          <p>Profile Viewers</p>
          <h1 className="view-count">{profileView}</h1>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
