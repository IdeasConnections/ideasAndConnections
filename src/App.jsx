import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/auth_pages/ProtectedRoute";
import SignUp from "./components/auth_pages/SignUp";
import SignIn from "./components/auth_pages/SignIn";
import HomePage from "./components/home/HomePage";
import ForgotPassword from "./components/auth_pages/ForgotPass";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Profile from "./components/navbar/pages/profile/Profile";
import NavBar from './components/navbar/NavBar'

function App() {
  return (
    <>   
          <UserAuthContextProvider>
            <div className="nav">
            <NavBar />
            </div>
           
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
              <Route path="/profile" element={<Profile />} />
            </Routes> 
            </UserAuthContextProvider>
   
    </>
  );
}

export default App;
