import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgodMJZ53j9eVSG40xvAU0MUOF9_1n48g",
  authDomain: "ideasandconnection-fb0ec.firebaseapp.com",
  projectId: "ideasandconnection-fb0ec",
  storageBucket: "ideasandconnection-fb0ec.appspot.com",
  messagingSenderId: "460079387463",
  appId: "1:460079387463:web:08d6065a43b5121c6d7262",
  measurementId: "G-XBSZRZ2441",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
export default function SignUp() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  function signUp(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const userEmail = String(document.getElementById("email").value);
    const userPassword = String(document.getElementById("pass").value);
    const confirmPassword = String(document.getElementById("Confirmpass").value);
    const DOB = String(document.getElementById("DOB").value);
    const profession = String(document.getElementById("profession").value);
    const country = String(document.getElementById("country").value);
    const phoneNumber = String(document.getElementById("phoneNumber").value); // Fixed: getting phone number value
    const firstName = String(document.getElementById("firstName").value);
    const lastName = String(document.getElementById("lastName").value);
  
    if (
      userEmail.length !== 0 &&
      userPassword === confirmPassword &&
      DOB &&
      phoneNumber &&
      firstName &&
      country &&
      profession
    ) {
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          const useinfo = {
            email: userEmail,
            DOB: DOB,
            profession: profession,
            country: country,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            numberVerified: false,
          };
  
          // Add user information to Firestore
          firebase.firestore().collection("users").doc(user.uid).set(useinfo)
            .then(() => {
              console.log("Document written with ID: ", user.uid);
              document.getElementById("error").innerHTML = "Account Created Successfully";
              // Redirect to login page after 2 seconds
              setTimeout(() => {
                window.location.href = "login.html"; // Replace with your login page URL
              }, 2000);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
              document.getElementById("error").innerHTML = "Error: " + error.message;
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error creating user: ", errorMessage);
          document.getElementById("error").innerHTML = "Error: " + errorMessage;
        });
    }
  }
  
  function taketohomepage() {
    navigate("/");
  }

  return (
    <section className="bg-lime-200 h-full">
      <div className="mx-auto w-full max-w-7xl bg-lime-200 py-2">
        <div className="mx-auto my-4 max-w-2xl md:my-6">
          {/* breadcrumb */}
          <div className="flex justify-center">
            {" "}
            <p className="text-black text-bold text-xl">
              Complete Your Profile{" "}
              <span className="text-maingreen">To Sign Up</span>
            </p>
          </div>
          {/* Form */}
          <div className="overflow-hidden rounded-xl bg-mainBoxes p-4 shadow">
            <div className="flex justify-center mt-2">
              <p id="error" className="m-2 text-xl text-violet-500"></p>
            </div>
            <div className="mb-4 flex items-center rounded-lg py-2"></div>
            <p className="text-xl font-bold text-Dred">Personal Info</p>
            <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
              <div className="w-full">
                <label
                  className="text-sm text-lime-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  style={{ backgroundColor: "rgb(59,59,59)" }}
                  className=" bg-inputbox flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your first name"
                  id="firstName"
                  required
                ></input>
              </div>

              <div className="w-full">
                <label
                  className=" text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  style={{ backgroundColor: "rgb(59,59,59)" }}
                  className=" bg-inputbox flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your last name"
                  id="lastName"
                ></input>
              </div>
              <div className="w-full">
                <label className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  DOB
                </label>
                <input
                  style={{ backgroundColor: "rgb(59,59,59)" }}
                  className=" bg-inputbox flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Enter your DOB"
                  id="DOB"
                ></input>
              </div>

              <div className="w-full">
                <label
                  className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastName"
                >
                  Profession
                </label>
                <input
                  style={{ backgroundColor: "rgb(59,59,59)" }}
                  className=" bg-inputbox  flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your Profession"
                  id="profession"
                ></input>
              </div>
              <div className="w-full">
                <label
                  className=" text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="firstName"
                >
                  Country
                </label>
                <input
                  style={{ backgroundColor: "rgb(59,59,59)" }}
                  className="bg-inputbox  flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your Country"
                  id="country"
                ></input>
              </div>

              <div className="w-full">
                <label
                  className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastName"
                >
                  Phone Number
                </label>

                <PhoneInput
                  placeholder="Enter phone number"
                  style={{ backgroundColor: "rgb(59,59,59)" }}
                  className="flex bg-inputbox  h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  value={value}
                  onChange={setValue}
                />
              </div>

              <div className="col-span-2 grid">
                <div className="w-full">
                  <label
                    className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    style={{ backgroundColor: "rgb(59,59,59)" }}
                    className=" bg-inputbox  flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                  ></input>
                </div>
              </div>
              <div className="w-full">
                <label
                  className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastName"
                >
                  Password
                </label>
                <input
                  style={{ backgroundColor: "rgb(59,59,59)" }}
                  className="bg-inputbox  flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your Password"
                  id="pass"
                ></input>
              </div>
              <div className="w-full">
                <label
                  className="text-lime-300 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastName"
                >
                  Confirm Password
                </label>
                <input
                  style={{ backgroundColor: "rgb(59,59,59)" }}
                  className=" bg-inputbox flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-inputboxwrite focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your Confirm Password"
                  id="Confirmpass"
                ></input>
              </div>
              <div className="col-span-1 grid">
                <button
                  type="button"
                  onClick={taketohomepage}
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Cancel
                </button>
              </div>
              <div className="col-span-1 grid">
                <button
                  type="button"
                  onClick={signUp}
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
