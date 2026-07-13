import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const INITIAL_COUNT = 4;
const API_URL = "https://shiva-design-backend.onrender.com/api/projects";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
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

      {loading ? (
        <div className="empty-note">Loading projects...</div>
      ) : projects.length === 0 ? (
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
                          : { background: "#C9B7A8" }
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