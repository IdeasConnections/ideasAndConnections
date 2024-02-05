import React, { useEffect, useState } from "react";
import { Home, ChevronRight, ShoppingCart } from "lucide-react";
import AcademicsHover from "./AcadamicsHover";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";



import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ProfileDetails from "./ProfileDetails";
import { NavBar } from "./NavBar";
const steps = ["Personal Information", "Payment Method", "Confirmation"];

export default function UserProfile() {
  const [userdata, setuserdata] = useState({});
  const [onInfo, setonInfo] = useState(true);
  useEffect(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // Access email and data from each document
        const email = doc.id; // Assuming email is the document ID
        const data = doc.data();
        console.log(data);
        setuserdata(data);
        console.log(`${email} => ${JSON.stringify(data)}`);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);
  const isLoggedin = localStorage.getItem("isLoggedin");
  const [value, setValue] = useState();
  const navigate = useNavigate();
  function taketohomepage() {
    navigate("/");
  }
  function signUp() {}
  return (
    <>
      <NavBar></NavBar>

      {!isLoggedin ? (
        navigate("/")
      ) : (
        <>
          {" "}
          <section className="bg-lime-200 h-screen">
            <div className="mx-auto w-full max-w-7xl bg-lime-200 py-2">
              <div className="mx-auto my-4 max-w-2xl md:my-6">
                {/* breadcrumb */}
                <div className="flex justify-center">
                  {" "}
                  <p className="text-black text-bold text-xl">Your Profile</p>
                </div>

                {/* Form */}
                <div className="overflow-hidden rounded-xl bg-mainBoxes p-4 shadow">
                  <div className="flex justify-center mt-2">
                    <p id="error" className="m-2 text-xl text-violet-500"></p>
                  </div>
                  <div className="mb-4 flex items-center rounded-lg py-2"></div>
                  <div className="flex justify-around">
                    <p
                      onClick={() => {
                        setonInfo(true);
                      }}
                      className="text-xl font-bold text-Dred hover:underline hover:cursor-pointer"
                    >
                      Personal Info
                    </p>
                    <p
                      onClick={() => {
                        setonInfo(false);
                      }}
                      className="text-xl font-bold text-Dred hover:underline hover:cursor-pointer"
                    >
                      User Profile
                    </p>
                  </div>

                  {!onInfo ? (
                    <ProfileDetails></ProfileDetails>
                  ) : (
                    <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
                      <div className="w-full">
                        <label
                          className="text-sm text-lime-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <p
                          style={{ backgroundColor: "rgb(59,59,59)" }}
                          className=" bg-inputbox flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Enter your first name"
                          id="firstName"
                          required
                        >
                          {userdata.firstName}
                        </p>
                      </div>

                      <div className="w-full">
                        <label
                          className=" text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <p
                          style={{ backgroundColor: "rgb(59,59,59)" }}
                          className=" bg-inputbox flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Enter your last name"
                          id="lastName"
                        >
                          {" "}
                          {userdata.lastName}
                        </p>
                      </div>
                      <div className="w-full">
                        <label className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          DOB
                        </label>
                        <p
                          style={{ backgroundColor: "rgb(59,59,59)" }}
                          className=" bg-inputbox flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="date"
                          placeholder="Enter your DOB"
                          id="DOB"
                        >
                          {" "}
                          {userdata.DOB}
                        </p>
                      </div>

                      <div className="w-full">
                        <label
                          className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="lastName"
                        >
                          Profession
                        </label>
                        <p
                          style={{ backgroundColor: "rgb(59,59,59)" }}
                          className=" bg-inputbox  flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Enter your Profession"
                          id="profession"
                        >
                          {userdata.profession}
                        </p>
                      </div>
                      <div className="w-full">
                        <label
                          className=" text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="firstName"
                        >
                          Country
                        </label>
                        <p
                          style={{ backgroundColor: "rgb(59,59,59)" }}
                          className="bg-inputbox  flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Enter your Country"
                          id="country"
                        >
                          {userdata.country}
                        </p>
                      </div>

                      <div className="w-full">
                        <label
                          className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="lastName"
                        >
                          Phone Number
                        </label>

                        <p
                          style={{ backgroundColor: "rgb(59,59,59)" }}
                          className="bg-inputbox  flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Enter your Country"
                          id="country"
                        >
                          {userdata.phoneNumber}
                        </p>
                      </div>

                      <div className="col-span-2 grid">
                        <div className="w-full">
                          <label
                            className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="email"
                          >
                            Email Address
                          </label>
                          <p
                            style={{ backgroundColor: "rgb(59,59,59)" }}
                            className=" bg-inputbox  flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                          >
                            {userdata.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
