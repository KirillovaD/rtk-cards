import { GlobalError } from "common/components/globalError/GlobalError";
import { useAppDispatch } from "common/hooks";
import { HashRouter, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { useSelector } from "react-redux";
import { selectIsInitializes } from "app/app.selectors";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { Header } from "common/header/Header";
import { Routing } from "common/components/main/Routing";
import { PATH } from "common/components/main/paths";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isInitialized = useSelector(selectIsInitializes);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authThunks.initializeApp);
  }, [dispatch]);

  if (isInitialized) {
    return <Navigate to={PATH.PACKS} />;
  }

  return (
    <HashRouter>
      <div className="App">
        <GlobalError />
        <Header isLoggedIn={isLoggedIn} />
        <Routing />
      </div>
    </HashRouter>
  );
}

export default App;
