import { createTheme } from "@mui/material/styles";

// Tema escuro do Oblivion — paleta e tipografia num único ficheiro
// para ser fácil de ajustar mais tarde.
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#111111", // fundo principal da página
      paper: "#151919", // navbar, cards, dialogs
    },
    primary: {
      main: "#d50d14", // vermelho "Oblivion" — cor de destaque
      contrastText: "#ffffff",
    },
    text: {
      primary: "#f2f2f0",
      secondary: "#9aa0a6",
    },
    divider: "rgba(255,255,255,0.08)",
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // Fonte de destaque (logótipo e títulos) usada com moderação
    h1: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.03em" },
    h2: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.03em" },
    h3: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.03em" },
    h4: { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.02em" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: "none" },
  },

  shape: {
    borderRadius: 6,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#111111" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#151919",
          backgroundImage: "none",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 4 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
          transition: "transform 0.15s ease, border-color 0.15s ease",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export default theme;
