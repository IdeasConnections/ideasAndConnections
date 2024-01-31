"use client";

import React from "react";
import logo from '../assets/logo.PNG'
import { Menu, X } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCgodMJZ53j9eVSG40xvAU0MUOF9_1n48g",
  authDomain: "ideasandconnection-fb0ec.firebaseapp.com",
  projectId: "ideasandconnection-fb0ec",
  storageBucket: "ideasandconnection-fb0ec.appspot.com",
  messagingSenderId: "460079387463",
  appId: "1:460079387463:web:08d6065a43b5121c6d7262",
  measurementId: "G-XBSZRZ2441"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "My Network",
    href: "#",
  },
  {
    name: "Jobs",
    href: "#",
  },
  {
    name: "Messaging",
    href: "#",
  },
  {
    name: "Notification",
    href: "#",
  },
  {
    name: "My Profile",
    href: "/editProfile",
  },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully.");
        history.push("/signin"); // Redirect to the sign-in page
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };
  
  // Inside your component
  const history = useHistory();
  return (
    <div className="relative w-full bg-lime-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img width="80" src={logo} />
          </span>
          <span className="font-bold text-black">
            Ideas & <span className="text-teal-600">Connections</span>
          </span>

          <input
            className="hidden lg:flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search"
          />
          <button
            type="button"
            className="hidden lg:flex rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Search
          </button>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a>
               
              </li>
              
            ))}
             <button onClick={handleLogout}>Sign Out</button>
          </ul>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                  <input
                    class="flex mt-4 h-10 w-full rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Serach"
                  />
                  <button
                    type="button"
                    className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
