import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Navbar
 * Props:
 *  - sections: [{id, label}]
 *  - onResume: () => void
 *  - onToggleTheme: () => void
 *  - theme: 'dark' | 'light'
 */
export default function Navbar({ sections = [], onResume, onToggleTheme, theme }) {
  const [active, setActive] = useState(sections[0]?.id);

  // Track active section using IntersectionObserver
  useEffect(() => {
    const options = { rootMargin: "-50% 0px -40% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, options);

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="navbar">
      <div className="container inner">
        <div className="brand" onClick={() => scrollTo(sections[0]?.id)} role="button" aria-label="Go to top">
          <span className="logo" />
          <span>Developer Portfolio</span>
        </div>
        <div className="nav-links" role="navigation" aria-label="Primary">
          {sections.map((s) => (
            <a
              key={s.id}
              className={`nav-link ${active === s.id ? "active" : ""}`}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(s.id);
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button className="btn btn-accent" onClick={onResume}>Download Resume</button>
        </div>
      </div>
    </nav>
  );
}
