import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, CircularProgress, Alert } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/mockData";
import catalogService, { attachScores } from "../services/catalog.service";
import reviewService from "../services/review.service";

export default function Home() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      catalogService.getAll("jogos"),
      catalogService.getAll("media"),
      catalogService.getAll("literatura"),
      reviewService.getAll(),
    ])
      .then(([jogos, media, literatura, reviews]) => {
        const all = [
          ...attachScores(jogos, reviews, "jogo"),
          ...attachScores(media, reviews, "midia"),
          ...attachScores(literatura, reviews, "literatura"),
        ];
        setHighlights([...all].sort((a, b) => b.score - a.score).slice(0, 6));
      })
      .catch(() => setError("Não foi possível carregar os destaques."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Typography
            variant="h2"
            sx={{ maxWidth: 700, mb: 2, fontSize: { xs: "2.4rem", md: "3.4rem" } }}
          >
            Críticas honestas do universo gamer
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mb: 4 }}>
            Jogos, séries, filmes e livros ligados ao mundo dos videojogos, avaliados e comentados
            pela comunidade.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {categories.map((c) => (
              <Button key={c.slug} component={Link} to={`/${c.slug}`} variant="outlined" color="primary">
                {c.label}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Destaques */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Box sx={{ width: 4, height: 26, bgcolor: "primary.main" }} />
          <Typography variant="h4">Destaques</Typography>
        </Box>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "repeat(4, 1fr)" },
              gap: 3,
            }}
          >
            {highlights.map((item) => (
              <ProductCard key={`${item.category}-${item.id}`} item={item} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
