import React from "react";

function Spinner() {
  return (
    <div className='flex items-center justify-center'>
      <div
        className='animate-spin relative inline-block w-9 h-9 border-4 border-gray-200 border-t-4 border-t-pink-400 rounded-full'
        role='status'></div>
    </div>
  );
}

export default Spinner;
