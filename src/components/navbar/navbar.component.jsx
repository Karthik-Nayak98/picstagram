import React, { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/camera.png";
import { AuthContext } from "../../context/authcontext";
import { userSignOut } from "../../firebase/firebase-auth";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    userSignOut();
    setUser({});
    navigate("/");
  };

  return (
    <nav className='fixed top-0 w-full flex justify-between items-center bg-pink-500 h-12'>
      <Link to='/'>
        <figure className='flex items-center py-2 px-5 gap-1'>
          <img src={logo} className='w-6' alt='Picstagram' />
          <h1 className='tracking-wider text-xl uppercase text-white font-mono'>
            Picstagram
          </h1>
        </figure>
      </Link>

      <ul className='px-4 text-white font-medium tracking-wide text-sm uppercase'>
        {user?.uid ? (
          <div className='flex items-center gap-2'>
            <img
              className='w-8 h-8 rounded-full'
              src={user?.imageUrl}
              alt={user?.name}
            />
            <Link
              to=''
              onClick={handleSignOut}
              className='text-white font-medium tracking-wide text-sm uppercase
              px-2 py-2 rounded-sm hover:bg-pink-200 hover:text-gray-800'>
              Sign Out
            </Link>
          </div>
        ) : (
          <Link
            className='uppercase px-3 py-2 rounded-sm hover:bg-pink-200 hover:text-gray-800'
            to='/signin'>
            Sign In
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
