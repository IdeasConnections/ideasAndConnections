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
           
              <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                      <NavBar />     
                    <HomePage />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                      <NavBar />     
                        <Profile /> 
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/forgotPass" element={<ForgotPassword />} />
            </Routes> 
            </UserAuthContextProvider>
   
    </>
  );
}

export default App;
