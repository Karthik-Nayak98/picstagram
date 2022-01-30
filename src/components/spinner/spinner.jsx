import React from "react";

function Spinner() {
  return (
    <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div
        className='animate-spin inline-block w-9 h-9 border-4 border-gray-200 border-t-4 border-t-pink-400 rounded-full'
        role='status'></div>
    </div>
  );
}

export default Spinner;
