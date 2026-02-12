import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setToken }) {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { login, password }
      );

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      navigate("/app");
    } catch (err) {
      setError("Invalid email/username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="overlay">
          <h1>Code Assista Welcomes You...</h1>
          <p>
            CodeAssista helps students and developers generate, debug and
            translate code efficiently using AI.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-box">
          <h2>Sign in</h2>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email Address / Username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in now"}
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account?
            <span onClick={() => navigate("/signup")}> Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
