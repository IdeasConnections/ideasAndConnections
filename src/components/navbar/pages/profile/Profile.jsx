import React, {useState, useEffect} from 'react';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { Card } from 'react-bootstrap';
import './Profile.css';
import ProfileEdit from './ProfileEdit/ProfileEdit';

const Profile = () => {
  const { darkMode, user } = useUserAuth();
  const [isEdit, setIsEdit] = useState(false)
  const [userData, setUserData] = useState(null);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    if (user) {
      setUserData(user); 
    }
    console.log('data fromprofile', user)
  }, [user]);

  return (
    <>
    { isEdit ? 
    (<ProfileEdit goBack={toggleEdit}/>)
     :
    ( <div className="profile-card-container d-flex flex-column justify-content-center align-items-center flex">
      <Card className={`profile ${darkMode ? 'dark-mode' : ''}`}>
        <Card.Body>
          <div className='edit-btn'>
            <button onClick={toggleEdit}>Edit</button>
          </div>
          {userData && ( // Render user data only if it's available
                <>
                  <Card.Title>{userData.email}</Card.Title>
                  <Card.Title>{userData.firstName}</Card.Title>
                  <Card.Title>{userData.lastName}</Card.Title>
                  <Card.Title>{userData.headline}</Card.Title>
                </>
              )}
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>   
    </div>)
    }
    </>
  );
};

export default Profile;
