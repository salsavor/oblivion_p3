import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Chip,
  Rating,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../contexts/AuthContext";
import catalogService from "../services/catalog.service";
import reviewService from "../services/review.service";

const CATEGORY_BY_TIPO = { jogo: "jogos", midia: "media", literatura: "literatura" };
const categoryLabel = { jogos: "Jogo", media: "Média", literatura: "Literatura" };

export default function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState("");

  const loadReviews = () => {
    if (!user) return;
    setLoadingReviews(true);
    setReviewsError("");
    Promise.all([
      reviewService.getAll(),
      catalogService.getAll("jogos"),
      catalogService.getAll("media"),
      catalogService.getAll("literatura"),
    ])
      .then(([allReviews, jogos, media, literatura]) => {
        const items = [...jogos, ...media, ...literatura];
        const mine = allReviews
          .filter((r) => r.userId === user.id)
          .map((r) => {
            const category = CATEGORY_BY_TIPO[r.tipo_alvo];
            const item = items.find((i) => i.category === category && i.id === r.alvo_id);
            return {
              id: r.id,
              titulo: r.titulo,
              comment: r.conteudo,
              score: r.pontuacao,
              category,
              itemId: r.alvo_id,
              itemName: item?.name || "Item removido",
            };
          });
        setReviews(mine);
      })
      .catch(() => setReviewsError("Não foi possível carregar as suas reviews."))
      .finally(() => setLoadingReviews(false));
  };

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

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

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Eliminar esta review?")) return;
    try {
      await reviewService.remove(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setReviewsError(err.response?.data?.message || "Não foi possível eliminar a review.");
    }
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

      {loadingReviews && <CircularProgress size={24} />}
      {reviewsError && <Alert severity="error">{reviewsError}</Alert>}

      {!loadingReviews && !reviewsError && reviews.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Ainda não fez nenhuma review. Explore os catálogos de Jogos, Média e Literatura e partilhe a sua opinião.
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {reviews.map((r) => (
          <Paper key={r.id} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
              <Box>
                <Chip label={categoryLabel[r.category]} size="small" variant="outlined" color="primary" sx={{ mb: 0.5 }} />
                <Typography
                  component={Link}
                  to={`/product/${r.category}/${r.itemId}`}
                  sx={{ display: "block", fontWeight: 700, color: "text.primary", textDecoration: "none" }}
                >
                  {r.itemName}
                </Typography>
                <Rating value={r.score / 2} precision={0.5} readOnly size="small" sx={{ my: 0.5 }} />
                {r.titulo && (
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {r.titulo}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {r.comment}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => handleDeleteReview(r.id)}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
