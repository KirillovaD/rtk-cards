import React, { FC } from "react";
import { AppBar, LinearProgress, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { selectIsLoading } from "app/app.selectors";
import { selectIsLoggedIn, selectProfile } from "features/auth/auth.selectors";
import profileImg from "features/profile/Ellipse 45.png";
import s from "./index.module.css";
import { NavLink } from "react-router-dom";
import { PATH } from "common/components/routing/paths";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppSelector } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import { useActions } from "common/hooks/useActions";

type Props = {
  handleOpen: () => void;
};
export const Header: FC<Props> = ({ handleOpen }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectIsLoading);
  const profile = useAppSelector(selectProfile);
  const { logout } = useActions(authThunks);
  const logoutHandler = () => {
    logout();
  };
  return (
    <AppBar position="static" color="inherit">
      <Toolbar className={s.header}>
        {isLoggedIn && <Menu onClick={handleOpen} color="primary" />}
        {isLoggedIn && (
          <div className={s.profile}>
            <NavLink to={PATH.PROFILE}>
              <p>{profile?.name}</p>
              <img src={profileImg} alt={"Profile image"} className={s.profileImage} />
            </NavLink>
            <LogoutIcon color="primary" fontSize="small" onClick={logoutHandler} />
          </div>
        )}
      </Toolbar>
      {isLoading && <LinearProgress />}
    </AppBar>
  );
};
