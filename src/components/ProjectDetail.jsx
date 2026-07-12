import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";

const STORAGE_KEY = "shiva_projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const projects = saved ? JSON.parse(saved) : [];
    const found = projects.find((p) => p.id === id);
    if (found) {
      setProject(found);
    } else {
      setNotFound(true);
    }
  }, [id]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (notFound) {
    return (
      <div className="detail-page">
        <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to home</Link>
        <div className="empty-note">Project not found.</div>
      </div>
    );
  }

  if (!project) {
    return <div className="detail-page"><div className="empty-note">Loading...</div></div>;
  }

  const images = project.images && project.images.length > 0 ? project.images : [];

  function showNext() {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  }

  function showPrev() {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <div className="detail-page">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to home</Link>

      <div className="detail-header">
        <span className="cat">{project.category}</span>
        <h1>{project.title}</h1>
        <span className="dims">{project.dims}</span>
        {project.description && <p className="detail-desc">{project.description}</p>}
      </div>

      {images.length === 0 ? (
        <div className="empty-note">No photos added for this project yet.</div>
      ) : (
        <div className="detail-gallery">
          {images.map((img, i) => (
            <div
              key={i}
              className="detail-photo"
              style={{ backgroundImage: `url('${img}')` }}
              onClick={() => setLightboxIndex(i)}
            ></div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>
            <X size={28} />
          </button>

          {images.length > 1 && (
            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <img
            src={images[lightboxIndex]}
            alt={`${project.title} ${lightboxIndex + 1}`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
            >
              <ChevronRight size={32} />
            </button>
          )}

          <div className="lightbox-counter">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}