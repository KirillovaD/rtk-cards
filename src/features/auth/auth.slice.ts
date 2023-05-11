import { createSlice } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunkTryCatch";
import { appActions } from "app/app.slice";

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isLoggedIn: false as boolean,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        debugger;
        state.profile = action.payload.profile;
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });

    // .addCase(initializeApp.fulfilled, (state, action) => {
    //   state.isLoggedIn = action.payload.isLoggedIn;
    // });
  },
});

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg);
  });
});

const login = createAppAsyncThunk<{ profile: ProfileType; isLoggedIn: boolean }, ArgLoginType>(
  "auth/login",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.login(arg);
      return { profile: res.data, isLoggedIn: true };
    });
  }
);

const initializeApp = createAppAsyncThunk<{ profile: ProfileType; isLoggedIn: boolean }, void>(
  "app/initializeApp",
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI;
      const res = await authApi.me();
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
      return { isLoggedIn: true };
    });
  }
);

const forgotPassword = createAppAsyncThunk<void, string>("app/forgotPassword", async (email, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.forgotPassword(email);
  });
});

export const authReducer = slice.reducer;
// export const authActions = slice.actions;
export const authThunks = { register, login, initializeApp, forgotPassword };
