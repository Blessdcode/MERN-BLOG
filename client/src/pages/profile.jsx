import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLogoutMutation } from "../store/userSlice/userApiSlice";
import { setCredentials } from "../store/userSlice/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, { isLoading }] = useLogoutMutation();
  const { userInfo: user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      const res = await logout({});
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleUpdateProfile = () => {
    navigate("/updated-profile");
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] ">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          User Profile
        </h2>
        <div className="text-gray-700 mb-6">
          <div className="mb-4">
            <p className="font-semibold text-gray-600 capitalize">Name:</p>
            <p className=" capitalize">{user.name}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-600">Email:</p>
            <p>{user.email}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-600">Mobile:</p>
            <p>0{user.mobile || "N/A"}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all">
            Update Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
            disabled={isLoading}>
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
