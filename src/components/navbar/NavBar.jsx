import React, { useState } from "react";
import './Navbar.css';
import { useUserAuth } from "../../context/UserAuthContext";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser, AiOutlinePoweroff,
  
} from 'react-icons/ai'
import { FiUsers } from "react-icons/fi";
import { MdOutlineNotifications } from "react-icons/md";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { MdOutlineMessage } from "react-icons/md";
import { FaRegUser, FaMoon, FaSun } from "react-icons/fa";


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const navigate = useNavigate()
    const { logOut, darkMode, toggleDarkMode } = useUserAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    const goToRouter = (route) =>{
          navigate(route)
    }

    const handleSearch = () => {
        setShowSearch(!showSearch);
    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        // Here you can perform any search-related functionality
    }
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }


    return (
        <nav  className={`nav ${darkMode ? 'dark-mode' : ''}`} >   
            <div style={{display:'flex'}}>
            <img width={80} src={logo} />
            {showSearch && (
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        style={{
                            backgroundImage: `url(data:image/svg+xml;base64,${btoa(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#CCCCCC"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.97-5-5.97-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 3 2.56 5.5 5.34 5.97a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`
                            )})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'left center',
                            paddingLeft: '30px', // Adjust padding as needed
                        }}
                    />
                </div>
            )}
  
            </div>
            
            <div className="menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? 'open' : ''}>
            <li className="icon-with-text" onClick={()=> goToRouter('/home')}>
                    <AiOutlineHome size={30} />
                    <p>Home</p>     
            </li>
            <li className="icon-with-text">
                       <FiUsers size={30}/>  
                       <p>Connections</p>
                   
                </li>
                <li className="icon-with-text">
                       <PiSuitcaseSimpleLight size={30}/>  
                       <p>Jobs</p> 
                   
                </li>
                <li className="icon-with-text">   
                       <MdOutlineMessage size={30}/>  
                       <p>Messages</p>
                </li>
                <li className="icon-with-text">
                       <MdOutlineNotifications size={30}/>  
                       <p>Notifications</p>
                   
                </li>
                <li className="icon-with-text">
                       <FaRegUser size={30} onClick={()=> goToRouter('/profile')}/>  
                       <p>My Profile</p>
                   
                </li>
            
                <li className="icon-with-text">
                    <AiOutlinePoweroff size={30} onClick={handleLogout}/>
                    <p>Log out</p>
                </li>
                <li>
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                    {darkMode ? <FaSun size={30} color="#ffffff"/> : <FaMoon size={30}/>}
                   
                </button>
                <p>Mode</p>
                </li>
               
            </ul>
        </nav>
    );
}

export default Navbar;
