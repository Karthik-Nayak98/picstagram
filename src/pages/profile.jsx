import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useDoc from "../hooks/useDoc";

const initialState = {
  name: "",
  imageUrl: "",
  uid: "",
};
function Profile() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(initialState);

  useEffect(() => {
    if (location?.state) setUserInfo(location.state);
  }, [location]);

  const imagesData = useDoc("images-info", userInfo.uid);

  return (
    <div className='mt-12 flex flex-col' key={userInfo?.imageUrl}>
      <figure className='mx-auto my-10'>
        <img
          className='rounded-full w-20 h-20'
          src={userInfo?.imageUrl}
          alt={userInfo?.name}
        />
        <figcaption className='mx-auto text-pink-400 uppercase'>
          <p className='text-center font-medium text-sm'>{userInfo?.name}</p>
        </figcaption>
      </figure>
      <div
        className='mx-auto grid grid-cols-1 xs:grid-cols-2 xs:gap-2 md:grid-cols-3 lg:grid-cols-4 
      sm:gap-6 md:gap-8 w-4/5 sm:w-3/4 md:w-11/12'>
        {imagesData?.map(item => (
          <div className='mx-auto p-2 bg-slate-100 rounded-lg shadow-sm shadow-slate-100'>
            <figure className='w-64'>
              <img
                className='object-cover w-full h-64'
                src={item.imageUrl}
                alt={item.imageName}
              />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
