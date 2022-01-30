import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <figure className='flex items-center px-2 py-2 md:px-5 gap-1'>
          <img src={logo} className='w-5 md:w-6' alt='Picstagram' />
          <h1 className='tracking-wider text-lg md:text-xl uppercase text-white font-mono'>
            Picstagram
          </h1>
        </figure>
      </Link>

      <ul className='px-2 md:px-4 text-white font-medium tracking-wide text-xs md:text-sm uppercase'>
        {user?.uid ? (
          <div className='flex items-center md:gap-2'>
            <img
              className='w-6 h-6 md:w-8 md:h-8 rounded-full'
              src={user?.imageUrl}
              alt={user?.name}
            />
            <Link
              to='/'
              onClick={handleSignOut}
              className='text-white font-medium tracking-wide uppercase
              p-1 md:p-2 rounded-sm hover:bg-pink-200 hover:text-gray-800'>
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
