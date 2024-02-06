import React from 'react'
import { useUserAuth } from '../../../../context/UserAuthContext'
import './Profile.css'

const Profile = () => {
  const { darkMode } = useUserAuth();
  return (
    <div  className={`profile ${darkMode ? 'dark-mode' : ''}`}>  
      Profile
    </div>
  )
}

export default Profile