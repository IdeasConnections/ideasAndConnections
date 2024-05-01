import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import logo from '../../assets/logo.png';
import { isMobile, isTablet } from 'react-device-detect';
import { LiaToolsSolid } from "react-icons/lia";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, facebookSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      await facebookSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isMobile || isTablet) {
    return (
      <div className="background">
        <div className="p-4  signin-container">
        <div className="mb-2 flex justify-center">
                <img width="100" src={logo} />
              
          </div>
   
        <div className="mb-4 flex justify-center" style={{ display: 'flex' }}>
              <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#2cf851' }}>
                  Grab your gig regardless of your experience
              </span>
          </div>
          <div className="mb-1 flex justify-center" style={{ display: 'flex' }}>
              <span style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>
              <h1 style={{color:'white'}}>Please use a desktop for</h1>
              </span>
             
          </div>
          <div className="mb-4 flex justify-center" style={{ display: 'flex' }}>
              <span style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>
              <h1 style={{color:'white'}}> better experience</h1>
              </span>
             
          </div>
          <div className="mb-4 flex justify-center" style={{ display: 'flex' }}>
              <span style={{ fontSize: '12px', color: 'white', display:'flex' , gap: '5px'}}>
              <h1 style={{color:'white'}}>Mobile version is under contruction</h1>
              <LiaToolsSolid size={15} />
              </span>
             
          </div>
        
        </div>
      </div>
    );
  }

  return (
   <div className="background">
      <div className="p-4  signin-container">
      <div className="mb-2 flex justify-center">
                <img width="200" src={logo} />
          </div>
          <div className="mb-4 flex justify-center" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
              <span style={{ fontWeight: 'bold', fontSize: '40px', color: 'white' }}>
                  Grab your gig <span style={{ color: '#2cf851' }}>regardless of your experience</span>
              </span>
          </div>
          <div  className="mb-4 flex justify-center" style={{ display: 'flex', whiteSpace: 'nowrap' }} >
           <span style={{color:'white', display:'block', textAlign:'center'}} >
              Hop onto ideas, A place that welcomes people with almost zero experiences to find their first job. 
              <br/>
              It also helps people with similar experience to do wonderful tasks.
            </span>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-control"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-control"
            />
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' , color: 'white'}}>
              <div className="text-sm font-semibold text-300 hover:underline">
                  <Link to="/forgotPass">Forgot Password?</Link>
              </div>
          </div>
          <div className="d-grid grid-cols-2 mt-3">
          <div className="p-1 mt-2 text-center rounded-control" style={{color:'white', fontWeight: 'bold', fontSize: '1.5em'}}>
              <Link to="/signup" style={{ width: '100%' }}>Sign up</Link>
            </div>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                style={{ backgroundColor: 'white', width: '100%', color:'green', fontWeight: 'bold'}}
                type="Submit"
                className="rounded-control"
              >
                Sign in
              </Button>
            </div>    
          </div>
       </Form>
       <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' , color: 'white'}}>
       <div style={{ margin: 'auto', fontSize: '20px', fontWeight: 'bold', marginTop: '25px' }}>Join with:</div>

       <div className="d-grid gap-2 mt-3 mr-3">
       <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="relative inline-flex w-full items-center justify-center rounded-full border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
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
               
                </button>
        </div>
        <div className="d-grid gap-2 mt-3">
        <button
                  type="button"
                  onClick={handleFacebookSignIn}
                  className="relative inline-flex w-full items-center justify-center rounded-full border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
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
              
                </button>
        </div>
       </div>
       
      </div>
     
      </div>
  );
};

export default SignIn;