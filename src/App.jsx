import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import ForgotPassword from "./components/ForgotPass";
import UserProfile from "./components/UserProfile";
import { Container, Row, Col } from "react-bootstrap";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <>
      <Container>
        <Row>
          <Col>
          <UserAuthContextProvider>
              <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/forgotPass" element={<ForgotPassword />} />
              <Route path="/editProfile"  element={<UserProfile />} />
            </Routes> 
            </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default App;
