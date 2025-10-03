const { verifySignup } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  const controller = require("../controllers/auth.controller");
  const { authJwt, verifySignup } = require("../middlewares");
  const express = require("express");

  const router = express.Router();

  // Endpoint login
  router.post("/signin", controller.signin);

  // Debug endpoint untuk cek database
  router.get("/debug/check-database", controller.checkDatabase);

  module.exports = router;
}
