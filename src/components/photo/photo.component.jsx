import React from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

function Photo({ id, imageUrl, displayName = "", photoURL = "" }) {
  return (
    <div
      key={id}
      className='shadow-lg w-full shadow-slate-300 rounded-lg sm:w-56 my-3'>
      <figure className='h-60'>
        <img
          className='p-1 object-cover h-60 mx-auto'
          src={imageUrl}
          alt={displayName}
        />
      </figure>
      <figcaption className='px-3 py-2 flex mt-2 justify-between'>
        <div className='flex gap-1'>
          <img
            className='rounded-full w-7 h-7'
            src={photoURL}
            alt={displayName}
          />
          <p>{displayName}</p>
        </div>
        <p className='flex items-center gap-1'>
          {/* <BsFillHeartFill
                    className='mt-1 text-red-500'
                    size='1.2rem'
                  />{" "} */}
          <BsHeart className='mt-1 text-red-500' size='1.2rem' />
          18
        </p>
      </figcaption>
    </div>
  );
}

export default Photo;
