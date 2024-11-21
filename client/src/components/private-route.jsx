import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth); // Get auth state
    const { _id } = userInfo;
    
    
  return _id ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
