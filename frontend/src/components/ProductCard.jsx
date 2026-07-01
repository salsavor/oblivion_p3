import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Box, Typography, Chip } from "@mui/material";

const categoryLabel = {
  jogos: "Jogo",
  media: "Média",
  literatura: "Literatura",
};

// Card usado nas grelhas (Home, JogosHome, MediaHome, LiteratureHome).
// Recebe um único "item" do mockData.js e mostra a capa, categoria,
// nome, autor/estúdio e a nota em forma de selo.
export default function ProductCard({ item }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": { borderColor: "primary.main", transform: "translateY(-4px)" },
      }}
    >
      <CardActionArea component={Link} to={`/product/${item.id}`} sx={{ flexGrow: 1, alignItems: "stretch" }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia component="img" image={item.image} alt={item.name} sx={{ height: 260, objectFit: "cover" }} />

          {/* Selo com a nota, no canto superior direito da capa */}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              px: 1,
              py: 0.4,
              borderRadius: 1,
              fontWeight: 700,
              fontSize: 14,
              lineHeight: 1,
            }}
          >
            {item.score.toFixed(1)}
          </Box>
        </Box>

        <CardContent>
          <Chip label={categoryLabel[item.category]} size="small" variant="outlined" color="primary" sx={{ mb: 1 }} />
          <Typography variant="h6" component="h3" noWrap>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {item.author} · {item.year}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
