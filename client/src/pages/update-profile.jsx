import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useUpdatedUserMutation } from "../store/userSlice/userApiSlice"; // Assuming you have this API setup
import { setCredentials } from "../store/userSlice/authSlice";
import { toast } from "react-toastify";

import FormInput from "../components/form-input";

const UpdatedProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); // Get user info from Redux state

  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    mobile: userInfo?.mobile || "",
    password: userInfo?.password || "",
  });

  const [updateUser, { isLoading }] = useUpdatedUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(formData).unwrap(); 
      dispatch(setCredentials(updatedUser)); 
      toast.success("Profile updated successfully!");
         navigate("/profile");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <FormInput
          label="Mobile"
          type="tel"
          name="mobile"
          onChange={handleChange}
          value={formData.mobile}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdatedProfile;
