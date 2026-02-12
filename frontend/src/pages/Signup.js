import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";   // ✅ ADD THIS

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/signup", form);
      alert(res.data.message);

      // ✅ Redirect to Home (Login)
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-btn">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
