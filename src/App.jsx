import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/auth_pages/ProtectedRoute";
import SignUp from "./components/auth_pages/SignUp";
import SignIn from "./components/auth_pages/SignIn";
import HomePage from "./components/home/HomePage";
import ForgotPassword from "./components/auth_pages/ForgotPass";
import UserProfile from "./components/UserProfile";
import { Container, Row, Col } from "react-bootstrap";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <>   
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
   
    </>
  );
}

export default App;
