import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";
import theme from "./theme/theme";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import JogosHome from "./pages/JogosHome";
import MediaHome from "./pages/MediaHome";
import LiteratureHome from "./pages/LiteratureHome";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

          <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jogos" element={<JogosHome />} />
              <Route path="/media" element={<MediaHome />} />
              <Route path="/literatura" element={<LiteratureHome />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Box>

          <Box
            component="footer"
            sx={{ borderTop: "1px solid", borderColor: "divider", py: 3 }}
          >
            <Typography variant="body2" color="text.secondary" align="center">
              PixelCrit — Projeto académico, Programação III (ISMT, 2025/2026)
            </Typography>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
