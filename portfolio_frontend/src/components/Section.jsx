import React from "react";

/**
 * PUBLIC_INTERFACE
 * Section - Shared section wrapper with id, title, and optional subtitle.
 */
export default function Section({ id, title, subtitle, className = "", children }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="container">
        {(title || subtitle) && (
          <div className="section-head">
            {title && <h3 className="section-title">{title}</h3>}
            {subtitle && <div className="section-subtitle">{subtitle}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
