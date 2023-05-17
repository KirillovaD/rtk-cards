import s from "./style.module.css";
import React from "react";
import { Button, FormControl, FormGroup, Grid, Paper, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authThunks } from "features/auth/auth.slice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { PATH } from "common/components/routing/paths";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Mail is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
});
export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(({ email }) => {
    dispatch(authThunks.forgotPassword(email))
      .unwrap()
      .then((res) => {
        toast.success("An email with instructions to recover your password has been sent to the email address.");
        setTimeout(() => {
          navigate(PATH.CHECK_MAIL);
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  });

  return (
    <div className={s.wrapper}>
      <Grid item xs={4}>
        <Paper elevation={3} className={s.card}>
          <h2>Sign In</h2>
          <form className={s.form} onSubmit={onSubmit}>
            <FormControl>
              <FormGroup>
                <TextField
                  id="email"
                  label="Email"
                  autoComplete="current-email"
                  type="email"
                  variant="standard"
                  margin="normal"
                  {...register("email")}
                />
                {/*{errors.email && <p className={s.error}>{errors.email?.message}</p>}*/}
                <p>Enter your email address and we will send you further instructions </p>
                <div className={s.button_footer}>
                  <Button type={"submit"} variant={"contained"} color={"primary"}>
                    Send Instructions
                  </Button>
                </div>
              </FormGroup>
            </FormControl>
          </form>
          <p>Did you remember your password?</p>
          <NavLink to={PATH.LOGIN}>Try Sign In</NavLink>
        </Paper>
      </Grid>
    </div>
  );
};
