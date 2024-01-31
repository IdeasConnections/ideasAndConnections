import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import ForgotPassword from "./components/ForgotPass";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn></SignIn>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route
          path="/forgotPass"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route
          path="/editProfile"
          element={<UserProfile></UserProfile>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
