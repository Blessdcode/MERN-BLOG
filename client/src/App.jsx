import { createBrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/register";
import Login from "./pages/login";
import Navigation from "./components/Navigation";
import Home from "./pages/home";

import styles from "./styles";
import UserProfile from "./pages/profile";
import UpdatedProfile from "./pages/update-profile";
import PrivateRoute from "./components/private-route";
// import Profile from "./pages/update-profile";

const Layout = () => {
  return (
    <div className="relative">
      <Navigation />

      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "updated-profile",
        element: (
          <PrivateRoute>
            <UpdatedProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <div className={`${styles.boxWidth}`}>
      <div className=" w-full lg:w-[1240px] mx-auto pt-3">
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
