import React, { useState } from "react";

const CONTACT_API_URL = "https://shiva-design-backend.onrender.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please add your name.";
    if (!form.email.trim()) newErrors.email = "Please add an email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "That email looks incomplete.";
    if (!form.message.trim()) newErrors.message = "Tell us a little about the space.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSending(true);

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setSending(false);
      setServerError("Could not send message. Please try again.");
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="section-head contact-head">
        <span className="num">05</span>
        <h2>Get in touch</h2>
      </div>

      <p className="contact-sub">
        Tell us about your space and what you'd like to change. We'll reply within a couple of days.
      </p>

      <div className="contact-info">
        <div>
          Call
          <span>+91 98765 43210</span>
        </div>
        <div>
          Email
          <span>hello@shivadesignstudio.in</span>
        </div>
        <div>
          Studio
          <span>Bengaluru, India</span>
        </div>
      </div>

      <form className="reach-form" onSubmit={handleSubmit} noValidate>
        <div className="row-2">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
            <span className="err">{errors.name}</span>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
            <span className="err">{errors.email}</span>
          </div>
        </div>

        <div className="field">
          <label>Tell us about the space</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Room type, rough size, what you'd like to change..."
          ></textarea>
          <span className="err">{errors.message}</span>
        </div>

        <button type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send message"}
        </button>

        {serverError && <div className="err" style={{ marginTop: 10 }}>{serverError}</div>}

        {sent && (
          <div className="success-msg">
            <span className="dot"></span> Message ready — thanks, we'll reply soon.
          </div>
        )}
      </form>
    </section>
  );
}