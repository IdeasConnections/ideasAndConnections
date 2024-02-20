import React, {useState, useEffect} from 'react';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { Card , Badge} from 'react-bootstrap';
import './Profile.css';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import defaultProfile from '../../../../assets/profile.png'
import FileUploadModal from './ProfileEdit/FileUploadModal';
import { FaPencilAlt  } from 'react-icons/fa';

const Profile = () => {
  const { darkMode, user, uploadCoverPhoto } = useUserAuth();
  const [isEdit, setIsEdit] = useState(false)
  const [userData, setUserData] = useState(null);
  const [currentImage, setCurrentImage] = useState({})
  const [progress, setProgress] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    if (user) {
      setUserData(user); 
    }
    console.log('data fromprofile', user)
  }, [user]);

  const getImage = (event) =>{
    setCurrentImage(event.target.files[0])
}
const uploadImageTostorage = () =>{
  uploadCoverPhoto(currentImage, user?.uid, setModalOpen, setProgress)
}


  return (
    <>
    { isEdit ? 
    (<ProfileEdit goBack={toggleEdit}/>)
     :
    ( <div className="profile-card-container d-flex flex-column justify-content-center align-items-center flex">
       <FileUploadModal progress={progress} currentImage= {currentImage} modalOpen={modalOpen} setModalOpen={setModalOpen} getImage={getImage} uploadImageTostorage={uploadImageTostorage}/>  
      <Card className={`profile ${darkMode ? 'dark-mode' : ''}`}>
        <Card.Body>
        <div className="cover-photo-container">
            <img className='cover-photo' src={user?.coverPhotoLink || defaultProfile} alt='cover photo'/>
            <div style={{ position: 'absolute', top: '80%', right: '0%', transform: 'translate(-50%, -50%)' }}> {/* Position pencil icon */}
                <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '5px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)'  }}>
                    <FaPencilAlt className='pencil-icon' style={{ color: 'black', fontSize: '24px', cursor: 'pointer' }} onClick={() => setModalOpen(true)} />
                </div>
            </div>
            </div>
          <div className='edit-btn'>
            <button onClick={toggleEdit}>Edit Profile</button>
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
                   {/* <p className='education'>{userData.education}</p> */}
                   <p className='company'>{userData.company}</p>
              </div>        
          </div>
              <hr style={{marginTop: '10px', marginBottom:'10px'}}/>
            <div>
              <p className='card-title'>About</p>
              <p className='description-data'>{userData.about}</p>
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
          {userData && userData.educations && (
      <div>
         <p className='card-title'>Education</p>
      {userData.educations.map((education, index) => (
        <div key={index}>
          <div>
            <p className='education'>{education.school}</p>           
          </div> 
          <div style={{display: 'flex' , gap:'4px'}}>  
            {education.degree && <p className='edu-info'>{`${education.degree}`}</p>}
            {education.degree && education.fieldOfStudy && <p className='edu-info'>, </p>}
            {education.fieldOfStudy && <p className='edu-info'>{`${education.fieldOfStudy}`}</p>}
          </div> 
          <div>
          {education.startDate && education.endDate && <p className='year-act'>{`${education.startDate} - ${education.endDate}  `}</p>}
           
          </div>
          <div>
            <p className='year-act'>{`${education.activities} `}</p>
          </div>
          <div style={{marginTop:'10px'}}>
            <p className='description-data'>{`${education.description} `}</p>
          </div>
          {index !== userData.educations.length - 1 && <hr style={{marginTop: '10px', marginBottom:'10px'}} />} 
        </div>
      ))}
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
                   <p className='card-title'>Skills</p>
                   <div>
                   {userData.skills && userData.skills.map((skill, index) => (
                  <Badge key={index} pill variant="primary" className="mr-1 bg-success">
                    {skill}
                  </Badge>
                ))}
              </div>      
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
