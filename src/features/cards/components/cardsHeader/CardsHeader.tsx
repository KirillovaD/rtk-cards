import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import s from "./index.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "common/service/routing/paths";

export const CardsHeader = () => {
  const navigate = useNavigate();
  return (
    <div className={s.back}>
      <ArrowBackIcon color="action" onClick={() => navigate(PATH.PACKS)} />
      <NavLink to={PATH.PACKS}>Back to Packs List</NavLink>
    </div>
  );
};
