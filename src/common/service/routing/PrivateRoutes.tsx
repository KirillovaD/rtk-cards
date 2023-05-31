import { Navigate, Outlet } from "react-router-dom";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { PATH } from "common/service/routing/paths";
import { useAppSelector } from "common/hooks";

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
