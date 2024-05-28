import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "../../assets/countries.js";
import logo from "../../assets/logo.png";
import { signUp } from "../../context/userAuth.js";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const fullPhoneNumber = `+${countryCode} ${phoneNumber}`;
      await signUp(
        email,
        password,
        firstName,
        lastName,
        fullPhoneNumber,
        country
      );
      setVerificationMessage("Please check your email for verification.");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
        setError(err.message); // Display other error messages
      }
    }
  };

  return (
    <div className='background'>
      <div className='p-4 signup-container '>
        <div className='mb-2 flex justify-center'>
          <img width='200' src={logo} />
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

        <div className='p-4 '>
          {error && <Alert variant='danger'>{error}</Alert>}
          {verificationMessage && (
            <Alert variant='info'>{verificationMessage}</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              {/* <Form.Label>Name</Form.Label> */}
              <div className='d-flex gap-2'>
                <Form.Control
                  value={firstName}
                  type='text'
                  placeholder='First Name'
                  onChange={(e) => setFirstName(e.target.value)}
                  className='rounded-control'
                />
                <Form.Control
                  value={lastName}
                  type='text'
                  placeholder='Last Name'
                  onChange={(e) => setLastName(e.target.value)}
                  className='rounded-control'
                />
              </div>
            </Form.Group>
            <Form.Group className='mb-3'>
              {/* <Form.Label>Contact Information</Form.Label> */}
              <div className='d-flex gap-2'>
                <Form.Select
                  value={country}
                  placeholder='Country'
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ flex: "1" }} // Country dropdown takes half of the space
                  className='rounded-control'
                >
                  <option value='' disabled hidden>
                    Select country
                  </option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Form.Select>
                <Row className='align-items-center'>
                  <Col xs={3}>
                    {" "}
                    {/* Code dropdown takes little space */}
                    <Form.Select
                      value={countryCode} // Set the value to countryCode
                      placeholder='+91'
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{ width: "80px" }}
                      className='rounded-control'
                    >
                      <option value='' disabled hidden>
                        +91
                      </option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                    {" "}
                    {/* Phone number input takes remaining space */}
                    <Form.Control
                      type='tel'
                      placeholder='Phone number'
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className='rounded-control'
                    />
                  </Col>
                </Row>
              </div>
            </Form.Group>
            <Form.Group className='mb-3'>
              {/* <Form.Label>Login Credentials</Form.Label> */}
              <div className='d-flex gap-2'>
                <Form.Control
                  type='email'
                  placeholder='Email address'
                  onChange={(e) => setEmail(e.target.value)}
                  className='rounded-control'
                />
                <Form.Control
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  className='rounded-control'
                />
              </div>
            </Form.Group>
            <div className='d-grid gap-2'>
              <Button
                variant='primary'
                color='black' /* Or any suitable dark color */
                style={{ backgroundColor: "#4cbb17" }}
                className='rounded-control'
                type='Submit'
              >
                Sign up
              </Button>
            </div>
          </Form>
        </div>
        <div
          className='p-4  mt-3 text-center rounded-control'
          style={{ color: "white", fontWeight: "bold" }}
        >
          Already have an account?{" "}
          <Link to='/' style={{ fontSize: "20px" }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
