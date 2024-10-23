// backend/models/rule.js
const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  left: { type: mongoose.Schema.Types.Mixed, default: null },
  right: { type: mongoose.Schema.Types.Mixed, default: null },
  value: { type: mongoose.Schema.Types.Mixed, default: null },
});

// Change ruleId to be a simple natural number
const RuleSchema = new mongoose.Schema({
  ruleId: { type: Number, required: true, unique: true },
  ruleString: { type: String, required: true },
  ast: { type: NodeSchema, required: true },
});

module.exports = mongoose.model("Rule", RuleSchema);
