import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { categories } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import catalogService, {
  attachScores,
  TIPO_ALVO,
} from "../services/catalog.service";
import reviewService from "../services/review.service";
import publisherService from "../services/publisher.service";

const emptyForm = {
  id: null,
  category: "jogos",
  nome: "",
  descricao: "",
  ano: "",
  imagem_url: "",
  autor: "",
  tipo: "Filme",
  publisherId: "",
};

// Jogos usam "publisher", média usa "produtora" — são duas listas separadas
// (mesma tabela no backend, distinguidas pelo campo "tipo").
const PUBLISHER_CONFIG = {
  jogos: { tipo: "publisher", label: "Publisher" },
  media: { tipo: "produtora", label: "Produtora" },
};

const TIPOS_MEDIA = ["Filme", "Serie", "Anime", "Documentario"];

export default function AdminDashboard() {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [publishersByTipo, setPublishersByTipo] = useState({
    publisher: [],
    produtora: [],
  });
  const [newPublisherName, setNewPublisherName] = useState("");
  const [creatingPublisher, setCreatingPublisher] = useState(false);

  const isAdmin = isAuthenticated && user?.role === "admin";

  const loadItems = () => {
    setLoading(true);
    setError("");
    return Promise.all([
      catalogService.getAll("jogos"),
      catalogService.getAll("media"),
      catalogService.getAll("literatura"),
      reviewService.getAll(),
    ])
      .then(([jogos, media, literatura, reviews]) => {
        setItems([
          ...attachScores(jogos, reviews, TIPO_ALVO.jogos),
          ...attachScores(media, reviews, TIPO_ALVO.media),
          ...attachScores(literatura, reviews, TIPO_ALVO.literatura),
        ]);
      })
      .catch(() => setError("Não foi possível carregar os dados do backend."))
      .finally(() => setLoading(false));
  };

  const loadPublishers = () => {
    Promise.all([
      publisherService.getAll("publisher"),
      publisherService.getAll("produtora"),
    ])
      .then(([publisher, produtora]) =>
        setPublishersByTipo({ publisher, produtora }),
      )
      .catch(() => setPublishersByTipo({ publisher: [], produtora: [] }));
  };

  useEffect(() => {
    if (isAdmin) {
      loadItems();
      loadPublishers();
    }
  }, [isAdmin]);

  if (!isAuthenticated || !isAdmin) {
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
    setFormError("");
    setNewPublisherName("");
    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setForm({
      id: item.id,
      category: item.category,
      nome: item.name,
      descricao: item.raw.descricao || "",
      ano: item.year != null ? String(item.year) : "",
      imagem_url: item.raw.imagem_url || "",
      autor: item.raw.autor || "",
      tipo: item.raw.tipo || "Filme",
      publisherId: item.raw.publisherId ? String(item.raw.publisherId) : "",
    });
    setFormError("");
    setNewPublisherName("");
    setDialogOpen(true);
  };

  const handleCreatePublisher = async () => {
    if (!newPublisherName.trim()) return;
    const { tipo } = PUBLISHER_CONFIG[form.category];
    setCreatingPublisher(true);
    try {
      const publisher = await publisherService.create(
        newPublisherName.trim(),
        tipo,
      );
      setPublishersByTipo((prev) => ({
        ...prev,
        [tipo]: [...prev[tipo], publisher],
      }));
      setForm((prev) => ({ ...prev, publisherId: String(publisher.id) }));
      setNewPublisherName("");
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Não foi possível criar o registo.",
      );
    } finally {
      setCreatingPublisher(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Eliminar "${item.name}"?`)) return;
    try {
      await catalogService.remove(item.category, item.id);
      setItems((prev) =>
        prev.filter((p) => !(p.category === item.category && p.id === item.id)),
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Não foi possível eliminar o item.",
      );
    }
  };

  const handleSave = async () => {
    if (!form.nome.trim()) return;

    setFormError("");
    setSaving(true);
    try {
      if (form.id) {
        await catalogService.update(form.category, form.id, form);
      } else {
        await catalogService.create(form.category, form);
      }
      setDialogOpen(false);
      await loadItems();
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Não foi possível guardar o item.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ width: 4, height: 26, bgcolor: "primary.main" }} />
          <Typography variant="h4">Painel de Administração</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openNew}
        >
          Novo item
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {loading && <CircularProgress />}

      {!loading && (
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
                <TableRow key={`${item.category}-${item.id}`} hover>
                  <TableCell>{item.name}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {item.category}
                  </TableCell>
                  <TableCell>
                    {item.score ? item.score.toFixed(1) : "—"}
                  </TableCell>
                  <TableCell>{item.year ?? "—"}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(item)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(item)}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Dialog usado tanto para criar como para editar */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{form.id ? "Editar item" : "Novo item"}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
        >
          {formError && <Alert severity="error">{formError}</Alert>}

          <TextField
            select
            label="Categoria"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            disabled={!!form.id}
          >
            {categories.map((c) => (
              <MenuItem key={c.slug} value={c.slug}>
                {c.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            autoFocus
          />

          {form.category === "literatura" && (
            <TextField
              label="Autor"
              value={form.autor}
              onChange={(e) => setForm({ ...form, autor: e.target.value })}
            />
          )}

          {form.category === "media" && (
            <TextField
              select
              label="Tipo"
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            >
              {TIPOS_MEDIA.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
          )}

          {PUBLISHER_CONFIG[form.category] && (
            <>
              <TextField
                select
                label={PUBLISHER_CONFIG[form.category].label}
                value={form.publisherId}
                onChange={(e) =>
                  setForm({ ...form, publisherId: e.target.value })
                }
              >
                <MenuItem value="">— Nenhum —</MenuItem>
                {publishersByTipo[PUBLISHER_CONFIG[form.category].tipo].map(
                  (p) => (
                    <MenuItem key={p.id} value={String(p.id)}>
                      {p.nome}
                    </MenuItem>
                  ),
                )}
              </TextField>

              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  label={`Novo(a) ${PUBLISHER_CONFIG[form.category].label.toLowerCase()}`}
                  size="small"
                  fullWidth
                  value={newPublisherName}
                  onChange={(e) => setNewPublisherName(e.target.value)}
                />
                <Button
                  variant="outlined"
                  onClick={handleCreatePublisher}
                  disabled={creatingPublisher || !newPublisherName.trim()}
                >
                  Adicionar
                </Button>
              </Box>
            </>
          )}

          <TextField
            label="Ano"
            type="number"
            value={form.ano}
            onChange={(e) => setForm({ ...form, ano: e.target.value })}
          />

          <TextField
            label="Descrição"
            multiline
            minRows={2}
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />

          <TextField
            label="URL da imagem (opcional)"
            value={form.imagem_url}
            onChange={(e) => setForm({ ...form, imagem_url: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "A guardar..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
