import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/mockData";

// Top 6 itens com melhor nota, de todas as categorias, para a secção de destaques.
const highlights = [...products].sort((a, b) => b.score - a.score).slice(0, 6);

export default function Home() {
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "repeat(4, 1fr)" },
            gap: 3,
          }}
        >
          {highlights.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
