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
import peopleImg from '../assets/people.png'
import {countries} from '../assets/countries.js'
import { Container, Row, Col } from "react-bootstrap";


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
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const fullPhoneNumber = `+${countryCode} ${phoneNumber}`;
      await signUp(email, password, firstName, lastName, fullPhoneNumber, country);
      setVerificationMessage("Please check your email for verification.");
    
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <>
     <Container fluid className="p-0">
        <Row className="m-0 align-items-center">
          <Col xs={12} md={6} className="p-0">
            <div className="img-people" style={{ height: "100vh", overflow: "hidden" }}>
              <img src={peopleImg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </Col>
        <Col xs={12} md={5} className="offset-md-1" > 
        <div className="mb-5 flex justify-center">
            <span style={{ fontWeight: 'bold', fontSize: '24px' }}>
              Grab your gig <span style={{ color: 'green' }}> regardless of your experience</span>
            </span>
        </div>

      <div className="p-4 box">
        <div className="mb-2 flex justify-center">
          <img width="80" src={logo} />
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {verificationMessage && <Alert variant="info">{verificationMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                value={firstName}
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control
                value={lastName}
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
      <Form.Label>Contact Information</Form.Label>
      <div className="d-flex gap-2">
        <Form.Select
          value={country}
          placeholder = "Country"
          onChange={(e) => setCountry(e.target.value)}
          style={{ flex: '1' }} // Country dropdown takes half of the space
        >
          <option value="" disabled hidden>Select country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </Form.Select>
        <Row className="align-items-center">
          <Col xs={3} > {/* Code dropdown takes little space */}
          <Form.Select
              value={countryCode} // Set the value to countryCode
              onChange={(e) => setCountryCode(e.target.value)}
              style={{ width: '100px' }}
            >
              {countries.map((country) => (
                <option key={country.id} value={country.code}>
                  {country.code}
                </option>
              
              ))}
              
            </Form.Select>
          </Col>
          <Col> {/* Phone number input takes remaining space */}
            <Form.Control
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Col>
        </Row>
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
        </Col>
      </Row>
    </Container>

    </>
  );
};

export default SignUp;
