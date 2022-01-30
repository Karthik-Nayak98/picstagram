import { Route, Routes } from "react-router-dom";

import AuthContextProvider from "../context/authcontext";

import HomePage from "../pages/homepage";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Navbar from "./navbar/navbar.component";
import Profile from "../pages/profile";

function App() {
  return (
    <AuthContextProvider>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
