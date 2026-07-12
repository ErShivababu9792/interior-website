import React, { useState } from "react";

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // NOTE: Abhi ye sirf simulate ho raha hai.
    // Jab Flask backend banega, yahan real API call hogi jo actual email bhejegi
    // reset link ke saath. Abhi ke liye ye sirf UI/flow dikhata hai.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="login-box">
        <p className="reset-sent-msg">
          If an account exists for <strong>{email}</strong>, password reset instructions
          have been sent. (Note: real email sending needs backend — abhi ye sirf demo hai.)
        </p>
        <button className="btn-ghost" onClick={onBackToLogin}>Back to login</button>
      </div>
    );
  }

  return (
    <form className="login-box" onSubmit={handleSubmit}>
      <p className="forgot-desc">Enter your admin email and we'll send reset instructions.</p>
      <div className="field">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@shivadesignstudio.in"
        />
        <span className="err">{error}</span>
      </div>
      <button type="submit" className="btn-primary">Send reset link</button>
      <button type="button" className="link-btn" onClick={onBackToLogin}>
        Back to login
      </button>
    </form>
  );
}