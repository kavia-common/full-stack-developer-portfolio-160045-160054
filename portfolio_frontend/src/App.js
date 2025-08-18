import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

import { getAbout, downloadResume } from "./services/api";
import { useFetch } from "./hooks/useFetch";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

/**
 * PUBLIC_INTERFACE
 * App - Portfolio SPA main entry
 * Implements:
 *  - Fixed top navigation with smooth scrolling and active section highlight
 *  - Sections: About, Skills, Experience, Projects, Contact
 *  - Resume download integration
 *  - Dark theme using provided palette
 */
function App() {
  const [theme, setTheme] = useState("dark");
  const sections = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Load small about data early for hero personalization
  const { data: aboutData } = useFetch(getAbout, [], {
    name: "Full Stack Developer",
    title: "Building modern web experiences",
    summary:
      "React, Node.js, and cloud-native enthusiast crafting performant applications.",
    objective: "Seeking opportunities to create impactful software.",
    location: "",
    availability: "",
  });

  // Scroll reveal animation using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("reveal-visible");
        });
      },
      { threshold: 0.15 }
    );
    const revealEls = document.querySelectorAll(".reveal");
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // PUBLIC_INTERFACE
  const handleResumeDownload = async () => {
    try {
      const { objectUrl, filename } = await downloadResume();
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename || "resume";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (e) {
      // Basic fallback: notify user
      alert("Unable to download resume. Please try again later.");
      // eslint-disable-next-line no-console
      console.error("Resume download failed:", e);
    }
  };

  return (
    <div className="app-root">
      <Navbar
        sections={sections}
        onResume={handleResumeDownload}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        theme={theme}
      />

      <main>
        <Hero
          id="about"
          className="reveal"
          about={aboutData}
          onResume={handleResumeDownload}
        />
        <Skills id="skills" className="reveal" />
        <Projects id="projects" className="reveal" />
        <Experience id="experience" className="reveal" />
        <Contact id="contact" className="reveal" />
      </main>

      <footer className="footer">
        <div className="container">
          <span>© {new Date().getFullYear()} {aboutData?.name || "Portfolio"}</span>
          <span className="dot" />
          <span>Built with React</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
