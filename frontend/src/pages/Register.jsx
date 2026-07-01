import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Alert, Box } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As palavras-passe não coincidem.");
      return;
    }

    // Simulação de registo em frontend — substituir por POST /api/auth/register.
    register(name.trim(), email.trim(), password);
    navigate("/");
  };

  return (
    <Container maxWidth="xs" sx={{ py: 10 }}>
      <Paper sx={{ p: 4 }} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Criar conta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField label="Nome" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Palavra-passe"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirmar palavra-passe"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth size="large">
          Registar
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Já tem conta?{" "}
            <Typography component={Link} to="/login" variant="body2" color="primary" sx={{ fontWeight: 700 }}>
              Entrar
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
