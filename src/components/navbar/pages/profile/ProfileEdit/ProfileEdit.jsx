import React, {useEffect, useState} from "react";
import './ProfileEdit.css'
import { Card, Button } from 'react-bootstrap';
import { useUserAuth } from "../../../../../context/UserAuthContext";
import FileUploadModal from "./FileUploadModal";
import { FaPencilAlt } from 'react-icons/fa';
import { toast, ToastContainer  } from 'react-toastify';
import defaultProfile from '../../../../../assets/profile.png'


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
        industry: user?.industry || ''
    })
    const [currentImage, setCurrentImage] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [progress, setProgress] = useState(0)

    const getInput = (event)=>{
        const {name, value} = event.target
        let input = { [name]: value}
        setEditInputs({...editInputs, ...input})
    }

    const updateProfileData = () =>{
       editProfile(user?.uid, editInputs)
       toast.success("Profile updated successfully");
    }

    const getImage = (event) =>{
        setCurrentImage(event.target.files[0])
    }
    const uploadImageTostorage = () =>{
        uploadImage(currentImage, user?.uid, setModalOpen, setProgress)
    }

    return(
        <div className="profileEdit-card-container d-flex flex-column justify-content-center align-items-center flex">
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="country">Country</label>
                        <input 
                            className="edit-input" 
                            type="text" 
                            id="country"
                            // placeholder="Last Name"
                            name="country"
                            onChange={getInput} 
                           value={editInputs.country}
                        />
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
              
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="industry">Industry</label>
                        <input 
                            className="edit-input" 
                            type="text" 
                            id="industry"
                            // placeholder="Last Name"
                            name="industry"
                            onChange={getInput} 
                           value={editInputs.industry}
                        />
                </div>
                </div>  
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ToastContainer />
                <Button
                    variant="primary"
                    style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', marginTop: '10px' }}
                    type="Submit"
                    onClick={updateProfileData}
                >
                    Save
                </Button>
            </div>
           
          </Card.Body>
        </Card>   
      </div>
    )

}
export default ProfileEdit