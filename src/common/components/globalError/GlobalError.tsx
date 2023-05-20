import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { appActions } from "app/app.slice";
import { useAppSelector } from "common/hooks";
import { useActions } from "common/hooks/useActions";

export const GlobalError = () => {
  const error = useAppSelector((state) => state.app.error);
  const { setError } = useActions(appActions);
  if (error !== null) {
    toast.error(error);
  }
  useEffect(() => {
    setTimeout(() => {
      setError({ error: null });
    }, 2000);
  }, [error]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};
