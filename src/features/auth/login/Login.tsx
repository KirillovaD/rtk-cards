import { authThunks } from "features/auth/auth.slice";
import s from "./style.module.css";
import React, { useState } from "react";
import "../../../index.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { Navigate, NavLink } from "react-router-dom";

import { useAppSelector } from "common/hooks";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ArgLoginType } from "features/auth/auth.api";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { PATH } from "common/components/routing/paths";
import { useActions } from "common/hooks/useActions";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Mail is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
});

export const Login = () => {
  const { login } = useActions(authThunks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgLoginType>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    login(data)
      .unwrap()
      .then((res) => {
        toast.success("You are sign in");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  });
  if (isLoggedIn) {
    return <Navigate to={PATH.PACKS} />;
  }
  return (
    <div className={s.wrapper}>
      <Grid item xs={4}>
        <Paper elevation={3} className={s.card}>
          <h2>Sign In</h2>
          <form className={s.form} onSubmit={onSubmit}>
            <FormControl>
              <FormGroup>
                <TextField
                  id="standard-email-input"
                  label="Email"
                  autoComplete="current-email"
                  type="email"
                  variant="standard"
                  margin="normal"
                  {...register("email")}
                />
                {errors.email && <p className={s.error}>{errors.email.message}</p>}
                <TextField
                  id="standard-password-input"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  variant="standard"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className={s.showBtn}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password")}
                />
                {errors.password && <p className={s.error}>{errors.password.message}</p>}
                <FormControlLabel
                  className={s.rememberMe}
                  label={"Remember me"}
                  control={<Checkbox {...register("rememberMe")} />}
                />
                <div className={s.button_footer}>
                  <NavLink to={PATH.FORGOT_PASSWORD}>Forgot Password?</NavLink>
                  <Button type={"submit"} variant={"contained"} color={"primary"}>
                    Sign In
                  </Button>
                </div>
              </FormGroup>
            </FormControl>
          </form>
          <p>Don't have an account?</p>
          <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
        </Paper>
      </Grid>
    </div>
  );
};

//
// email: "dakirillova@gmail.com",
//   password: "123456789D",
