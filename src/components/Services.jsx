import React from "react";

export default function Services() {
  const services = [
    { idx: "A", title: "Residential Design", body: "Full home interiors — living rooms, bedrooms, kitchens, planned around how your household actually moves." },
    { idx: "B", title: "Commercial Design", body: "Offices, retail, and small studios designed for function first, character second." },
    { idx: "C", title: "Space Planning", body: "Layout and furniture planning for the square footage you already have." },
    { idx: "D", title: "3D Visualization", body: "See the room rendered before anything is built, so changes happen on screen, not on site." },
    { idx: "E", title: "Material & Furniture", body: "Sourcing finishes, fixtures, and furniture that match the brief and the budget." },
    { idx: "F", title: "Turnkey Execution", body: "End-to-end delivery — design, procurement, and on-site execution under one team." },
  ];

  return (
    <section id="services" className="section">
      <div className="section-head">
        <span className="num">02</span>
        <h2>What we do</h2>
        <span className="rule"></span>
      </div>

      <div className="services-grid">
        {services.map((s) => (
          <div key={s.idx} className="service-card">
            <span className="service-idx">{s.idx}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}