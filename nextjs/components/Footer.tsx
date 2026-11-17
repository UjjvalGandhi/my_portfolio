"use client";
import { profile } from "@/lib/data";

const year = new Date().getFullYear();

const links = [
  { label: "GitHub",   href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "pub.dev",  href: "https://pub.dev/publishers/ujjvalgandhi.online/packages" },
  { label: "Résumé",   href: profile.resumeUrl },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--line)", position: "relative", zIndex: 1 }}>
      <div
        className="foot-row"
        style={{
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          paddingInline: "var(--gut)",
          paddingBlock: "1.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
          borderLeft: "1px solid var(--line)",
          borderRight: "1px solid var(--line)",
        }}
      >
        <span className="mono" style={{ fontSize: ".72rem", color: "var(--ink-3)" }}>
          © {year} {profile.name} — built with Next.js
        </span>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {links.map(l => (
            <a
              key={l.label}
              className="link mono"
              href={l.href}
              target="_blank"
              rel="noopener"
              style={{ fontSize: ".72rem", color: "var(--ink-2)" }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="label"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontSize: ".6rem",
            color: "var(--ink-2)",
          }}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
