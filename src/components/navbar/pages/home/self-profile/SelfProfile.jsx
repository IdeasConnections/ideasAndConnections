import React, { useState, useEffect } from "react";
import "./SelfProfile.css";
import { Card } from "react-bootstrap";
import defaultProfile from "../../../../../assets/profile.png";
import { useUserAuth } from "../../../../../context/UserAuthContext";

export default function SelfProfile() {
  const { user, getRecentActivity } = useUserAuth();
  const userName = (user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : user?.displayName;
  const profileView = user?.profileCount?.length
  const [recentActivities, setRecentActivities] = useState([]);
  useEffect(() => {
    getRecentActivity(user.uid)
        .then((activities) => {
            setRecentActivities(activities);
        })
        .catch((error) => {
            console.log("Error fetching recent activities:", error);
        });
        console.log('recent activties', recentActivities)
}, [user.uid]);

function renderActivityMessage(activity) {
  switch (activity.activityType) {
    case "profile_details":
      return "You have updated your profile details";
    case "like":
      return `You liked ${activity.postUsername}'s a post`;
    case "comment":
      return `You commented on ${activity.postUsername}'s post`;
    default:
      return "";
  }
}


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
          <div className="recent-activity">
            <h2 className="rc-heading">Recent Activity</h2>
            <ul>
  {recentActivities.reduce((acc, activity) => {
    const dateString = new Date(activity.timestamp).toDateString();
    const existingDateIndex = acc.findIndex(
      (item) => item.dateString === dateString
    );

    if (existingDateIndex === -1) {
      acc.push({
        dateString,
        activities: [activity],
      });
    } else {
      acc[existingDateIndex].activities.push(activity);
    }

    return acc;
  }, []).map((item, index) => (
    <li key={item.dateString + "-" + index}>
      <h3 className="rc-date">{item.dateString}</h3>
      <ul>
        {item.activities.map((activity, index) => (
          <li className="rc-list" key={item.dateString + "-" + activity.activityType + "-" + index}>
            {renderActivityMessage(activity)}
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>


        </div>
        </Card.Body>
      </Card>
    </>
  );
}
