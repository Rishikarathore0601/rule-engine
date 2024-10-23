// backend/routes/ruleRoutes.js
const express = require("express");
const { createRule, evaluateRule } = require("../controllers/ruleController");
const router = express.Router();

router.post("/api/rules", createRule);
router.post("/api/rules/evaluate", evaluateRule);

module.exports = router;
