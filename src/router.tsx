import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { SignUp } from "features/auth/signUp/signUp";
import { Login } from "features/auth/login/Login";
import { CheckMail } from "features/auth/checkMail/CheckMail";
import { SetNewPassword } from "features/auth/setNewPassword/setNewPassword";
import { ForgotPassword } from "features/auth/forgotPassword/ForgotPassword";
import Error404 from "features/error/404Error/Error404";
import App from "app/App";
import { Profile } from "features/profile/Profile";
import { Packs } from "features/packs/Paks";

export const PATH = {
  ENTER: "",
  LOGIN: "/login",
  REGISTER: "/register",
  CHECK_MAIL: "/check-email",
  SET_NEW_PASSWORD: "/set-new-password",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE: "/profile",
  PACKS: "/packs",
  CARDS: "/cards",
  LEARN: "/learn",
  ERROR: "/*",
};

export const router = createBrowserRouter([
  {
    path: PATH.ENTER,
    element: <App />,
    children: [
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
      {
        path: PATH.REGISTER,
        element: <SignUp />,
      },
      {
        path: PATH.CHECK_MAIL,
        element: <CheckMail />,
      },
      {
        path: PATH.SET_NEW_PASSWORD,
        element: <SetNewPassword />,
      },
      {
        path: PATH.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: PATH.PROFILE,
        element: <Profile />,
      },
      {
        path: PATH.PACKS,
        element: <Packs />,
      },
      {
        path: PATH.CARDS,
        element: <h1>Cards</h1>,
      },
      {
        path: PATH.LEARN,
        element: <h1>Learn</h1>,
      },
      {
        path: PATH.ERROR,
        element: <Error404 />,
      },
    ],
  },
]);
