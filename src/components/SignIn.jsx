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
  measurementId: "G-XBSZRZ2441"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default function SignIn() {
  const isLoggedin = localStorage.getItem("isLoggedin");
  const [login, setlogin] = useState(isLoggedin);
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    console.log("hi");
    signInWithPopup(auth, provider2)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("email", user.email);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        localStorage.setItem("isLoggedin", true);
        setlogin(true);
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          // The user already has an account with a different credential.
          // You can handle this case by showing an error message or redirecting to a page.
          document.getElementById("error1").innerHTML =
            "User Already Exist: Sign in with a different method";
          // You may want to provide an option for the user to link their accounts.
          // For example:
          // showLinkAccountsOption();
        } else {
          // Handle other errors
          document.getElementById("error1").innerHTML =
            "Error signing in with Google";
          console.error(error);
        }
      });
  };
  function signInWithFacebook() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        console.log(result.user);
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        localStorage.setItem("isLoggedin", true);
        setlogin(true);
        localStorage.setItem("email", user.email);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        document.getElementById("error1").innerHTML =
          "User Already Exist: Sign in with diffrent method";
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }
  function signIn() {
    const userEmail = String(document.getElementById("emailId").value);
    const userPassword = String(document.getElementById("password").value);
    if (userEmail && userPassword) {
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          document.getElementById("error1").innerHTML = "User Exist";
          localStorage.setItem("isLoggedin", true);

          setlogin(true);
          const user = userCredential.user;
          console.log(user);
          localStorage.setItem("email", user.email);

          // ...
        })
        .catch((err) => {
          document.getElementById("error1").innerHTML = "User Does Not Exist";
          setTimeout(() => {
            document.getElementById("error1").innerHTML = "";
          }, 3000);
          console.log(err.code);
          console.log(err.message);
        });
    }
  }
  function forgotPassword() {
    navigate("/forgotPass");
  }
  return (
    <>
      {" "}
      {login ? (
        <HomePage></HomePage>
      ) : (
        <section className="bg-lime-200 h-full">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md bg-mainBoxes p-4 rounded-xl">
              <div className="mb-2 flex justify-center">
                <img width="80" src={logo} />
              </div>
              <h2 className="text-center text-2xl font-bold leading-tight text-Dred">
                Sign in to your <span className="text-maingreen">account</span>
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
                <p id="error1" className="m-2 text-xl text-violet-500"></p>
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
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-lime-300"
                      >
                        {" "}
                        Password{" "}
                      </label>
                      <a
                        href="#"
                        onClick={forgotPassword}
                        title=""
                        className="text-sm font-semibold text-lime-300 hover:underline"
                      >
                        {" "}
                        Forgot password?{" "}
                      </a>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        style={{ backgroundColor: "rgb(59,59,59)" }}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={signIn}
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Get started <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-3 space-y-3">
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </span>
                  Sign in with Google
                </button>
                <button
                  type="button"
                  onClick={signInWithFacebook}
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-[#2563EB]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                    </svg>
                  </span>
                  Sign in with Facebook
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
