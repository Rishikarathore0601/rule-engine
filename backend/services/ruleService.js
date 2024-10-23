// backend/services/ruleService.js
function parseRuleString(ruleString) {
  // A simplified parser for demonstration purposes
  const exampleAST = {
    type: "operator",
    value: "AND",
    left: {
      type: "operator",
      value: "OR",
      left: { type: "operand", value: "age > 30" },
      right: { type: "operand", value: "department = 'Sales'" },
    },
    right: { type: "operand", value: "salary > 50000" },
  };
  // In a real implementation, parsing the rule string to build the AST should be done here.
  return exampleAST;
}

function evaluateAST(ast, data) {
  if (ast.type === "operand") {
    // Evaluate simple condition (e.g., "age > 30")
    const [field, operator, value] = ast.value.split(" ");
    const fieldValue = data[field];
    switch (operator) {
      case ">":
        return fieldValue > parseFloat(value);
      case "<":
        return fieldValue < parseFloat(value);
      case "=":
        return fieldValue === value.replace(/'/g, "");
      default:
        return false;
    }
  } else if (ast.type === "operator") {
    // Recursively evaluate left and right children based on the operator
    const leftEval = evaluateAST(ast.left, data);
    const rightEval = evaluateAST(ast.right, data);
    if (ast.value === "AND") {
      return leftEval && rightEval;
    } else if (ast.value === "OR") {
      return leftEval || rightEval;
    }
  }
  return false;
}

module.exports = { parseRuleString, evaluateAST };
