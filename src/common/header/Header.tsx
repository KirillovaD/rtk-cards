import React, { FC } from "react";
import { AppBar, Button, IconButton, LinearProgress, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectIsLoading } from "app/app.selectors";
import { selectProfile } from "features/auth/auth.selectors";
import profileImg from "features/profile/Ellipse 45.png";
import s from "./index.module.css";
import { NavLink } from "react-router-dom";
import { PATH } from "common/components/routing/paths";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";

type Props = {
  isLoggedIn: boolean;
  handleOpen: () => void;
};
export const Header: FC<Props> = ({ isLoggedIn, handleOpen }) => {
  const isLoading = useSelector(selectIsLoading);
  const profile = useSelector(selectProfile);
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(authThunks.logout());
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
