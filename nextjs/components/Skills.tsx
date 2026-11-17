"use client";
import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  return (
    <section id="stack" className="section">
      <SectionHeading
        index="02"
        eyebrow="Stack"
        title="What I build"
        accentWord="with"
        lead="Mobile, web, backend and cloud — the whole path from a Dart widget to a Lambda handler."
      />

      <div
        className="skills-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.1rem",
        }}
      >
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.key}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: (i % 3) * 0.08, ease: EASE }}
            whileHover={{ y: -4 }}
            className="glass glass-hover"
            style={{ padding: "1.6rem 1.6rem 1.4rem", position: "relative", overflow: "hidden" }}
          >
            {/* top accent wash */}
            <div
              aria-hidden
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 100,
                background: `radial-gradient(ellipse at 20% 0%, ${g.accent}1f, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: ".7rem", marginBottom: "1.25rem" }}>
              <span
                style={{
                  width: 8, height: 8, borderRadius: 3, background: g.accent,
                  boxShadow: `0 0 12px ${g.accent}aa`, flexShrink: 0,
                }}
              />
              <h3 style={{ fontSize: ".95rem", fontWeight: 600, letterSpacing: "-.01em", color: "var(--text)" }}>
                {g.title}
              </h3>
              <span
                className="mono"
                style={{ marginLeft: "auto", fontSize: ".65rem", color: "var(--text-faint)" }}
              >
                {String(g.items.length).padStart(2, "0")}
              </span>
            </div>

            <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
              {g.items.map(item => (
                <span
                  key={item}
                  className="mono"
                  style={{
                    fontSize: ".7rem",
                    fontWeight: 500,
                    letterSpacing: ".01em",
                    padding: ".36rem .7rem",
                    borderRadius: 8,
                    border: "1px solid var(--stroke)",
                    background: "rgba(255,255,255,.03)",
                    color: "var(--text-dim)",
                    whiteSpace: "nowrap",
                    transition: "color .25s, border-color .25s, background .25s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = g.accent;
                    e.currentTarget.style.borderColor = `${g.accent}55`;
                    e.currentTarget.style.background = `${g.accent}12`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "var(--text-dim)";
                    e.currentTarget.style.borderColor = "var(--stroke)";
                    e.currentTarget.style.background = "rgba(255,255,255,.03)";
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
