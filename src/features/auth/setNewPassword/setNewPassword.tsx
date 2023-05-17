import s from "./style.module.css";
import React from "react";
import { Button, FormControl, FormGroup, Grid, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ArgLoginType, ArgSetNewPasswordType } from "features/auth/auth.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { authThunks } from "features/auth/auth.slice";
import { toast } from "react-toastify";
import { useAppDispatch } from "common/hooks";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "common/components/routing/paths";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
});

export const SetNewPassword = () => {
  const dispatch = useAppDispatch();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgSetNewPasswordType>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    if (token && data) {
      dispatch(authThunks.setNewPassword({ password: data.password, resetPasswordToken: token }))
        .unwrap()
        .then((res) => {
          toast.success("New password was successfully updated");
          setTimeout(() => {
            navigate(PATH.LOGIN);
          }, 3000);
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
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
                  required
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  margin="normal"
                  {...register("password")}
                />
                {errors.password && <p className={s.error}>{errors.password.message}</p>}
                <p>Create new password and we will send you further instructions to email</p>
                <Button type={"submit"} variant={"contained"} color={"primary"}>
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
