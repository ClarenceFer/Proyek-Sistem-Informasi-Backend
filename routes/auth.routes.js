const { verifySignup } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  // Middleware CORS untuk mengizinkan frontend Vercel
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://www.sibaso.site"); // frontend domain
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

  // Endpoint login
  app.post("/api/auth/signin", controller.signin);

  // Debug endpoint untuk cek database
  app.get("/api/auth/debug/check-database", controller.checkDatabase);
};
