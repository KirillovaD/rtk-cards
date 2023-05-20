import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          boxShadow: "none",
          width: "fit-content",
          margin: "0 auto",

          "&:hover": {
            background: "#c4d6ff",
            boxShadow: "none",
            color: "#001a58",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "1.3em",
          color: "primary",
          cursor: "pointer",
          "&:hover": {
            color: "#1565c0",
          },
        },
      },
    },
  },
});
