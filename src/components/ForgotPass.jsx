import React, { useState } from "react";
import { Form, Alert, Button, FormControl } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { forgotPassword } = useUserAuth();
  let navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("")
    console.log("Email:", email); 
    try {
      await forgotPassword(email); // Passing email here
      setSuccess("Please check you mail")
    } catch (err) {
      setError(err.message);
    }
  };

  const signIn = () => {
    navigate('/');
  };

  return (
    <div className="background">
      <div className="p-4 box signin-container">
        <div className="mb-2 flex justify-center">
          <img width="80" src={logo} alt="Logo" />
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Forgot password?</Form.Label>
            <div className="d-flex gap-2">
              <FormControl
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              onClick={handleForgotPassword}
              variant="primary"
              style={{ backgroundColor: '#4cbb17' }}
              type="submit"
            >
              Send Email
            </Button>
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button
              onClick={signIn}
              variant="primary"
              style={{ backgroundColor: 'white', color: 'black' }}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
      </div>
  );
};

export default ForgotPassword;
