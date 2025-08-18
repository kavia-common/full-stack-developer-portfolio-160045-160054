import React from "react";
import Section from "./Section";
import { useFetch } from "../hooks/useFetch";
import { getSkills } from "../services/api";

/**
 * PUBLIC_INTERFACE
 * Skills grid - shows categories and items as chips
 */
export default function Skills({ id = "skills", className = "" }) {
  const { data: skills = [], loading, error } = useFetch(getSkills, []);

  return (
    <Section
      id={id}
      title="Skills & Technologies"
      subtitle="A snapshot of tools I use to build and deliver products."
      className={className}
    >
      {loading && <div className="card">Loading skills…</div>}
      {error && <div className="card" role="alert">Unable to load skills.</div>}
      {!loading && !error && (
        <div className="grid skills">
          {skills.map((cat) => (
            <div key={cat.category} className="card">
              <div className="skill-title">{cat.category}</div>
              <div className="chips">
                {(cat.items || []).map((item) => (
                  <span className="chip" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
