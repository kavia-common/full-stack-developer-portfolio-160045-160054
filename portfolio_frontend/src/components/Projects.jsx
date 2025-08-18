import React from "react";
import Section from "./Section";
import { useFetch } from "../hooks/useFetch";
import { getProjects } from "../services/api";

/**
 * PUBLIC_INTERFACE
 * Projects - Featured project cards
 */
export default function Projects({ id = "projects", className = "" }) {
  const { data: projects = [], loading, error } = useFetch(getProjects, []);

  return (
    <Section
      id={id}
      title="Project Highlights"
      subtitle="Selected projects demonstrating problem solving, scalability, and UX."
      className={className}
    >
      {loading && <div className="card">Loading projects…</div>}
      {error && <div className="card" role="alert">Unable to load projects.</div>}
      {!loading && !error && (
        projects.length > 0 ? (
          <div className="grid projects">
            {projects.map((p, idx) => (
              <div key={`${p.name}-${idx}`} className="card project">
                <h4>{p.name}</h4>
                <div className="desc">{p.summary}</div>
                <div className="meta">
                  {(p.tech || []).map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="links">
                  {p.links?.github && (
                    <a className="link" href={p.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                  )}
                  {p.links?.demo && (
                    <a className="link" href={p.links.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>
                  )}
                </div>
                {Array.isArray(p.highlights) && p.highlights.length > 0 && (
                  <ul>
                    {p.highlights.map((h, i) => <li key={i} className="desc">{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card" role="status">No projects to display yet.</div>
        )
      )}
    </Section>
  );
}
