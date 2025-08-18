import React, { useState } from "react";
import Section from "./Section";
import { useFetch } from "../hooks/useFetch";
import { getContactDetails, submitContact } from "../services/api";

/**
 * PUBLIC_INTERFACE
 * Contact section - details and contact form
 */
export default function Contact({ id = "contact", className = "" }) {
  const { data: contact = {}, loading, error } = useFetch(getContactDetails, []);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setSending(true);
    try {
      if (!form.name || !form.email || !form.message) {
        setStatus({ type: "error", message: "Please fill in name, email, and message." });
        setSending(false);
        return;
      }
      await submitContact(form);
      setStatus({ type: "success", message: "Message sent. Thank you!" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: "Unable to send message. Please try again later." });
      // eslint-disable-next-line no-console
      console.error("Contact form submit failed:", err);
    } finally {
      setSending(false);
    }
  }

  return (
    <Section
      id={id}
      title="Get In Touch"
      subtitle="Reach out for collaborations, opportunities, or questions."
      className={className}
    >
      <div className="contact-layout">
        <div className="card contact-card">
          <h4>Contact Details</h4>
          {loading && <div>Loading…</div>}
          {error && <div role="alert">Unable to load contact details.</div>}
          {!loading && !error && (
            <ul className="contact-list">
              {contact?.email && <li>Email: <a className="link" href={`mailto:${contact.email}`}>{contact.email}</a></li>}
              {contact?.phone && <li>Phone: <a className="link" href={`tel:${contact.phone}`}>{contact.phone}</a></li>}
              {contact?.location && <li>Location: {contact.location}</li>}
            </ul>
          )}
        </div>

        <div className="card contact-card">
          <h4>Send a Message</h4>
          <form className="form" onSubmit={onSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              aria-label="Your Name"
              required
            />
            <input
              className="input"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-label="Your Email"
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Subject (optional)"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              aria-label="Subject"
            />
            <textarea
              className="textarea"
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              aria-label="Message"
              required
            />
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button className="btn btn-accent" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send Message"}
              </button>
              {status.message && (
                <span style={{ color: status.type === "success" ? "var(--success)" : "var(--error)" }}>
                  {status.message}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
