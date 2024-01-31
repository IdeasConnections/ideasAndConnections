import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Alert,
  Button,
  FormControl,
} from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext.jsx";
import logo from '../assets/logo.png'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUp(email, password);
      // You can store additional user details in your application state or local storage here if needed
      // (not directly linked to Firebase Authentication)
      // e.g., localStorage.setItem("firstName", firstName)
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <div className="mb-2 flex justify-center">
          <img width="80" src={logo} />
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Information</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="tel"
                placeholder="Phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Login Credentials</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </Form.Group>
          <div className="d-grid gap-2">
          <Button
              variant="primary"
              color="black" /* Or any suitable dark color */
              style={{ backgroundColor: '#4cbb17' }}
              type="Submit">
              Sign up
          </Button>

          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
