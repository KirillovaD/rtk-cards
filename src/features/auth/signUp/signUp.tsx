import React, { useRef, useState } from "react";
import s from "./style.module.css";
import { Button, FormControl, FormGroup, Grid, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { authThunks } from "features/auth/auth.slice";
import { toast } from "react-toastify";
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
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  password_repeat: yup
    .string()
    .required("Password is required")
    .min(7, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .oneOf([yup.ref("password")], "The passwords do not match"),
});
export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      password_repeat: "",
    },
  });
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    dispatch(authThunks.register({ email, password }))
      .unwrap()
      .then((res) => {
        toast.success("You are registered");
        navigate(PATH.LOGIN);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        if (err.response.data.error.includes("exist")) {
          setTimeout(() => {
            navigate(PATH.LOGIN);
          }, 5000);
        }
      });
  };

  return (
    <div className={s.wrapper}>
      <Grid item xs={4}>
        <Paper elevation={3} className={s.card}>
          <h2>Sign Up</h2>
          <form className={s.form} onSubmit={(e) => e.preventDefault()}>
            <FormControl>
              <FormGroup>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="standard-email-input"
                      label="Email"
                      autoComplete="current-email"
                      type="email"
                      placeholder="Email"
                      variant="standard"
                      margin="normal"
                    />
                  )}
                />
                {errors.email && <p className={s.error}>{errors.email.message}</p>}
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      id="password-input"
                      label="Password"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
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
                    />
                  )}
                />
                {errors.password && <p className={s.error}>{errors.password.message}</p>}
                <Controller
                  name="password_repeat"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => value === password.current || "The passwords do not match",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      id="confirm-password-input"
                      label="Confirm password"
                      autoComplete="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
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
                    />
                  )}
                />
                {errors.password_repeat && <p className={s.error}>{errors.password_repeat.message}</p>}
                <div className={s.button_footer}>
                  <Button type={"submit"} variant={"contained"} color={"primary"} onClick={handleSubmit(onSubmit)}>
                    Sign Up
                  </Button>
                </div>
              </FormGroup>
            </FormControl>
          </form>
          <p>Already have an account?</p>
          <NavLink to={PATH.LOGIN}>Sign In</NavLink>
        </Paper>
      </Grid>
    </div>
  );
};
