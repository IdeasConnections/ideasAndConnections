import React, {useState, useEffect} from 'react';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { Card } from 'react-bootstrap';
import './Profile.css';
import ProfileEdit from './ProfileEdit/ProfileEdit';

const Profile = () => {
  const { darkMode, user } = useUserAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    // Retrieve user details from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };


  return (
    <>
    { isEdit ? 
    (<ProfileEdit goBack={toggleEdit}/>)
     :
    ( <div className="profile-card-container d-flex flex-column justify-content-center align-items-center flex">
      <Card className={`profile ${darkMode ? 'dark-mode' : ''} mt-10`}>
        <Card.Body>
          <div className='edit-btn'>
            <button onClick={toggleEdit}>Edit</button>
          </div>
          <Card.Title>{userDetails?.displayName}</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>   
    </div>)
    }
    </>
  );
};

export default Profile;
