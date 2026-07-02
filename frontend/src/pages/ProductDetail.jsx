import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Chip,
  Rating,
  TextField,
  Button,
  Avatar,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import catalogService, { TIPO_ALVO } from "../services/catalog.service";
import reviewService from "../services/review.service";
import { useAuth } from "../contexts/AuthContext";

const categoryLabel = {
  jogos: "Jogo",
  media: "Média",
  literatura: "Literatura",
};

export default function ProductDetail() {
  const { category, id } = useParams();
  const { isAuthenticated } = useAuth();

  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [newScore, setNewScore] = useState(8);
  const [newComment, setNewComment] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const tipo = TIPO_ALVO[category];

  const loadReviews = () => reviewService.getByAlvo(tipo, id).then(setReviews);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    Promise.all([
      catalogService.getById(category, id),
      reviewService.getByAlvo(tipo, id),
    ])
      .then(([itemData, reviewsData]) => {
        setItem(itemData);
        setReviews(reviewsData);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [category, id, tipo]);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (notFound || !item) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Produto não encontrado
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
        >
          Voltar à Home
        </Button>
      </Container>
    );
  }

  const score = reviews.length
    ? reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length
    : 0;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !newComment.trim()) return;

    setFormError("");
    setSubmitting(true);
    try {
      await reviewService.create({
        titulo: titulo.trim(),
        conteudo: newComment.trim(),
        pontuacao: newScore,
        tipo_alvo: tipo,
        alvo_id: Number(id),
      });
      await loadReviews();
      setTitulo("");
      setNewComment("");
      setSent(true);
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Não foi possível publicar a review.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Cabeçalho do produto */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mb: 6,
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{
            width: { xs: "100%", md: 320 },
            borderRadius: 1,
            flexShrink: 0,
          }}
        />

        <Box>
          <Chip
            label={categoryLabel[item.category]}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          <Typography variant="h3" sx={{ mb: 1 }}>
            {item.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {item.author || "—"} · {item.year || "—"}
          </Typography>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              mb: 3,
            }}
          >
            <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
              {score.toFixed(1)}
            </Typography>
            <Typography variant="caption">/ 10</Typography>
          </Box>

          <Typography variant="body1" sx={{ maxWidth: 640 }}>
            {item.description}
          </Typography>
        </Box>
      </Box>

      {/* Reviews */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box sx={{ width: 4, height: 26, bgcolor: "primary.main" }} />
        <Typography variant="h4">Reviews ({reviews.length})</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 5 }}>
        {reviews.length === 0 && (
          <Typography color="text.secondary">
            Ainda não há reviews para este item.
          </Typography>
        )}

        {reviews.map((r) => (
          <Paper key={r.id} sx={{ p: 2, display: "flex", gap: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {r.author.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>{r.author}</Typography>
                <Rating
                  value={r.score / 2}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </Box>
              {r.titulo && (
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {r.titulo}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {r.comment}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Formulário de nova review */}
      {isAuthenticated ? (
        <Paper
          sx={{ p: 3, maxWidth: 500 }}
          component="form"
          onSubmit={handleSubmitReview}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Deixar uma review
          </Typography>

          {sent && (
            <Alert
              severity="success"
              sx={{ mb: 2 }}
              onClose={() => setSent(false)}
            >
              Review publicada com sucesso.
            </Alert>
          )}
          {formError && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              onClose={() => setFormError("")}
            >
              {formError}
            </Alert>
          )}

          <TextField
            label="Título"
            fullWidth
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Nota
          </Typography>
          <Rating
            value={newScore / 2}
            precision={0.5}
            onChange={(e, value) => setNewScore(Math.round((value || 0) * 2))}
            sx={{ mb: 2 }}
          />

          <TextField
            label="O seu comentário"
            fullWidth
            multiline
            minRows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? "A publicar..." : "Publicar review"}
          </Button>
        </Paper>
      ) : (
        <Alert severity="info" sx={{ maxWidth: 500 }}>
          <Link to="/login" style={{ color: "inherit", fontWeight: 700 }}>
            Inicie sessão
          </Link>{" "}
          para deixar uma review.
        </Alert>
      )}
    </Container>
  );
}
