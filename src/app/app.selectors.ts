import { RootState } from "app/store";

export const selectIsInitializes = (state: RootState) => state.app.isAppInitialized;
export const selectIsLoading = (state: RootState) => state.app.isLoading;
