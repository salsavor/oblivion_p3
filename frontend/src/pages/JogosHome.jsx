import { Box, Container, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { products } from "../data/mockData";

export default function JogosHome() {
  const items = products.filter((p) => p.category === "jogos");

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
        <Box sx={{ width: 4, height: 26, bgcolor: "primary.main" }} />
        <Typography variant="h4">Jogos</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {items.length} jogos avaliados pela comunidade.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "repeat(4, 1fr)" },
          gap: 3,
        }}
      >
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </Box>
    </Container>
  );
}
