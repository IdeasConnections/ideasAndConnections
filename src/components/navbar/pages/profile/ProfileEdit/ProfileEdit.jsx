import React, {useEffect, useState} from "react";
import './ProfileEdit.css'
import { Card, Button , Badge} from 'react-bootstrap';
import { useUserAuth } from "../../../../../context/UserAuthContext";
import FileUploadModal from "./FileUploadModal";
import { FaPencilAlt, FaTimes  } from 'react-icons/fa';
import { toast, ToastContainer  } from 'react-toastify';
import defaultProfile from '../../../../../assets/profile.png'
import { countries } from "../../../../../assets/countries";


const ProfileEdit = ({goBack }) =>{
    const { darkMode, user, editProfile, uploadImage} = useUserAuth();
    const [editInputs, setEditInputs] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        headline: user?.headline || '',
        position: user?.position || '',
        education: user?.education || '',
        country: user?.country || '',
        postalCode: user?.postalCode || '',
        location: user?.location || '',
        company: user?.company || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        about: user?.about || '',
        skills: user?.skills || []
    })
    const [currentImage, setCurrentImage] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [progress, setProgress] = useState(0)
    const [newSkill, setNewSkill] = useState("");

    const getInput = (event) => {
        const { name, value } = event.target;
        if (name === "skills") {
          setNewSkill(value);
        } else {
          setEditInputs({ ...editInputs, [name]: value });
        }
      };
    
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          if (newSkill.trim() !== "") {
            setEditInputs({
              ...editInputs,
              skills: [...editInputs.skills, newSkill.trim()],
            });
            setNewSkill("");
          }
        }
      };
    
      const handleRemoveSkill = (index) => {
        const updatedSkills = [...editInputs.skills];
        updatedSkills.splice(index, 1);
        setEditInputs({ ...editInputs, skills: updatedSkills });
      };

    const updateProfileData = () =>{
       editProfile(user?.uid, editInputs)
       toast.success("Profile updated successfully");
       setTimeout(goBack, 1000)
       
    }

    const getImage = (event) =>{
        setCurrentImage(event.target.files[0])
    }
    const uploadImageTostorage = () =>{
        uploadImage(currentImage, user?.uid, setModalOpen, setProgress)
    }

    return(
        <div className="profileEdit-card-container d-flex flex-column justify-content-center align-items-center flex " >
        <FileUploadModal progress={progress} currentImage= {currentImage} modalOpen={modalOpen} setModalOpen={setModalOpen} getImage={getImage} uploadImageTostorage={uploadImageTostorage}/>  
        <Card className={`profileEdit ${darkMode ? 'dark-mode' : ''} `}>
          <Card.Body>  
          <div className='edit-btn'>
              <button onClick={goBack}>Go Back</button>
            </div>        
            <Card.Title> Edit Profile</Card.Title>   
            <div className="profile-edit-input">
            <div style={{ position: 'relative' }}>
                    <img className='profile-img'  src={user?.imageLink || defaultProfile} alt='profile image' onClick={() => setModalOpen(true)} />
                    <div style={{ position: 'absolute', top: '192px', left: '200px' }}>
                        <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '5px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
                            <FaPencilAlt className='pencil-icon' style={{ color: 'black', fontSize: '24px', cursor: 'pointer' }}  onClick={() => setModalOpen(true)}/>
                        </div>
                    </div>
                </div>
                        
            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        className="edit-input" 
                        type="text" 
                        id="firstName"
                        // placeholder="First Name"
                        name="firstName"
                        onChange={getInput} 
                        value={editInputs.firstName}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            className="edit-input" 
                            type="text" 
                            id="lastName"
                            // placeholder="Last Name"
                            name="lastName"
                            onChange={getInput} 
                            value={editInputs.lastName}
                        />
                </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="headline">Headline</label>
                        <textarea
                            className="textarea-input"
                            id="headline"
                            name="headline"
                            onChange={getInput} 
                            rows={3}
                            value={editInputs.headline}
                        />
                </div>
                <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                    <label htmlFor="email">Email</label>
                    <input 
                        className="edit-input" 
                        type="email" 
                        id="email"
                        // placeholder="First Name"
                        name="email"
                        onChange={getInput} 
                        value={editInputs.email}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input 
                            className="edit-input" 
                            type="text" 
                            id="phoneNumber"
                            // placeholder="Last Name"
                            name="phoneNumber"
                            onChange={getInput} 
                            value={editInputs.phoneNumber}
                        />
                </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                            <label htmlFor="country">Country</label>
                            <select
                                className="edit-input"
                                id="country"
                                name="country"
                                onChange={getInput}
                                value={editInputs.country}
                            >
                                <option value="" disabled hidden>Select country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                <div style={{display:'flex', gap: '20px'}}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '40%' }}>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input 
                        className="edit-input" 
                        type="text" 
                        id="postalCode"
                        // placeholder="First Name"
                        name="postalCode"
                        onChange={getInput} 
                        value={editInputs.postalCode}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="location">Location Within that area</label>
                        <input 
                            className="edit-input" 
                            type="text" 
                            id="location"
                            // placeholder="Last Name"
                            name="location"
                            onChange={getInput} 
                           value={editInputs.location}
                        />
                </div>
                
                </div>
                </div>  
          
          </Card.Body>
        </Card>  
        <Card className={`profileEdit1 ${darkMode ? 'dark-mode' : ''} `}>
          <Card.Body>          
            <Card.Title>Edit About</Card.Title>   
            <div className="profile-edit-input">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="about">About</label>
                        <textarea
                            className="textarea-input"
                            id="about"
                            name="about"
                            onChange={getInput} 
                            rows={3}
                            value={editInputs.about}
                        />
                </div>
                </div>  
           
          </Card.Body>
        </Card>        
        <Card className={`profileEdit1 ${darkMode ? 'dark-mode' : ''} `}>
          <Card.Body>          
            <Card.Title> Edit Education</Card.Title>   
            <div className="profile-edit-input">
               
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="education">Education</label>
                        <input 
                            className="edit-input" 
                            type="text" 
                            id="education"
                            // placeholder="Last Name"
                            name="education"
                            onChange={getInput} 
                            value={editInputs.education}
                        />
                </div>
             
                </div>  
          
          </Card.Body>
        </Card>   
        <Card className={`profileEdit1 ${darkMode ? 'dark-mode' : ''} `}>
          <Card.Body>          
            <Card.Title>Edit Experiance</Card.Title>   
            <div className="profile-edit-input">
             
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="company">Company</label>
                        <input 
                            className="edit-input" 
                            type="text" 
                            id="company"
                            // placeholder="Last Name"
                            name="company"
                            onChange={getInput} 
                           value={editInputs.company}
                        />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="currentPosition">Current Position</label>
                        <input 
                            className="edit-input" 
                            type="text" 
                            id="position"
                            // placeholder="Last Name"
                            name="position"
                            onChange={getInput} 
                            value={editInputs.position}
                        />
                </div>
                </div>  
         
           
          </Card.Body>
        </Card>  
        <Card className={`profileEdit1 ${darkMode ? 'dark-mode' : ''} `}>
          <Card.Body>          
            <Card.Title>Edit Skills</Card.Title>   
            <div className="profile-edit-input">
            <div>
              <label htmlFor="skills">Skills</label>
              <div>
                {editInputs.skills.map((skill, index) => (
                  <Badge key={index} pill variant="primary" className="mr-1 mb-2" onClick={() => handleRemoveSkill(index)}>
                    <div style={{display:'flex'}}>
                    {skill}
                    <FaTimes className="ml-1" onClick={() => handleRemoveSkill(index)} style={{ cursor: 'pointer' }} />
                    </div>
                   
                  </Badge>
                ))}
              </div>
              <input
                className="edit-input"
                type="text"
                id="skills"
                name="skills"
                onChange={getInput}
                onKeyDown={handleKeyDown}
                value={newSkill}
                placeholder="Enter new skill and press Enter"
              />
            </div>
                </div>  
           
          </Card.Body>
        </Card>       
        <ToastContainer/>
        
                <Button
                    variant="primary"
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      fontWeight: 'bold',
                      marginTop: '10px',
                      display: 'flex', // Add display: flex
                      justifyContent: 'center', // Add justifyContent: center
                      alignItems: 'center', // Add alignItems: center
                    }}
                    type="Submit"
                    onClick={updateProfileData}
                    className="sticky-save-button"
                >
                    Save
                </Button>
                       
      </div>
    )

}
export default ProfileEdit