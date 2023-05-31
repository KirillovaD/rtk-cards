import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "common/service/routing/paths";
import s from "./styles.module.css";
import closeIcon from "./closeOutline.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { authThunks } from "features/auth/auth.slice";
import { useActions } from "common/hooks/useActions";

type Props = {
  open: boolean;
  handleClose: () => void;
};
export const Sidebar: FC<Props> = ({ open, handleClose }) => {
  const { logout } = useActions(authThunks);
  const logoutHandler = () => {
    logout();
  };
  const sidebarClass = s.sidebar + (open ? " " + s.open : "");
  return (
    <>
      {open && <div className={s.background} onClick={handleClose} />}
      <aside className={sidebarClass}>
        <button className={s.close} onClick={handleClose}>
          <img src={closeIcon} alt="close sidebar" />
        </button>
        <nav className={s.nav}>
          <div className={s.navLinks}>
            <NavLink
              to={PATH.PACKS}
              onClick={handleClose}
              className={({ isActive }) => (isActive ? `${s.active}` : "")}
            >
              Packs
            </NavLink>
            <NavLink
              to={PATH.PROFILE}
              onClick={handleClose}
              className={({ isActive }) => (isActive ? `${s.active}` : "")}
            >
              Profile
            </NavLink>
          </div>
          <LogoutIcon color="primary" fontSize="small" onClick={logoutHandler} />
        </nav>
      </aside>
    </>
  );
};
