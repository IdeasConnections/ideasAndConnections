import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgotPassword from "./components/auth_pages/ForgotPass";
import ProtectedRoute from "./components/auth_pages/ProtectedRoute";
import SignIn from "./components/auth_pages/SignIn";
import SignUp from "./components/auth_pages/SignUp";
import NavBar from "./components/navbar/NavBar";
import Connections from "./components/navbar/pages/connections/Connections";
import HomePage from "./components/navbar/pages/home/HomePage";
import Profile from "./components/navbar/pages/profile/Profile";
import { UserAuthContextProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <NavBar />
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <NavBar />
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/connections'
            element={
              <ProtectedRoute>
                <NavBar />
                <Connections />
              </ProtectedRoute>
            }
          />
          <Route path='/' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/forgotPass' element={<ForgotPassword />} />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
