import React, { useState, useEffect } from "react";

const API_URL = "https://shiva-design-backend.onrender.com/api/testimonials";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Failed to load testimonials:", err));
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <span className="num">06</span>
        <h2>Client feedback</h2>
        <span className="rule"></span>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((t) => (
          <div key={t.id} className="testimonial">
            <p>"{t.quote}"</p>
            <div className="who">— {t.who}</div>
          </div>
        ))}
      </div>
    </section>
  );
}