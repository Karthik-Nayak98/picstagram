import { Route, Routes } from "react-router-dom";

import AuthContextProvider from "../context/authcontext";

import HomePage from "./home/homepage";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Navbar from "./navbar/navbar.component";
import EditProfile from "../pages/editprofile";

function App() {
  return (
    <AuthContextProvider>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
