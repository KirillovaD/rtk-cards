import { RootState } from "app/store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectProfile = (state: RootState) => state.auth.profile;
