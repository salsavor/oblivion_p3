import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const nav = useNavigate();

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          padding: 6,
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: "#000" }}
          fontWeight={700}
          gutterBottom
        >
          Ups! Erro 404
        </Typography>
        <Typography variant="h5" sx={{ mb: 2, color: "#000"  }}>
          Página não encontrada
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          A página que procuras não existe ou foi removida.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => nav("/")}>
          Voltar à página inicial
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;
