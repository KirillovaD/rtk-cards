import { AxiosError } from "axios";
import { appActions, appReducer } from "app/app.slice";

describe("app reducer", () => {
  const initialState = {
    error: null,
    isLoading: false,
    isAppInitialized: false,
  };
  it("should set isLoading to true when a pending action is dispatched", () => {
    const action = { type: "some/pending" };
    const state = appReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it("should set isLoading to false when a fulfilled action is dispatched", () => {
    const action = { type: "some/fulfilled" };
    const state = appReducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  it("should set error to null when setError is dispatched with null", () => {
    const action = appActions.setError({ error: null });
    const state = appReducer(initialState, action);
    expect(state.error).toBe(null);
  });

  it("should set error to the provided message when setError is dispatched with a message", () => {
    const action = appActions.setError({ error: "some error" });
    const state = appReducer(initialState, action);
    expect(state.error).toBe("some error");
  });

  it("should set isAppInitialized to true when setAppInitialized is dispatched with true", () => {
    const action = appActions.setAppInitialized({ isInitialized: true });
    const state = appReducer(initialState, action);
    expect(state.isAppInitialized).toBe(true);
  });

  it('should set error to "Native error <error message>" when a non-Axios error is dispatched', () => {
    const error = new Error("some error");
    const action = { type: "some/rejected", payload: { e: error, showGlobalError: true } };
    const state = appReducer(initialState, action);
    expect(state.error).toBe("Native error some error");
  });
});
