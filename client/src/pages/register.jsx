import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../store/userSlice/userApiSlice";
import { setCredentials } from "../store/userSlice/authSlice";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";

import FormInput from "../components/form-input";
import styles from "../styles";
const defaultFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile: "",
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormData);
  const { name, email, mobile, password, confirmPassword } = formFields;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [seePassword, setSeePassword] = useState(false)
  const [hidePassword, setHidePassword] = useState(false)

  const [register, { isLoading }] = useRegisterMutation();

  // const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ name, email, mobile, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className={`${styles.marginY} flex justify-center items-center `}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Register
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Create an account to get started.
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Full Name"
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            required
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
          <FormInput
            label="Mobile"
            type="tel"
            name="mobile"
            onChange={handleChange}
            value={mobile}
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-all duration-300">
            Sign Up
          </button>
        </form>
        <div className="text-start text-gray-800 mt-4 flex">
          <p className="pr-2"> Already have an account?</p>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
