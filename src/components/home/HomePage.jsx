import React, { useState } from "react";
import { NavBar } from "../NavBar";
import UserProfile from "../UserProfile";

export default function HomePage() {
  const isprofileComplete = localStorage.getItem("profileComplete");
  const [profileComplete, setprofileComplete] = useState(false);
  if (isprofileComplete == true) {
    setprofileComplete(true);
  }
  return (
    <>
      {profileComplete ? (
        <UserProfile></UserProfile>
      ) : (
        <>
          <NavBar />
          <div className="flex flex-col items-center  lg:flex-row justify-around mt-4">
          </div>
        </>
      )}
    </>
  );
}
