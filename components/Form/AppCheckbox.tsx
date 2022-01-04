import { useFormikContext } from "formik";
import React from "react";

const AppCheckbox = ({ label, name, ...rest }) => {
  const { handleChange } = useFormikContext();
  return (
    <div className="flex items-center">
      <input
        id={name}
        name={name}
        onChange={handleChange}
        type="checkbox"
        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        {...rest}
      />
      <label htmlFor={name} className="block ml-2 text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};

export default AppCheckbox;
