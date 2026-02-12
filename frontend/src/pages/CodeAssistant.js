import { useState } from "react";
import api from "../api/axios";
import "./CodeAssistant.css";

function CodeAssistant() {
  const [mode, setMode] = useState("generate"); // NEW
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateCode = async () => {
    setError("");
    setResult("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first");
      return;
    }

    if (!prompt.trim()) {
      setError(
        mode === "generate"
          ? "Please enter a prompt"
          : "Please paste code to debug"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/api/ai/generate",
        { prompt, mode }, // 👈 IMPORTANT
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data.output);
    } catch (err) {
      setError("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-container">
      <div className="assistant-card">
        <h2>
          {mode === "generate"
            ? "💡 AI Code Generator"
            : "🐞 AI Code Debugger"}
        </h2>

        {/* MODE SWITCH */}
        <div className="mode-switch">
          <button
            className={mode === "generate" ? "active-btn" : "inactive-btn"}
            onClick={() => {
              setMode("generate");
              setPrompt("");
              setResult("");
            }}
          >
            Code Generation
          </button>

          <button
            className={mode === "debug" ? "active-btn" : "inactive-btn"}
            onClick={() => {
              setMode("debug");
              setPrompt("");
              setResult("");
            }}
          >
            Code Debugging
          </button>
        </div>

        <textarea
          placeholder={
            mode === "generate"
              ? "Describe the code you want to generate..."
              : "Paste your code here to debug..."
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={mode === "generate" ? 4 : 8}
        />

        <button
          className="generate-btn"
          onClick={generateCode}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : mode === "generate"
            ? "Generate Code"
            : "Debug Code"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {result && (
          <div className="output-box">
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeAssistant;
