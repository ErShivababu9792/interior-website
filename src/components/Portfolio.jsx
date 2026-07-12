import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const STORAGE_KEY = "shiva_projects";
const INITIAL_COUNT = 4;

const defaultProjects = [
  { id: "d1", title: "Aranya Residence", category: "Residential — Living & Dining", dims: "840 sq.ft", color: "#D9CBAE", images: [], description: "A full home makeover focused on natural light and open-plan living for a family of four." },
  { id: "d2", title: "Studio Loft 4B", category: "Residential — Compact Living", dims: "560 sq.ft", color: "#B7C4B0", images: [], description: "Smart storage and multi-purpose furniture for a compact single-occupant loft." },
  { id: "d3", title: "Kavya's Kitchen", category: "Residential — Kitchen Remodel", dims: "210 sq.ft", color: "#C9B7A8", images: [], description: "A galley kitchen remodel with better workflow between the stove, sink, and storage." },
  { id: "d4", title: "Northgate Co-work", category: "Commercial — Workspace", dims: "1,240 sq.ft", color: "#AEBAC6", images: [], description: "An open co-working space balancing focus zones with informal meeting areas." },
];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setProjects(saved ? JSON.parse(saved) : defaultProjects);
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <section id="work" className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <span className="num">04</span>
        <h2>Selected work</h2>
        <span className="rule"></span>
      </div>

      {projects.length === 0 ? (
        <div className="empty-note">No projects added yet.</div>
      ) : (
        <>
          <div className="work-grid">
            {visibleProjects.map((p) => {
              const cover = p.images && p.images.length > 0 ? p.images[0] : null;
              return (
                <Link key={p.id} to={`/project/${p.id}`} className="work-card-link">
                  <div className="work-card">
                    <div
                      className="plate"
                      style={
                        cover
                          ? { backgroundImage: `url('${cover}')`, backgroundSize: "cover", backgroundPosition: "center" }
                          : { background: p.color || "#C9B7A8" }
                      }
                    ></div>
                    <div className="work-meta">
                      <h3>{p.title}</h3>
                      <span className="dims">{p.dims}</span>
                    </div>
                    <span className="cat">{p.category}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {hasMore && (
            <div className="see-more-wrap">
              <button className="see-more-btn" onClick={() => setShowAll(!showAll)}>
                {showAll ? (
                  <>See less <ChevronUp size={16} /></>
                ) : (
                  <>See more ({projects.length - INITIAL_COUNT} more) <ChevronDown size={16} /></>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}