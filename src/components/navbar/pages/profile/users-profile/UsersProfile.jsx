import React, {useState} from 'react';
import defaultProfile from '../../../../../assets/profile.png'
import { Card} from 'react-bootstrap';
import '../../profile/Profile.css'

const UsersProfile = ({ user,onClose  }) => {
    const [isOpen, setIsOpen] = useState(true); 

    if (!user || !isOpen) return null; // 
    console.log('new user', user)
  return (
   <>
   <div className="profile-card-container d-flex flex-column justify-content-center align-items-center flex">
  
      <Card className={`profile`}>
    
        <Card.Body>
     
        <div className="cover-photo-container">
            <img className='cover-photo' src={user?.coverPhotoLink || defaultProfile} alt='cover photo'/>
           
            </div>
         
          {user && ( 
          <div>
            <img className='profile-img' src={user?.imageLink || defaultProfile} alt='profile image'/>
             <div className='profile-info'>
            <div>
               <div style={{display:'flex', gap:'4px'}}>
                   <h3 className='user-name'>{user.firstName}</h3>
                   {/* <h3 className='user-name'>{user.lastName}</h3> */}
                </div>
                   <p className='headline'>{user.headline}</p>
                   <div style={{display: 'flex', gap:'4px'}}>
                    <p className='location'>{`${user.location},  `}</p>
                    <p className='location'>{user.country}</p>
                   </div>
                 
              </div>
              <div className='right-info'>
                   {/* <p className='education'>{user.education}</p> */}
                   <p className='company'>{user.company}</p>
              </div>        
          </div>
              <hr style={{marginTop: '10px', marginBottom:'10px'}}/>
            <div>
              <p className='card-title'>About</p>
              <p className='description-data'>{user.about}</p>
            </div>
          </div>
         
              )}
               <button onClick={() => { setIsOpen(false); onClose(); }}>CLOSE</button>
        </Card.Body>
      </Card>   
      <Card className={`profile1`}>
        <Card.Body>
         
          {user && user.educations && (
      <div>
         <p className='card-title'>Education</p>
      {user.educations.map((education, index) => (
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
          {education.startDate && education.leaveDate && <p className='year-act'>{`${education.startDate} - ${education.endDate}  `}</p>}
           
          </div>
          <div>
            <p className='year-act'>{`${education.activities} `}</p>
          </div>
          <div style={{marginTop:'10px'}}>
            <p className='description-data'>{`${education.description} `}</p>
          </div>
          {index !== user.educations.length - 1 && <hr style={{marginTop: '10px', marginBottom:'10px'}} />} 
        </div>
      ))}
      </div>
    )}
        </Card.Body>
      </Card>   
      <Card className={`profile1}`}>
        <Card.Body>
        
          {user && user.companies && (
      <div>
         <p className='card-title'>Company</p>
      {user.companies.map((company, index) => (
        <div key={index}>
          <div>
            <p className='education'>{company.companyName}</p>           
          </div> 
          <div style={{display: 'flex' , gap:'4px'}}>  
            {company.designation && <p className='edu-info'>{`${company.designation}`}</p>}
            {company.designation && company.country && <p className='edu-info'>, </p>}
            {company.country && <p className='edu-info'>{`${company.country}`}</p>}
          </div> 
          <div>
          {company.joinDate && company.leaveDate && <p className='year-act'>{`${company.joinDate} - ${company.leaveDate}  `}</p>}
           
          </div>
          <div style={{marginTop:'10px'}}>
            <p className='description-data'>{`${company.description} `}</p>
          </div>
          {index !== user.companies.length - 1 && <hr style={{marginTop: '10px', marginBottom:'10px'}} />} 
        </div>
      ))}
      </div>
    )}
        </Card.Body>
      </Card>   
      <Card className={`profile1}`}>
        <Card.Body>
         
          {user && ( // Render user data only if it's available
          <div>
              <div>
                   <p className='card-title'>Skills</p>
                   <div>
                   {user.skills && user.skills.map((skill, index) => (
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
      {/* <Card className={`profile1}`}>
        <Card.Body>
        
          {user && ( // Render user data only if it's available
          <div>
              <div>
                   <p className='card-title'>Experiance</p>
                   <p className='education'>{user.company}</p>           
              </div>            
          </div>
         
              )}
        </Card.Body>
      </Card>    */}
    </div></>
  );
};

export default UsersProfile;
