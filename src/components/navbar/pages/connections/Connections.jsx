import React, {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap';
import './Connections.css'
import {useUserAuth} from '../../../../context/UserAuthContext'
import { toast, ToastContainer  } from 'react-toastify';

 const Connections = () => {
  const {getAllUsers, addConnection, user} = useUserAuth();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsersList(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    console.log('conn', user?.uid)
    fetchUsers();
  }, [getAllUsers]);

  const getCurrentUser = (id) => {
    // Ensure user is available before calling addConnection
    if (user) {
      addConnection(user.uid, id);
      toast.success("Connection added");
      console.log(user.id);
      console.log(id);
    } else {
      console.error("User not available");
    }
  };

  return (
    <>
     <div className="connections-card-container d-flex flex-column justify-content-center align-items-center flex " >
      <Card className={`connections`}>
        <Card.Body>
        <ul>
        {usersList
        .filter(users=> users.id !== user?.uid )
        .map(users => (
          <li key={users.id} className='connection-item'>
            <div className='connection-name' >
             {users.firstName && users.lastName ? (
              <>{users.firstName} {users.lastName}</>
             ):(
              <>
              {users.displayName}
              </>   
             )} 
             <p>{users.headline}</p>
            </div>
            <button className='connect-button' onClick={()=>{getCurrentUser(users.id)}}>Connect</button>
          </li>
        ))}
      </ul>

      
          
        </Card.Body>
      </Card> 
        
      </div>
      <ToastContainer/>
    </>
  )
}

export default Connections