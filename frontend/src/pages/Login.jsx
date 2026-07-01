import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Alert, Box } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    // Simulação: qualquer combinação de email/password é aceite.
    // Usar um email com "admin" (ex: admin@pixelcrit.com) para testar o AdminDashboard.
    login(email.trim(), password);
    navigate("/");
  };

  return (
    <Container maxWidth="xs" sx={{ py: 10 }}>
      <Paper sx={{ p: 4 }} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Iniciar sessão
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth size="large">
          Entrar
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Não tem conta?{" "}
            <Typography component={Link} to="/register" variant="body2" color="primary" sx={{ fontWeight: 700 }}>
              Registar
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
