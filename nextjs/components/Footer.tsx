"use client";
import { profile } from "@/lib/data";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--stroke)",
        background: "rgba(0,0,0,.35)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        className="foot-row"
        style={{
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          padding: "1.8rem 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <span className="mono" style={{ fontSize: ".7rem", color: "var(--text-faint)", letterSpacing: ".04em" }}>
          © {year} {profile.name} · Built with Next.js
        </span>

        <div style={{ display: "flex", gap: "1.4rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "GitHub", href: profile.github },
            { label: "LinkedIn", href: profile.linkedin },
            { label: "pub.dev", href: "https://pub.dev/publishers/ujjvalgandhi.online/packages" },
            { label: "Résumé", href: profile.resumeUrl },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener"
              className="mono"
              style={{
                fontSize: ".7rem", letterSpacing: ".06em", color: "var(--text-dim)",
                textDecoration: "none", transition: "color .25s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              {l.label} ↗
            </a>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mono"
          style={{
            display: "inline-flex", alignItems: "center", gap: ".4rem",
            padding: ".45rem .9rem", borderRadius: 999,
            background: "var(--glass)", border: "1px solid var(--stroke)",
            color: "var(--text-dim)", fontSize: ".66rem", letterSpacing: ".1em",
            textTransform: "uppercase",
          }}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
