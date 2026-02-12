import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* HEADER */}
      <header className="navbar">
        <h2 className="logo">
          Code<span>Assista</span>
        </h2>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>
          AI-Powered Code Generation, <br />
          Debugging & Translation
        </h1>
        <p>
          CodeAssista is a smart AI-based platform that helps students and
          developers generate code, debug errors, and translate code between
          programming languages efficiently.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate("/login")}>
            Get Started
          </button>
          <button className="secondary-btn" onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Core Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Code Generation</h3>
            <p>
              Generate accurate and optimized code from natural language prompts
              using AI.
            </p>
          </div>

          <div className="feature-card">
            <h3>Code Debugging</h3>
            <p>
              Identify errors in code and receive clear explanations with
              corrected output.
            </p>
          </div>

          <div className="feature-card">
            <h3>Code Translation</h3>
            <p>
              Translate code between programming languages quickly and reliably.
            </p>
          </div>

          <div className="feature-card">
            <h3>Secure Authentication</h3>
            <p>
              JWT-based authentication ensures secure and role-based access to
              features.
            </p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK */}
      <section className="tech">
        <h2>Technology Stack</h2>
        <p>
          Built using MERN Stack with Generative AI integration for real-time
          intelligent assistance.
        </p>

        <div className="tech-list">
          <span>React.js</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>MongoDB</span>
          <span>JWT</span>
          <span>Google Gemini AI</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          © 2026 CodeAssista | AI Tool for Code Generation, Debugging &
          Translation
        </p>
      </footer>
    </div>
  );
}

export default Home;
