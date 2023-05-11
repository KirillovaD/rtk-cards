import React, { FC } from "react";
import { AppBar, Button, IconButton, LinearProgress, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectIsLoading } from "app/app.selectors";
import { selectProfile } from "features/auth/auth.selectors";
import profileImg from "features/profile/Ellipse 45.png";
import s from "./index.module.css";
type Props = {
  isLoggedIn: boolean;
};
export const Header: FC<Props> = ({ isLoggedIn }) => {
  const isLoading = useSelector(selectIsLoading);
  const profile = useSelector(selectProfile);
  return (
    <AppBar position="static" color="inherit">
      <Toolbar className={s.header}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          {isLoggedIn && <Menu />}
        </IconButton>
        {isLoggedIn && (
          <div className={s.profile}>
            <img src={profileImg} alt={"Profile image"} className={s.profileImage} />
            <Button color="inherit" className="logout">
              Log out
            </Button>
          </div>
        )}
      </Toolbar>
      {isLoading && <LinearProgress />}
    </AppBar>
  );
};
