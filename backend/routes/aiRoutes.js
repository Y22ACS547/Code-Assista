const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash"
    });

    let finalPrompt = "";

    if (mode === "debug") {
      finalPrompt = `
You are an expert software developer.

TASK:
1. Analyze the following code.
2. Identify all errors and issues.
3. Explain each error clearly.
4. Provide a corrected version of the code.

CODE:
${prompt}
`;
    } else {
      finalPrompt = `
Generate clean, correct, and well-structured code for the following request:

${prompt}
`;
    }

    const result = await model.generateContent(finalPrompt);
    const response = result.response.text();

    res.json({ output: response });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ message: "AI generation failed" });
  }
});

module.exports = router;
