// frontend/src/components/RuleForm.jsx
import React, { useState } from "react";
import axios from "axios";

const RuleForm = () => {
  const [ruleString, setRuleString] = useState("");
  const [evaluationData, setEvaluationData] = useState({});
  const [result, setResult] = useState(null);

  const handleCreateRule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/rules", { ruleString });
      alert("Rule created: " + response.data.ruleId);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const handleEvaluateRule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/rules/evaluate", {
        ruleId: evaluationData.ruleId,
        data: evaluationData,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error evaluating rule:", error);
    }
  };

  return (
    <div>
      <h1>Rule Engine Application</h1>
      <form onSubmit={handleCreateRule}>
        <input
          type="text"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Enter rule"
        />
        <button type="submit">Create Rule</button>
      </form>
      <form onSubmit={handleEvaluateRule}>
        <input
          type="number"
          placeholder="Rule ID"
          onChange={(e) =>
            setEvaluationData({
              ...evaluationData,
              ruleId: parseInt(e.target.value),
            })
          }
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) =>
            setEvaluationData({
              ...evaluationData,
              age: parseInt(e.target.value),
            })
          }
        />
        <input
          type="text"
          placeholder="Department"
          onChange={(e) =>
            setEvaluationData({ ...evaluationData, department: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Salary"
          onChange={(e) =>
            setEvaluationData({
              ...evaluationData,
              salary: parseInt(e.target.value),
            })
          }
        />
        <input
          type="number"
          placeholder="Experience"
          onChange={(e) =>
            setEvaluationData({
              ...evaluationData,
              experience: parseInt(e.target.value),
            })
          }
        />
        <button type="submit">Evaluate Rule</button>
      </form>
      {result !== null && (
        <p>Evaluation Result: {result ? "Eligible" : "Not Eligible"}</p>
      )}
    </div>
  );
};

export default RuleForm;
