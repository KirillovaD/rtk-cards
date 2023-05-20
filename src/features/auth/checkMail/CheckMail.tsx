import s from "./style.module.css";
import React from "react";
import { Button, Grid, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";

import checkMail from "./check_email.png";
import { PATH } from "common/components/routing/paths";

export const CheckMail = () => {
  return (
    <div className={s.wrapper}>
      <Grid item xs={4}>
        <Paper elevation={3} className={s.card}>
          <h2>Check Email</h2>
          <img src={checkMail} alt={"checkMail"} className={s.checkMail} />
          <p>
            We’ve sent an Email with instructions <br /> to example@mail.com
          </p>
          <Button type={"submit"} variant={"contained"} color={"primary"} component={NavLink} to={PATH.LOGIN}>
            Back to login
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};
