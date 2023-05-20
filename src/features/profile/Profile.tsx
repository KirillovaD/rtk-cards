import s from "./style.module.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import profileImg from "./Ellipse 45.png";
import { selectProfile } from "features/auth/auth.selectors";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import { useActions } from "common/hooks/useActions";

export const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const profile = useAppSelector(selectProfile);
  const [name, setName] = useState<string | null>(profile?.name || null);

  const { logout, changeProfileData } = useActions(authThunks);
  const logoutHandler = () => {
    logout();
  };

  const changeEditModeHandler = () => {
    setEditMode(true);
  };
  const changeNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.currentTarget.value);
  };
  useEffect(() => {
    if (name !== profile?.name) {
      changeProfileData({ name });
    }
  }, [name]);
  return (
    <div className={s.wrapper}>
      <Grid item xs={4}>
        <Paper elevation={3} className={s.card} sx={{ position: "relative" }}>
          <h2>Personal Information</h2>
          <img src={profileImg} alt={"Profile image"} className={s.profileImage} />
          <PhotoCameraIcon className={s.changePhoto} sx={{ position: "absolute", top: "160px", right: "110px" }} />
          {editMode ? (
            <TextField
              type="text"
              variant="standard"
              margin="normal"
              autoFocus
              value={name}
              onChange={(e) => changeNameHandler(e)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditMode(false)}
            />
          ) : (
            <h3>{profile?.name}</h3>
          )}
          {!editMode && (
            <EditIcon
              className={s.changeName}
              sx={{ position: "absolute", top: "225px", right: "40px" }}
              onClick={changeEditModeHandler}
            />
          )}
          <p>{profile?.email}</p>
          <Button variant="outlined" color="primary" onClick={logoutHandler}>
            <LogoutIcon color="primary" fontSize="small" sx={{ marginRight: "10px" }} /> Log Out
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};
