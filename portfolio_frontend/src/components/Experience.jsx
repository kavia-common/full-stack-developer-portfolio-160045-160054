import React from "react";
import Section from "./Section";
import { useFetch } from "../hooks/useFetch";
import { getExperience } from "../services/api";

/**
 * PUBLIC_INTERFACE
 * Experience - Professional timeline with roles and achievements
 */
export default function Experience({ id = "experience", className = "" }) {
  const { data: items = [], loading, error } = useFetch(getExperience, []);

  return (
    <Section
      id={id}
      title="Experience Timeline"
      subtitle="Companies, roles, and projects I've contributed to."
      className={className}
    >
      {loading && <div className="card">Loading experience…</div>}
      {error && <div className="card" role="alert">Unable to load experience.</div>}
      {!loading && !error && (
        items.length > 0 ? (
          <div className="timeline">
            {items.map((it, idx) => (
              <div className="timeline-item" key={`${it.company}-${idx}`}>
                <h4 className="role">{it.role} <span style={{ color: "var(--accent)" }}>•</span> {it.period}</h4>
                <div className="company">
                  {it.company} {it.location ? `• ${it.location}` : ""}
                </div>
                {Array.isArray(it.tech) && it.tech.length > 0 && (
                  <div className="meta" style={{ marginBottom: 6 }}>
                    {it.tech.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                )}
                {Array.isArray(it.achievements) && it.achievements.length > 0 && (
                  <ul>
                    {it.achievements.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                )}
                {Array.isArray(it.projects) && it.projects.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <strong>Projects:</strong>
                    <ul>
                      {it.projects.map((p, i) => (
                        <li key={i}>
                          <strong>{p.name}</strong>: {p.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card" role="status">No experience to display yet.</div>
        )
      )}
    </Section>
  );
}
