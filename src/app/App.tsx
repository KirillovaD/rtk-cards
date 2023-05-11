import { GlobalError } from "common/components/globalError/GlobalError";
import { LinearProgress } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { PATH } from "router";
import { useSelector } from "react-redux";
import { selectIsInitializes, selectIsLoading } from "app/app.selectors";

function App() {
  const isLoading = useSelector(selectIsLoading);
  const isInitialized = useSelector(selectIsInitializes);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authThunks.initializeApp);
  }, []);

  if (isInitialized) {
    return <Navigate to={PATH.PACKS} />;
  }

  return (
    <div className="App">
      <GlobalError />
      {isLoading && <LinearProgress />}
      <Outlet />
    </div>
  );
}

export default App;
