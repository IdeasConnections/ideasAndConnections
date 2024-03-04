import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useUserAuth } from "../../context/UserAuthContext";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { MdOutlineNotifications } from "react-icons/md";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { MdOutlineMessage } from "react-icons/md";
import { FaRegUser, FaMoon, FaSun } from "react-icons/fa";
import SearchUsers from "./pages/searchUsers/SearchUsers";
import defaultProfile from "../../assets/profile.png";

const Navbar = () => {
  const { logOut, darkMode, toggleDarkMode, getAllUsers } = useUserAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsersList(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [getAllUsers]);

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = usersList.filter((user) => {
        return Object.values(user)
          .join("")
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase());
      });
      setfilteredUsers(searched);
    } else {
      setfilteredUsers(usersList);
    }
  };

  useEffect(() => {
    let debounce = setTimeout(() => {
      handleSearch();
    }, 800);

    return () => clearTimeout(debounce);
  }, [searchInput]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const goToRouter = (route) => {
    navigate(route);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`nav ${darkMode ? "dark-mode" : ""}`}>
      <div style={{ display: "flex" }}>
        <img width={80} src={logo} />
        <SearchUsers setSearchInput={setSearchInput} />
      </div>

      <div className="menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li className="icon-with-text" onClick={() => goToRouter("/home")}>
          <AiOutlineHome size={20} />
          <p>Home</p>
        </li>
        <li className="icon-with-text">
          <FiUsers size={20} onClick={() => goToRouter("/connections")} />
          <p>Connections</p>
        </li>
        <li className="icon-with-text">
          <PiSuitcaseSimpleLight size={20} />
          <p>Jobs</p>
        </li>
        <li className="icon-with-text">
          <MdOutlineMessage size={20} />
          <p>Messages</p>
        </li>
        <li className="icon-with-text">
          <MdOutlineNotifications size={20} />
          <p>Notifications</p>
        </li>
        <li className="icon-with-text" onClick={() => goToRouter("/profile")}>
          <FaRegUser size={20} />
          <p>My Profile</p>
        </li>

        <li className="icon-with-text" onClick={handleLogout}>
          <AiOutlinePoweroff size={20} />
          <p>Log out</p>
        </li>
        <li>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? (
              <FaSun size={20} color="#ffffff" />
            ) : (
              <FaMoon size={20} />
            )}
          </button>
          <p>Mode</p>
        </li>
      </ul>
      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Data</div>
          ):
         ( filteredUsers.map((users) => (
            <div className="search-inner">
              <img src={users.imageLink || defaultProfile} />
              {users.firstName && users.lastName ? (
                <>
                  {users.firstName} {users.lastName}
                </>
              ) : (
                <>{users.displayName}</>
              )}
            </div>
          )))
          }
       
        </div>
      )}
    </nav>
  );
};

export default Navbar;
