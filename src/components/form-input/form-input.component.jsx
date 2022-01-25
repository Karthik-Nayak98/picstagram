import React from "react";

const FormInput = props => {
  return (
    <input
      className='w-full self-center text-gray-600 outline-none rounded border px-2 py-2 text-left outline-none: focus:border-2 focus:border-pink-300'
      {...props}
      autoComplete='true'
    />
  );
};

export default FormInput;
