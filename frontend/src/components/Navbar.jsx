import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper,
  MenuItem,
  Menu,
  Avatar,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { products, categories } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";

// Navbar mostrada em todas as páginas: logo (esquerda), links das 3
// categorias, pesquisa (filtro em frontend por nome) e perfil (direita).
export default function Navbar() {
  const [search, setSearch] = useState("");
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Filtro simples em frontend: procura pelo nome, sem distinguir maiúsculas/minúsculas.
  const results =
    search.trim().length > 0
      ? products.filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase())).slice(0, 6)
      : [];

  const goToProduct = (id) => {
    setSearch("");
    navigate(`/product/${id}`);
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ flexWrap: "wrap", gap: 2, py: 1 }}>
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h5"
          sx={{
            fontFamily: '"Bebas Neue", sans-serif',
            letterSpacing: "0.06em",
            color: "primary.main",
            mr: 2,
          }}
        >
          PIXELCRIT
        </Typography>

        {/* Links das 3 categorias principais */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {categories.map((c) => (
            <Button key={c.slug} component={Link} to={`/${c.slug}`} color="inherit">
              {c.label}
            </Button>
          ))}
        </Box>

        {/* Pesquisa (ocupa o espaço disponível) */}
        <Box sx={{ position: "relative", flexGrow: 1, minWidth: 200, maxWidth: 420, ml: { xs: 0, sm: "auto" } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />

          {results.length > 0 && (
            <Paper
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                mt: 0.5,
                zIndex: 20,
                overflow: "hidden",
              }}
            >
              {results.map((r) => (
                <MenuItem key={r.id} onClick={() => goToProduct(r.id)}>
                  <Typography noWrap>{r.name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    ({r.category})
                  </Typography>
                </MenuItem>
              ))}
            </Paper>
          )}
        </Box>

        {/* Perfil / autenticação */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {!isAuthenticated ? (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained" color="primary">
                Registar
              </Button>
            </>
          ) : (
            <>
              <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
                <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: 14 }}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu anchorEl={userMenuAnchor} open={!!userMenuAnchor} onClose={() => setUserMenuAnchor(null)}>
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={() => setUserMenuAnchor(null)}
                >
                  Perfil
                </MenuItem>
                {user.role === "admin" && (
                  <MenuItem
                    component={Link}
                    to="/admin"
                    onClick={() => setUserMenuAnchor(null)}
                  >
                    Painel Admin
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    setUserMenuAnchor(null);
                    logout();
                    navigate("/");
                  }}
                >
                  Sair
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
