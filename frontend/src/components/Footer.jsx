import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        py: 3,
        px: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        Oblivion, Programação III —{" "}
        <a href="https://ismt.pt/" target="_blank" rel="noopener noreferrer">
          {" "}
          ISMT,
        </a>
        <a
          href="https://multimedia.ismt.pt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Multimédia{" "}
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
