import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import catalogService, { attachScores } from "../services/catalog.service";
import reviewService from "../services/review.service";

export default function MediaHome() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([catalogService.getAll("media"), reviewService.getAll()])
      .then(([media, reviews]) =>
        setItems(attachScores(media, reviews, "midia")),
      )
      .catch(() => setError("Não foi possível carregar a média."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
        <Box sx={{ width: 4, height: 26, bgcolor: "primary.main" }} />
        <Typography variant="h4">Média</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Filmes e séries relacionados com o mundo dos videojogos.
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Container>
  );
}
