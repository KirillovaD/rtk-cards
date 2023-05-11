import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { PATH } from "common/components/main/paths";

export const PrivateRoutes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
