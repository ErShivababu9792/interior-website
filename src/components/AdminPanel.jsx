import React, { useState, useEffect } from "react";
import { Lock, Trash2, LogOut, X } from "lucide-react";
import LoginForm from "./LoginForm";
import ForgotPassword from "./ForgotPassword";

const ADMIN_EMAIL = "admin@shivadesignstudio.in";
const ADMIN_PASSWORD = "shiva2026";

const SESSION_KEY = "shiva_admin_session";
const STORAGE_KEY = "shiva_projects";

const defaultProjects = [
  { id: "d1", title: "Aranya Residence", category: "Residential — Living & Dining", dims: "840 sq.ft", color: "#D9CBAE", images: [], description: "A full home makeover focused on natural light and open-plan living." },
  { id: "d2", title: "Studio Loft 4B", category: "Residential — Compact Living", dims: "560 sq.ft", color: "#B7C4B0", images: [], description: "Smart storage and multi-purpose furniture for a compact loft." },
  { id: "d3", title: "Kavya's Kitchen", category: "Residential — Kitchen Remodel", dims: "210 sq.ft", color: "#C9B7A8", images: [], description: "A galley kitchen remodel with better workflow." },
  { id: "d4", title: "Northgate Co-work", category: "Commercial — Workspace", dims: "1,240 sq.ft", color: "#AEBAC6", images: [], description: "An open co-working space balancing focus and collaboration." },
];

export default function AdminPanel() {
  const [view, setView] = useState("login");
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", dims: "", color: "#D9CBAE", description: "", images: [] });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === "active") {
      setView("panel");
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    setProjects(saved ? JSON.parse(saved) : defaultProjects);
  }, []);

  function handleLogin(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "active");
      setView("panel");
      return { success: true };
    }
    return { success: false, message: "Incorrect email or password." };
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setView("login");
  }

  function saveProjects(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      setProjects(list);
      return true;
    } catch (err) {
      setStatus("Storage is full — try deleting old projects or using fewer/smaller photos.");
      return false;
    }
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

          const compressed = canvas.toDataURL("image/jpeg", 0.6);
          resolve(compressed);
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
    const newProject = {
      id: "p" + Date.now(),
      title: form.title.trim(),
      category: form.category.trim(),
      dims: form.dims.trim() || "—",
      color: form.color,
      description: form.description.trim(),
      images: form.images,
    };

    const ok = saveProjects([newProject, ...projects]);
    if (ok) {
      setForm({ title: "", category: "", dims: "", color: "#D9CBAE", description: "", images: [] });
      setStatus("Project added.");
    }
  }

  function deleteProject(id) {
    saveProjects(projects.filter((p) => p.id !== id));
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
        <span>
          This is a simple demo login — not real security yet. Default: <strong>{ADMIN_EMAIL}</strong> / <strong>shiva2026</strong>.
        </span>
      </div>

      {view === "login" && (
        <LoginForm onLogin={handleLogin} onForgotClick={() => setView("forgot")} />
      )}

      {view === "forgot" && (
        <ForgotPassword onBackToLogin={() => setView("login")} />
      )}

      {view === "panel" && (
        <div>
          <div className="admin-form">
            <label>Project title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Aranya Residence"
            />

            <div className="row-2">
              <div>
                <label>Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Residential — Living Room"
                />
              </div>
              <div>
                <label>Size</label>
                <input
                  type="text"
                  value={form.dims}
                  onChange={(e) => setForm({ ...form, dims: e.target.value })}
                  placeholder="e.g. 840 sq.ft"
                />
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
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleFiles}
              style={{ marginBottom: 16 }}
            />

            {form.images.length > 0 && (
              <div className="image-preview-grid">
                {form.images.map((img, i) => (
                  <div key={i} className="image-preview-item">
                    <img src={img} alt={`preview ${i}`} />
                    <button type="button" onClick={() => removeImage(i)}>
                      <X size={14} />
                    </button>
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
                <button className="btn-del" onClick={() => deleteProject(p.id)}>
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            ))}
          </div>

          <button className="btn-ghost" onClick={handleLogout}>
            <LogOut size={14} /> Log out
          </button>
        </div>
      )}
    </section>
  );
}