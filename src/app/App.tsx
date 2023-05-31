import { GlobalError } from "common/components/globalError/GlobalError";
import React, { useEffect, useState } from "react";
import { Header } from "common/header/Header";
import { Routing } from "common/service/routing/Routing";
import { Sidebar } from "common/sidebar/Sidebar";
import s from "./style.module.css";
import { useAppDispatch } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";

function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authThunks.initializeApp());
  }, []);

  // if (isInitialized) {
  //   return <PrivateRoutes />;
  // }
  return (
    <div className={s.app}>
      <GlobalError />
      <Sidebar open={open} handleClose={handleClose} />
      <Header handleOpen={handleOpen} />
      <div className={s.wrapper}>
        <Routing />
      </div>
    </div>
  );
}

export default App;
