import React from "react";

const InputContainer = ({ children, ...props }) => {
  return (
    <div className='mb-2 flex justify-center items-start flex-col gap-1'>
      {children}
    </div>
  );
};

export default InputContainer;
