import React, { useEffect } from "react";

function ProgressBar({ setFile, url, uploadPercent }) {
  useEffect(() => {
    if (url) setFile(null);
  }, [url, setFile]);
  return (
    <div className='relative top-20 mx-auto w-10/12 bg-gray-200 h-2 rounded-full'>
      <div
        className='rounded-full bg-pink-400 h-2'
        style={{ width: uploadPercent + "%" }}></div>
    </div>
  );
}

export default ProgressBar;
