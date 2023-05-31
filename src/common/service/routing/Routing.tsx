import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "common/service/routing/paths";
import { Login } from "features/auth/login/Login";
import { ForgotPassword } from "features/auth/forgotPassword/ForgotPassword";
import { CheckMail } from "features/auth/checkMail/CheckMail";
import { SetNewPassword } from "features/auth/setNewPassword/setNewPassword";
import Error404 from "features/error/404Error/Error404";
import { PrivateRoutes } from "common/service/routing/PrivateRoutes";
import { Profile } from "features/profile/Profile";
import { Packs } from "features/packs/Paks";
import { Cards } from "features/cards/components/Cards/Cards";
import { Learn } from "features/learn/Learn";
import { SignUp } from "features/auth/signUp/signUp";

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<SignUp />} />;
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />;
      <Route path={PATH.CHECK_MAIL} element={<CheckMail />} />;
      <Route path={PATH.SET_NEW_PASSWORD} element={<SetNewPassword />} />;
      <Route path={PATH.ERROR} element={<Error404 />} />;
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to={PATH.PACKS} />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.CARDS + "/:packId"} element={<Cards />} />
        <Route path={PATH.LEARN + "/:packId"} element={<Learn />} />
      </Route>
    </Routes>
  );
};
