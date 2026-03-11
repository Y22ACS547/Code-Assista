import { useState } from "react";
import api from "../api/axios";
import "./CodeAssistant.css";

function CodeAssistant() {

  const [mode, setMode] = useState("generate");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Python");

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
          : mode === "debug"
          ? "Please paste code to debug"
          : "Please paste code to convert"
      );
      return;
    }

    try {

      setLoading(true);

      const res = await api.post(
        "/api/ai/generate",
        { prompt, mode, targetLanguage },
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
            : mode === "debug"
            ? "🐞 AI Code Debugger"
            : "🔄 AI Code Converter"}
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

          <button
            className={mode === "convert" ? "active-btn" : "inactive-btn"}
            onClick={() => {
              setMode("convert");
              setPrompt("");
              setResult("");
            }}
          >
            Code Converter
          </button>

        </div>

        {/* INPUT BOX */}
        <textarea
          placeholder={
            mode === "generate"
              ? "Describe the code you want to generate..."
              : mode === "debug"
              ? "Paste your code here to debug..."
              : "Paste your code here to convert..."
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={mode === "generate" ? 4 : 8}
        />

        {/* LANGUAGE SELECTOR (ONLY FOR CONVERTER) */}
        {mode === "convert" && (
          <select
            className="language-select"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option>Python</option>
            <option>Java</option>
            <option>JavaScript</option>
            <option>C</option>
            <option>C++</option>
          </select>
        )}

        {/* BUTTON */}
        <button
          className="generate-btn"
          onClick={generateCode}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : mode === "generate"
            ? "Generate Code"
            : mode === "debug"
            ? "Debug Code"
            : "Convert Code"}
        </button>

        {/* ERROR MESSAGE */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* OUTPUT */}
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