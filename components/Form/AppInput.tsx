import { useFormikContext } from "formik";

const AppInput = ({ name, label, type = "text", ...rest }) => {
  const { handleChange, handleBlur, touched, errors } = useFormikContext();

  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <div className="mt-1">
        <input
          type={type}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...rest}
        />
        {touched[name] && errors[name] && (
          <div className="text-xs text-red-500 capitalize">{errors[name]}</div>
        )}
      </div>
    </label>
  );
};

export default AppInput;
