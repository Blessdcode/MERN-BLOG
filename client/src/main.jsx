import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./index.css";
// import App from "./App.jsx";
import store from "./store/store.js";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <ToastContainer />
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
