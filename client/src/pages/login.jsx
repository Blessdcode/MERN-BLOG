import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../store/userSlice/userApiSlice";
import { setCredentials } from "../store/userSlice/authSlice";
import { toast } from "react-toastify";

import FormInput from "../components/form-input";

import styles from "../styles";
const defaultFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormData);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  //  useEffect(() => {
  //     if (userInfo) {
  //
  //     }
  //   }, [navigate, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
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
          Login
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Login to your account to get started.
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-all duration-300">
            Sign Up
          </button>
        </form>
        <div className="text-start text-gray-800 mt-4 flex">
          <p className="pr-2"> Don't have an account?</p>
          <Link to={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
