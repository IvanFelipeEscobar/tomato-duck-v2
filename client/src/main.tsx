import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskPanel from "./components/task-panel";
import UserAuth from "./components/auth/index.tsx";
import ResetPassword from "./components/auth/resetPassword.tsx";
import VerifyAccount from "./components/auth/verifyAccount.tsx";
import User from "./components/auth/user.tsx";
import AuthForm from "./components/auth/authForm.tsx";
import ChangePassword from "./components/auth/changePassword.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TaskPanel /> },
      {
        path: "/user",
        element: <UserAuth />,
        children: [
          { path: "/user/signup", element: <AuthForm /> },
          { path: "/user/verify/:verificationToken", element: <VerifyAccount /> },
          { path: "/user/resetpassword/:resetToken", element: <ResetPassword /> },
          { path: "/user/", element: <User /> },
          { path: "/user/changepassword", element: <ChangePassword /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
