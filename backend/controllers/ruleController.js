// backend/controllers/ruleController.js
const Rule = require("../models/rule");
const { parseRuleString, evaluateAST } = require("../services/ruleService");

let lastRuleId = 0; // In-memory counter for ruleId

exports.createRule = async (req, res) => {
  try {
    const { ruleString } = req.body;
    const ast = parseRuleString(ruleString);

    // Increment the last used ruleId
    lastRuleId++;

    const newRule = new Rule({ ruleId: lastRuleId, ruleString, ast });
    await newRule.save();

    res.status(201).json(newRule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.evaluateRule = async (req, res) => {
  try {
    const { ruleId, data } = req.body;
    const rule = await Rule.findOne({ ruleId }); // Change this to search by ruleId
    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }
    const result = evaluateAST(rule.ast, data);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
