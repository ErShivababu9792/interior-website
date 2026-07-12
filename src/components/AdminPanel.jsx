import React, { useState, useEffect } from "react";
import { Lock, Trash2, LogOut, X, Mail } from "lucide-react";
import LoginForm from "./LoginForm";
import ForgotPassword from "./ForgotPassword";

const SESSION_KEY = "shiva_admin_session";
const PROJECTS_API = "https://shiva-design-backend.onrender.com";
const LOGIN_URL = "https://shiva-design-backend.onrender.com";
const TESTIMONIALS_API = "https://shiva-design-backend.onrender.com";
const CONTACT_API = "https://shiva-design-backend.onrender.com";

export default function AdminPanel() {
  const [view, setView] = useState("login");
  const [activeTab, setActiveTab] = useState("projects");

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", dims: "", description: "", images: [] });
  const [status, setStatus] = useState("");

  const [testimonials, setTestimonials] = useState([]);
  const [tForm, setTForm] = useState({ quote: "", who: "" });
  const [tStatus, setTStatus] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === "active") {
      setView("panel");
      loadProjects();
      loadTestimonials();
      loadMessages();
    }
  }, []);

  function loadProjects() {
    fetch(PROJECTS_API)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }

  function loadTestimonials() {
    fetch(TESTIMONIALS_API)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
  }

  function loadMessages() {
    fetch(CONTACT_API)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  }

  async function handleLogin(email, password) {
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.error || "Login failed." };

      sessionStorage.setItem(SESSION_KEY, "active");
      setView("panel");
      loadProjects();
      loadTestimonials();
      loadMessages();
      return { success: true };
    } catch (err) {
      return { success: false, message: "Could not reach server. Is Flask running?" };
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setView("login");
  }

  function compressImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 900;
          const scale = Math.min(1, MAX_WIDTH / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.6));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function handleMultipleFiles(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setStatus("Processing photos...");
    Promise.all(files.map((file) => compressImage(file))).then((compressedUrls) => {
      setForm((prev) => ({ ...prev, images: [...prev.images, ...compressedUrls] }));
      setStatus("");
    });
  }

  function removeImage(index) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  }

  function addProject() {
    if (!form.title.trim() || !form.category.trim()) {
      setStatus("Please add at least a title and category.");
      return;
    }
    setStatus("Saving...");
    fetch(PROJECTS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title.trim(),
        category: form.category.trim(),
        dims: form.dims.trim() || "—",
        description: form.description.trim(),
        images: form.images,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save");
        return res.json();
      })
      .then(() => {
        setForm({ title: "", category: "", dims: "", description: "", images: [] });
        setStatus("Project added.");
        loadProjects();
      })
      .catch(() => setStatus("Could not save — please try again."));
  }

  function deleteProject(id) {
    fetch(`${PROJECTS_API}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        loadProjects();
      })
      .catch((err) => console.error(err));
  }

  function addTestimonial() {
    if (!tForm.quote.trim() || !tForm.who.trim()) {
      setTStatus("Please add both a quote and a name.");
      return;
    }
    setTStatus("Saving...");
    fetch(TESTIMONIALS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote: tForm.quote.trim(), who: tForm.who.trim() }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save");
        return res.json();
      })
      .then(() => {
        setTForm({ quote: "", who: "" });
        setTStatus("Testimonial added.");
        loadTestimonials();
      })
      .catch(() => setTStatus("Could not save — please try again."));
  }

  function deleteTestimonial(id) {
    fetch(`${TESTIMONIALS_API}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        loadTestimonials();
      })
      .catch((err) => console.error(err));
  }

  return (
    <section id="admin" className="section admin-section">
      <div className="section-head">
        <span className="num">07</span>
        <h2>Admin — manage portfolio</h2>
        <span className="rule"></span>
      </div>

      <div className="admin-note">
        <Lock size={16} />
        <span>Login is verified by the Flask backend, with the password securely hashed in the database.</span>
      </div>

      {view === "login" && <LoginForm onLogin={handleLogin} onForgotClick={() => setView("forgot")} />}
      {view === "forgot" && <ForgotPassword onBackToLogin={() => setView("login")} />}

      {view === "panel" && (
        <div>
          <div className="admin-tabs">
            <button className={activeTab === "projects" ? "tab-active" : ""} onClick={() => setActiveTab("projects")}>Projects</button>
            <button className={activeTab === "testimonials" ? "tab-active" : ""} onClick={() => setActiveTab("testimonials")}>Testimonials</button>
            <button className={activeTab === "messages" ? "tab-active" : ""} onClick={() => setActiveTab("messages")}>
              <Mail size={13} /> Messages {messages.length > 0 && `(${messages.length})`}
            </button>
          </div>

          {activeTab === "projects" && (
            <div>
              <div className="admin-form">
                <label>Project title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Aranya Residence" />

                <div className="row-2">
                  <div>
                    <label>Category</label>
                    <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Residential — Living Room" />
                  </div>
                  <div>
                    <label>Size</label>
                    <input type="text" value={form.dims} onChange={(e) => setForm({ ...form, dims: e.target.value })} placeholder="e.g. 840 sq.ft" />
                  </div>
                </div>

                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="A short description of the project"
                  style={{ width: "100%", border: "1px solid rgba(38,35,32,0.2)", borderRadius: 2, padding: "11px 12px", fontFamily: "'Work Sans', sans-serif", fontSize: "0.95rem", marginBottom: 20, minHeight: 70, resize: "vertical" }}
                />

                <label>Upload photos (select multiple)</label>
                <input type="file" accept="image/*" multiple onChange={handleMultipleFiles} style={{ marginBottom: 16 }} />

                {form.images.length > 0 && (
                  <div className="image-preview-grid">
                    {form.images.map((img, i) => (
                      <div key={i} className="image-preview-item">
                        <img src={img} alt={`preview ${i}`} />
                        <button type="button" onClick={() => removeImage(i)}><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                )}

                <button className="btn-primary" onClick={addProject}>Add project</button>
                <div className="save-status">{status}</div>
              </div>

              <div className="manage-list">
                {projects.map((p) => (
                  <div key={p.id} className="manage-item">
                    <div>
                      <h4>{p.title}</h4>
                      <span>{p.category} · {p.dims} · {(p.images || []).length} photo(s)</span>
                    </div>
                    <button className="btn-del" onClick={() => deleteProject(p.id)}><Trash2 size={13} /> Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div>
              <div className="admin-form">
                <label>Client quote</label>
                <textarea
                  value={tForm.quote}
                  onChange={(e) => setTForm({ ...tForm, quote: e.target.value })}
                  placeholder="What did the client say about the project?"
                  style={{ width: "100%", border: "1px solid rgba(38,35,32,0.2)", borderRadius: 2, padding: "11px 12px", fontFamily: "'Work Sans', sans-serif", fontSize: "0.95rem", marginBottom: 20, minHeight: 70, resize: "vertical" }}
                />
                <label>Client name / description</label>
                <input
                  type="text"
                  value={tForm.who}
                  onChange={(e) => setTForm({ ...tForm, who: e.target.value })}
                  placeholder="e.g. Residential client, Bengaluru"
                />
                <button className="btn-primary" onClick={addTestimonial}>Add testimonial</button>
                <div className="save-status">{tStatus}</div>
              </div>

              <div className="manage-list">
                {testimonials.map((t) => (
                  <div key={t.id} className="manage-item">
                    <div>
                      <h4 style={{ fontStyle: "italic", fontSize: "0.95rem" }}>"{t.quote}"</h4>
                      <span>— {t.who}</span>
                    </div>
                    <button className="btn-del" onClick={() => deleteTestimonial(t.id)}><Trash2 size={13} /> Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="manage-list">
              {messages.length === 0 ? (
                <div className="manage-item"><span>No messages yet.</span></div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="manage-item" style={{ alignItems: "flex-start", flexDirection: "column", gap: 6 }}>
                    <h4>{m.name} <span style={{ fontWeight: 400, fontSize: "0.75rem", color: "#5C574E" }}>({m.email})</span></h4>
                    <span style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.9rem", color: "#262320" }}>{m.message}</span>
                  </div>
                ))
              )}
            </div>
          )}

          <button className="btn-ghost" onClick={handleLogout}><LogOut size={14} /> Log out</button>
        </div>
      )}
    </section>
  );
}