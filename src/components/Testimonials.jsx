import React from "react";

export default function Testimonials() {
  const testimonials = [
    { quote: "They planned around our actual daily routine, not just how the room looked in photos.", who: "Residential client, Bengaluru" },
    { quote: "The 3D walkthrough caught a layout issue before we'd spent a rupee on it.", who: "Studio owner, Indiranagar" },
    { quote: "Clear pricing, no surprise costs mid-project. That mattered more than the design itself.", who: "Office client, HSR Layout" },
  ];

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <span className="num">06</span>
        <h2>Client feedback</h2>
        <span className="rule"></span>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial">
            <p>"{t.quote}"</p>
            <div className="who">— {t.who}</div>
          </div>
        ))}
      </div>
    </section>
  );
}