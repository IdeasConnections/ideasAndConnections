import React, { useState, useEffect } from "react";
import logo from '../assets/logo.PNG'
import { ArrowRight } from "lucide-react";
import HomePage from "./HomePage";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const provider = new FacebookAuthProvider();
const provider2 = new GoogleAuthProvider();
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgodMJZ53j9eVSG40xvAU0MUOF9_1n48g",
  authDomain: "ideasandconnection-fb0ec.firebaseapp.com",
  projectId: "ideasandconnection-fb0ec",
  storageBucket: "ideasandconnection-fb0ec.appspot.com",
  messagingSenderId: "460079387463",
  appId: "1:460079387463:web:08d6065a43b5121c6d7262",
  measurementId: "G-XBSZRZ2441",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default function ForgotPassword() {
  const navigate = useNavigate();

  function signIn() {
    navigate("/");
  }
  function forgotPassword() {
    const email = document.getElementById("emailId").value;
    if (email)
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          document.getElementById("error2").innerHTML =
            "Email Sent Successfully";
          // ..
          document.getElementById("nowlogin").className =
            "m-2 text-xl text-violet-500 ";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          document.getElementById("error2").innerHTML = "Error Occured";
          // ..
          // ..
        });
  }

  return (
    <>
      <section className="bg-lime-200 h-screen">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md bg-mainBoxes p-4 rounded-xl">
            <div className="mb-2 flex justify-center">
              <img width="80" src={logo} />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-Dred">
              Forgot <span className="text-maingreen">Password?</span>
            </h2>
            <p className="mt-2 text-center text-sm text-Written ">
              Don&apos;t have an account?{" "}
              <a
                href="/signUp"
                title=""
                className="font-semibold text-lime-100 transition-all duration-200 hover:underline"
              >
                Create a free account
              </a>
            </p>
            <div className="flex justify-center mt-2">
              <p id="error2" className="m-2 text-xl text-violet-500"></p>
            </div>
            <div className="flex justify-center mt-2">
              <p id="nowlogin" className="m-2 text-xl text-violet-500 hidden">
                <a
                  className=" hover:underline hover:cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login
                </a>
              </p>
            </div>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-lime-300"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      id="emailId"
                      style={{ backgroundColor: "rgb(59,59,59)" }}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                    ></input>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={forgotPassword}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Send Email
                    <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={signIn}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Cancel
                    <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
