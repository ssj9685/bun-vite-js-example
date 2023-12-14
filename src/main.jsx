import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SiginUp";
import FolderPage from "./pages/Folder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/folder",
    element: <FolderPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
