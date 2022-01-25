import React from "react";

const FormLabel = ({ title, ...otherProps }) => {
  return (
    <label className='px-1 text-gray-800' {...otherProps}>
      {title}
    </label>
  );
};

export default FormLabel;
