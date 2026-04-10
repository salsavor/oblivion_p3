const jwt = require("jsonwebtoken");
const config = require("./config/config.js");

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Token nao fornecido." });
  }

  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ success: false, message: "Token invalido ou expirado." });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = { checkToken };
