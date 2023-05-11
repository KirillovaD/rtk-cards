import s from "./style.module.css";
import React from "react";
import { Button, Grid, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";

import profileImg from "./Ellipse 45.png";
import { useAppDispatch } from "common/hooks";
import { PATH } from "router";
import { useSelector } from "react-redux";
import { selectProfile } from "features/auth/auth.selectors";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectProfile);

  return (
    <div className={s.wrapper}>
      <Grid item xs={4}>
        <Paper elevation={3} className={s.card}>
          <h2>Personal Information</h2>
          <img src={profileImg} alt={"Profile image"} className={s.profileImage} />
          <h3>{profile?.name}</h3>
          <p>{profile?.email}</p>
          <Button type={"submit"} variant={"contained"} color={"primary"} component={NavLink} to={PATH.LOGIN}>
            Back to login
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};
