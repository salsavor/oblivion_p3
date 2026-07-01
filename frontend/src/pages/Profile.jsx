import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Avatar, Typography, TextField, Button, Box, Alert, Chip } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Precisa de iniciar sessão para ver o seu perfil.
        </Alert>
        <Button component={Link} to="/login" variant="contained" color="primary">
          Iniciar sessão
        </Button>
      </Container>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name: name.trim(), email: email.trim() });
    setSaved(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main", fontSize: 26 }}>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5">{user.name}</Typography>
          <Chip
            label={user.role === "admin" ? "Administrador" : "Utilizador"}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mt: 0.5 }}
          />
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }} component="form" onSubmit={handleSave}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Editar perfil
        </Typography>

        {saved && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSaved(false)}>
            Alterações guardadas.
          </Alert>
        )}

        <TextField label="Nome" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" color="primary">
          Guardar alterações
        </Button>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>
        As minhas reviews
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Ainda não fez nenhuma review. Explore os catálogos de Jogos, Média e Literatura e partilhe a sua opinião.
      </Typography>
    </Container>
  );
}
