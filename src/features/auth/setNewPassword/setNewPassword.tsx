import s from "./style.module.css";
import React from "react";
import { Button, FormControl, FormGroup, Grid, Paper, TextField } from "@mui/material";

export const SetNewPassword = () => {
  const newPasswordHandler = () => {};

  return (
    <div className={s.wrapper}>
      <Grid item xs={4}>
        <Paper elevation={3} className={s.card}>
          <h2>Sign In</h2>
          <form className={s.form}>
            <FormControl>
              <FormGroup>
                <TextField
                  required
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  margin="normal"
                />
                <p>Create new password and we will send you further instructions to email</p>
                <Button type={"submit"} variant={"contained"} color={"primary"} onClick={newPasswordHandler}>
                  Create new password
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};
