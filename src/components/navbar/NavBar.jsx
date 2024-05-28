import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlinePoweroff } from "react-icons/ai";
import { FaMoon, FaRegUser, FaSun } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdOutlineMessage, MdOutlineNotifications } from "react-icons/md";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import defaultProfile from "../../assets/profile.png";
import { useUserAuth } from "../../context/UserContext";

import { editProfile } from "../../context/profile";

import "./Navbar.css";
import SearchUsers from "./pages/searchUsers/SearchUsers";

const Navbar = () => {
  const { darkMode, user, toggleDarkMode, getAllUsers } = useUserAuth();
  const [editInputs, setEditInputs] = useState({
    profileCount: user?.profileCount || [],
  });
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
        return user?.displayName
          ?.toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase());
      });
      console.log("filtered user", searchInput);
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

  // const openUser = () =>{
  //   navigate(`/profile`)
  // }

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleResultClick = (users) => {
    if (user?.uid !== users.id) {
      const updatedInputs = user?.uid;
      const profileIds = {
        ...editInputs,
        profileCount: editInputs.profileCount.includes(updatedInputs)
          ? [...editInputs.profileCount]
          : [...editInputs.profileCount, updatedInputs],
      };
      editProfile(users?.id, profileIds);
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

      <div className='menu' onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li className='icon-with-text' onClick={() => goToRouter("/home")}>
          <AiOutlineHome size={20} />
          <p>Home</p>
        </li>
        <li
          className='icon-with-text'
          onClick={() => goToRouter("/connections")}
        >
          <FiUsers size={20} />
          <p>Connections</p>
        </li>
        <li className='icon-with-text'>
          <PiSuitcaseSimpleLight size={20} />
          <p>Jobs</p>
        </li>
        <li className='icon-with-text'>
          <MdOutlineMessage size={20} />
          <p>Messages</p>
        </li>
        <li className='icon-with-text'>
          <MdOutlineNotifications size={20} />
          <p>Notifications</p>
        </li>
        <li className='icon-with-text' onClick={() => goToRouter("/profile")}>
          <FaRegUser size={20} />
          <p>My Profile</p>
        </li>

        <li className='icon-with-text' onClick={handleLogout}>
          <AiOutlinePoweroff size={20} />
          <p>Log out</p>
        </li>
        <li>
          <button className='dark-mode-toggle' onClick={toggleDarkMode}>
            {darkMode ? (
              <FaSun size={20} color='#ffffff' />
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
        <div className='search-results'>
          {filteredUsers.length === 0 ? (
            <div className='search-inner'>No Data</div>
          ) : (
            filteredUsers.map((users, index) => (
              <div
                className='search-inner'
                key={index}
                onClick={() => handleResultClick(users)}
              >
                <img
                  src={users.imageLink || defaultProfile}
                  alt='User Profile'
                />
                {users.firstName && users.lastName ? (
                  <>
                    {users.firstName} {users.lastName}
                  </>
                ) : (
                  <>{users.displayName}</>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
