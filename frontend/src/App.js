import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CodeAssistant from "./pages/CodeAssistant";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Login Page */}
      <Route path="/login" element={<Login setToken={setToken} />} />

      {/* Signup Page */}
      <Route path="/signup" element={<Signup />} />

      {/* Protected Main App */}
      <Route
        path="/app"
        element={token ? <CodeAssistant /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
