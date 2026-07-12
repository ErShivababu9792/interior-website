import React, { useState } from "react";

export default function LoginForm({ onLogin, onForgotClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    const result = await onLogin(email.trim(), password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
    }
  }

  return (
    <form className="login-box" onSubmit={handleSubmit}>
      <div className="field">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@shivadesignstudio.in"
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <span className="err">{error}</span>
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Logging in..." : "Log in"}
      </button>
      <button type="button" className="link-btn" onClick={onForgotClick}>
        Forgot password?
      </button>
    </form>
  );
}