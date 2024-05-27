import React, { useState } from "react";
import { Alert, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useUserAuth } from "../../context/UserAuthContext.jsx";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { forgotPassword } = useUserAuth();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await forgotPassword(email); // Passing email here
      setSuccess("Please check you mail");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='background'>
      <div className='p-4 signin-container'>
        <div className='mb-5 flex justify-center'>
          <img width='200' src={logo} alt='Logo' />
        </div>
        <div
          className='mb-4 flex justify-center'
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          <span
            style={{ fontWeight: "bold", fontSize: "40px", color: "white" }}
          >
            Grab your gig{" "}
            <span style={{ color: "#2cf851" }}>
              regardless of your experience
            </span>
          </span>
        </div>
        <div
          className='mb-4 flex justify-center'
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          <span
            style={{ color: "white", display: "block", textAlign: "center" }}
          >
            Hop onto ideas, A place that welcomes people with almost zero
            experiences to find their first job.
            <br />
            It also helps people with similar experience to do wonderful tasks.
          </span>
        </div>
        {error && <Alert variant='danger'>{error}</Alert>}
        {success && <Alert variant='success'>{success}</Alert>}
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label style={{ color: "white" }}>Forgot password?</Form.Label>
            <div className='d-flex gap-2'>
              <FormControl
                type='email'
                placeholder='Email address'
                onChange={(e) => setEmail(e.target.value)}
                className='rounded-control '
              />
            </div>
          </Form.Group>
          <div className='d-grid grid-cols-2 mt-3 '>
            <div className='d-grid gap-2 mr-3'>
              <Button
                onClick={handleForgotPassword}
                variant='primary'
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  color: "green",
                  fontWeight: "bold",
                }}
                type='submit'
                className='rounded-control'
              >
                Send Email
              </Button>
            </div>
            <div
              className='p-1 mt-2 text-center rounded-control'
              style={{ color: "white", fontWeight: "bold", fontSize: "1.5em" }}
            >
              <Link to='/' style={{ width: "100%" }}>
                Cancel
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
