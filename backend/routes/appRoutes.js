const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");

// Route to handle form submission and generate React app
router.post("/generateapp", appController.generateReactApp);

module.exports = router;
