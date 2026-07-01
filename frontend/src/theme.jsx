import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e53935", // vermeelho princiapl
    },
    background: {
      default: "#0f0f0f",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#1a1a1a",
        },
      },
    },
  },
});

export default theme;
