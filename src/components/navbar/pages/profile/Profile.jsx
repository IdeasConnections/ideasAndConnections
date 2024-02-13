import React, {useState, useEffect} from 'react';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { Card } from 'react-bootstrap';
import './Profile.css';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import defaultProfile from '../../../../assets/profile.png'

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
            <img className='profile-img' src={user?.imageLink || defaultProfile} alt='profile image'/>
             <div className='profile-info'>
            <div>
               <div style={{display:'flex', gap:'4px'}}>
                   <h3 className='user-name'>{userData.firstName}</h3>
                   <h3 className='user-name'>{userData.lastName}</h3>
                </div>
                   <p className='headline'>{userData.headline}</p>
                   <div style={{display: 'flex', gap:'4px'}}>
                    <p className='location'>{`${userData.location},  `}</p>
                    <p className='location'>{userData.country}</p>
                   </div>
                 
              </div>
              <div className='right-info'>
                   <p className='education'>{userData.education}</p>
                   <p className='company'>{userData.company}</p>
              </div>        
          </div>
              <hr style={{marginTop: '10px', marginBottom:'10px'}}/>
            <div>
              <p className='card-title'>About</p>
              <p className='about-data'>{userData.about}</p>
            </div>
          </div>
         
              )}
        </Card.Body>
      </Card>   
      <Card className={`profile1 ${darkMode ? 'dark-mode' : ''}`}>
        <Card.Body>
          <div className='edit-btn'>
            <button onClick={toggleEdit}>Edit</button>
          </div>
          {userData && ( // Render user data only if it's available
          <div>
              <div>
                   <p className='card-title'>Education</p>
                   <p className='education'>{userData.education}</p>           
              </div>            
          </div>
         
              )}
        </Card.Body>
      </Card>   
      <Card className={`profile1 ${darkMode ? 'dark-mode' : ''}`}>
        <Card.Body>
          <div className='edit-btn'>
            <button onClick={toggleEdit}>Edit</button>
          </div>
          {userData && ( // Render user data only if it's available
          <div>
              <div>
                   <p className='card-title'>Experiance</p>
                   <p className='education'>{userData.company}</p>           
              </div>            
          </div>
         
              )}
        </Card.Body>
      </Card>   
      <Card className={`profile1 ${darkMode ? 'dark-mode' : ''}`}>
        <Card.Body>
          <div className='edit-btn'>
            <button onClick={toggleEdit}>Edit</button>
          </div>
          {userData && ( // Render user data only if it's available
          <div>
              <div>
                   <p className='card-title'>Experiance</p>
                   <p className='education'>{userData.company}</p>           
              </div>            
          </div>
         
              )}
        </Card.Body>
      </Card>   
      <Card className={`profile1 ${darkMode ? 'dark-mode' : ''}`}>
        <Card.Body>
          <div className='edit-btn'>
            <button onClick={toggleEdit}>Edit</button>
          </div>
          {userData && ( // Render user data only if it's available
          <div>
              <div>
                   <p className='card-title'>Experiance</p>
                   <p className='education'>{userData.company}</p>           
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
