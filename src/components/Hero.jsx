import React from "react";

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-grid-bg"></div>

      <svg className="floorplan" viewBox="0 0 600 340">
        <g fill="none" stroke="#8FC1DE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path className="draw" style={{ "--len": 1900, animationDelay: "0.1s" }} d="M40,30 H560 V310 H40 Z" />
          <path className="draw" style={{ "--len": 400, animationDelay: "0.9s" }} d="M300,30 V150" />
          <path className="draw" style={{ "--len": 400, animationDelay: "1.05s" }} d="M300,190 V310" />
          <path className="draw" style={{ "--len": 260, animationDelay: "1.2s" }} d="M40,190 H220" />
          <path className="draw" style={{ "--len": 260, animationDelay: "1.25s" }} d="M260,190 H560" />
        </g>
      </svg>

      <div className="eyebrow">Residential &amp; Commercial Interiors</div>
      <h1>
        Spaces planned <em>properly,</em>
        <br />built to last.
      </h1>
      <p className="tag">
        Shiva Design Studio designs and executes homes and workspaces — from the first measurement to the final handover.
      </p>
    </header>
  );
}