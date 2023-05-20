import { GlobalError } from "common/components/globalError/GlobalError";
import React, { useState } from "react";
import { Header } from "common/header/Header";
import { Routing } from "common/components/routing/Routing";
import { Sidebar } from "common/sidebar/Sidebar";
import s from "./style.module.css";

function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(authThunks.initializeApp());
  // }, [dispatch]);

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
