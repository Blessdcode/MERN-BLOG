import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../components/register";
import Login from "../components/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router