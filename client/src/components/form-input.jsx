import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const FormInput = ({ label, type, onClick, ...otherProps }) => {
  const [seePassword, setSeePassword] = useState(false);

  // Handle password visibility toggle
  const handleVisibilityToggle = () => {
    setSeePassword((prev) => !prev);
  };

  return (
    <div className="relative mb-6">
      {label && (
        <div className="absolute bottom-10 text-gray-500 text-sm">{label}</div>
      )}
      <input
        className="mt-4 peer w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:border-slate-900 outline-none transition-all duration-300 placeholder-transparent"
        {...otherProps}
        type={type === "password" && seePassword ? "text" : "password"} // Switch between 'text' and 'password'
        placeholder=" " // Invisible placeholder to create space for label
      />

      {type === "password" && (
        <div
          onClick={handleVisibilityToggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
          {seePassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
      )}
    </div>
  );
};

export default FormInput;
