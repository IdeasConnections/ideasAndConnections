import React, {useEffect, useState} from "react";
import './ProfileEdit.css'
import { Card, Button } from 'react-bootstrap';
import { useUserAuth } from "../../../../../context/UserAuthContext";

const ProfileEdit = ({goBack }) =>{
    const { darkMode, user, editProfile, uploadImage} = useUserAuth();
    const [editInputs, setEditInputs] = useState({})
    const [currentImage, setCurrentImage] = useState({})

    const getInput = (event)=>{
        const {name, value} = event.target
        let input = { [name]: value}
        setEditInputs({...editInputs, ...input})
    }

    const updateProfileData = () =>{
       editProfile(user?.uid, editInputs)
    }

    const getImage = (event) =>{
        setCurrentImage(event.target.files[0])
    }
    const uploadImageTostorage = () =>{
        uploadImage(currentImage, user?.uid)
    }

    return(
        <div className="profileEdit-card-container d-flex flex-column justify-content-center align-items-center flex">
        <Card className={`profileEdit ${darkMode ? 'dark-mode' : ''} `}>
          <Card.Body>
            <div className='edit-btn'>
              <button onClick={goBack}>Go Back</button>
            </div>
            <Card.Title>Profile Edit</Card.Title>
         
            <div className="profile-edit-input">

                <div>
                    <input type="file" onChange={getImage} />
                    <Button 
                    onClick={uploadImageTostorage}
                    style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}
                    >
                        Upload
                  </Button>
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
                        />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
                        <label htmlFor="location">Location</label>
                        <input 
                            className="edit-input" 
                            type="text" 
                            id="location"
                            // placeholder="Last Name"
                            name="location"
                            onChange={getInput} 
                           
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
                           
                        />
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
                           
                        />
                </div>
                </div>  
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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