import React from "react";
import Section from "./Section";

/**
 * PUBLIC_INTERFACE
 * Hero (About)
 * Props:
 *  - id
 *  - about: { name, title, summary, objective }
 *  - onResume: () => void
 */
export default function Hero({ id = "about", about, onResume, className = "" }) {
  return (
    <Section id={id} className={`hero ${className}`.trim()}>
      <div>
        <div className="subtitle">Hello, I'm</div>
        <h1 className="title">{about?.name || "Full Stack Developer"}</h1>
        <div className="subtitle" style={{ textTransform: "none" }}>
          {about?.title || "React • Node.js • Express • MongoDB • MySQL"}
        </div>
        <p className="desc">
          {about?.summary ||
            "I craft modern, accessible, and performant web applications across the stack."}
        </p>
        <div className="cta">
          <a className="btn" href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
            View Projects
          </a>
          <a className="btn btn-ghost" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Contact Me
          </a>
          <button className="btn btn-accent" onClick={onResume}>Download Resume</button>
        </div>
      </div>
      <div className="panel">
        <strong>Objective</strong>
        <p className="desc" style={{ marginTop: 8 }}>
          {about?.objective || "Seeking opportunities to build remarkable user experiences and reliable backend systems."}
        </p>
      </div>
    </Section>
  );
}
