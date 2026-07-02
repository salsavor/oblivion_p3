import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { products as initialProducts, categories } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";

const emptyForm = { id: null, name: "", category: "jogos", author: "", year: "", score: "" };

// Painel de administração — CRUD só em memória (frontend). Ligar mais tarde
// aos endpoints REST do backend (ex: POST/PUT/DELETE /api/products).
export default function AdminDashboard() {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  if (!isAuthenticated || user.role !== "admin") {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Acesso restrito à área de administração.
        </Alert>
        <Button component={Link} to="/" variant="outlined" color="primary">
          Voltar à Home
        </Button>
      </Container>
    );
  }

  const openNew = () => {
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setForm(item);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (form.id) {
      // edição
      setItems((prev) => prev.map((p) => (p.id === form.id ? { ...p, ...form, score: Number(form.score) } : p)));
    } else {
      // criação
      const newItem = {
        ...form,
        id: Date.now(),
        score: Number(form.score) || 0,
        year: Number(form.year) || new Date().getFullYear(),
        image: `https://placehold.co/500x700/1a1e1e/d50d14?text=${encodeURIComponent(form.name)}`,
        description: "Item criado através do painel de administração.",
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ width: 4, height: 26, bgcolor: "primary.main" }} />
          <Typography variant="h4">Painel de Administração</Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openNew}>
          Novo item
        </Button>
      </Box>

      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Nota</TableCell>
              <TableCell>Ano</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.name}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>{item.category}</TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => openEdit(item)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog usado para criar e editar */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{form.id ? "Editar item" : "Novo item"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            label="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            autoFocus
          />
          <TextField
            select
            label="Categoria"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((c) => (
              <MenuItem key={c.slug} value={c.slug}>
                {c.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Autor / Estúdio" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <TextField
            label="Ano"
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />
          <TextField
            label="Nota (0-10)"
            type="number"
            value={form.score}
            onChange={(e) => setForm({ ...form, score: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
