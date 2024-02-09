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
          <div>
            <img className='profile-img' src={user?.imageLink} alt='profile image'/>
             <div className='profile-info'>
            <div>
               <div style={{display:'flex', gap:'4px'}}>
                   <h3 className='user-name'>{userData.firstName}</h3>
                   <h3 className='user-name'>{userData.lastName}</h3>
                </div>
                   <p className='headline'>{userData.headline}</p>
                   <p className='location'>{userData.location}</p>
              </div>
              <div className='right-info'>
                   <p className=''>{userData.education}</p>
                   <p className=''>{userData.industry}</p>
              </div>        
          </div>
              
            
          </div>
         
              )}
        </Card.Body>
      </Card>   
    </div>)
    }
    </>
  );
};

export default Profile;
