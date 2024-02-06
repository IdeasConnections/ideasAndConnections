import React, { useState } from "react";
import './Navbar.css';
import { useUserAuth } from "../../context/UserAuthContext";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser, AiOutlinePoweroff,
  
} from 'react-icons/ai'
import { MdOutlineNotifications } from "react-icons/md";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()
    const { logOut } = useUserAuth();

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

    return (
        <nav>
           
            <img width={80} src={logo} />
  
            <div className="menu" onClick={() => { setMenuOpen(!menuOpen) }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? 'open' : ''}>
              
              
                <li className="icons">
                    <AiOutlineHome size={30} onClick={()=> goToRouter('/home')}/>
                </li>
                <li className="icons">
                    <MdOutlineNotifications size={30}/>
                </li>
                <li className="icons">
                    <AiOutlineUser size={30} onClick={()=> goToRouter('/profile')}/>
                </li>
               
                <li className="icons">
                    <AiOutlinePoweroff size={30} onClick={handleLogout}/>
                </li>
               
            </ul>
        </nav>
    );
}

export default Navbar;
