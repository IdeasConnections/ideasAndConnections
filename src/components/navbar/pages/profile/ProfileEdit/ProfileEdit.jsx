import React, {useState} from "react";
import './ProfileEdit.css'
import { Card, Button } from 'react-bootstrap';
import { useUserAuth } from "../../../../../context/UserAuthContext";

const ProfileEdit = ({goBack }) =>{
    const { darkMode } = useUserAuth();
    const [editInputs, setEditInputs] = useState({})

    const getInput = (event)=>{
        const {name, value} = event.target
        let input = { [name]: value}
        setEditInputs({...editInputs, ...input})
    }
    console.log(editInputs)

    return(
        <div className="profileEdit-card-container d-flex flex-column justify-content-center align-items-center flex">
        <Card className={`profileEdit ${darkMode ? 'dark-mode' : ''} mt-10`}>
          <Card.Body>
            <div className='edit-btn'>
              <button onClick={goBack}>Go Back</button>
            </div>
            <Card.Title>Profile Edit</Card.Title>
            <Card.Text>
            <div className="profile-edit-input">
            <input 
                className="edit-input" type="text" 
                placeholder="First Name"
                name="firstName"
                onChange={getInput} 
                />
            <input 
                className="edit-input" 
                type="text" 
                placeholder="Last Name"
                name="lastName"
                onChange={getInput} 
                />
            <input 
                className="edit-input" 
                type="textArea" 
                placeholder="Headline"
                name="headline"
                onChange={getInput} 
                />
            <input 
                className="edit-input" 
                type="textArea" 
                placeholder="Company"
                name="company"
                onChange={getInput} 
                />
            </div>  
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="primary"
                    style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', marginTop: '10px' }}
                    type="Submit"
                >
                    Save
                </Button>
            </div>
            </Card.Text>
          </Card.Body>
        </Card>   
      </div>
    )

}
export default ProfileEdit