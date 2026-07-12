import React from "react";
import CountUp from "./CountUp";
import { LayoutGrid, PenTool, Box, Palette, Sofa, Lightbulb, Ruler, Users } from "lucide-react";

export default function About() {
  const skills = [
    { icon: LayoutGrid, label: "Space Planning" },
    { icon: PenTool, label: "2D Floor Plans" },
    { icon: Box, label: "3D Rendering" },
    { icon: Palette, label: "Material Selection" },
    { icon: Sofa, label: "Furniture Layout" },
    { icon: Lightbulb, label: "Lighting Design" },
    { icon: Ruler, label: "Site Measurement" },
    { icon: Users, label: "Client Walkthroughs" },
  ];

  const stats = [
    { end: 120, suffix: "+", label: "Projects Completed" },
    { end: 8, suffix: "", label: "Years of Practice" },
    { end: 40, suffix: "+", label: "Contractor Partners" },
    { end: 95, suffix: "%", label: "Client Referral Rate" },
  ];

  return (
    <section id="about" className="section">
      <div className="section-head">
        <span className="num">01</span>
        <h2>About the studio</h2>
        <span className="rule"></span>
      </div>

      <div className="about-wrap">
        <div>
          <p className="about-lead">
            Shiva Design Studio began as a two-person drafting table and grew into a full-service
            interior design practice — without losing the habit that started it all: measure first, decorate second.
          </p>
          <p>
            Every project starts with a measured plan — understanding how light and movement pass through a space
            before a single design decision is made. That discipline shapes everything after: the 3D visuals
            aren't decoration, they're a test of whether the layout actually works.
          </p>
          <p>
            We work directly with homeowners, businesses, and contractor teams — turning a room's constraints
            into a layout worth living in, then handing over drawings a contractor can actually build from.
          </p>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-box">
                <div className="stat-number">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="skills-heading">What we bring to the table</h3>
          <div className="skill-cards">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div key={skill.label} className="skill-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="skill-icon">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <span>{skill.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}