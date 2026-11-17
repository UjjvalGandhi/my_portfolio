"use client";
import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { SectionHeading, Chip } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

function Card({ p, index }: { p: Project; index: number }) {
  const featured = Boolean(p.featured);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.09, ease: EASE }}
      whileHover={{ y: -5 }}
      className="glass glass-hover"
      style={{
        gridColumn: featured ? "span 2" : "span 1",
        padding: featured ? "2.2rem 2.2rem 2rem" : "1.8rem",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* corner wash */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, right: 0, width: 280, height: 220,
          background: `radial-gradient(ellipse at 100% 0%, ${p.accent}22, transparent 68%)`,
          pointerEvents: "none",
        }}
      />
      {/* watermark number */}
      <span
        aria-hidden
        style={{
          position: "absolute", top: "-.4rem", right: "1rem",
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: featured ? "7rem" : "5rem", lineHeight: 1,
          color: "#fff", opacity: 0.035, letterSpacing: "-.05em",
        }}
      >
        {p.num}
      </span>

      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: ".6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <span
          className="mono"
          style={{
            fontSize: ".64rem", letterSpacing: ".16em", textTransform: "uppercase",
            color: p.accent,
          }}
        >
          {p.tagline}
        </span>
        {p.badge && (
          <span
            className="mono"
            style={{
              fontSize: ".58rem", letterSpacing: ".12em", textTransform: "uppercase",
              padding: ".22rem .55rem", borderRadius: 999,
              border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.05)",
              color: "var(--text-dim)",
            }}
          >
            {p.badge}
          </span>
        )}
      </div>

      <h3
        style={{
          position: "relative",
          fontFamily: "var(--font-display)", fontWeight: 650,
          fontSize: featured ? "clamp(1.6rem, 3vw, 2.2rem)" : "1.35rem",
          letterSpacing: "-.03em", color: "var(--text)", marginBottom: ".9rem",
        }}
      >
        {p.name}
      </h3>

      <p
        style={{
          position: "relative",
          fontSize: ".92rem", lineHeight: 1.76, color: "var(--text-dim)",
          marginBottom: p.backend ? "1rem" : "1.5rem",
          maxWidth: featured ? 700 : undefined,
        }}
      >
        {p.body}
      </p>

      {p.backend && (
        <div
          style={{
            position: "relative",
            display: "grid", gridTemplateColumns: "auto 1fr", gap: ".75rem",
            padding: ".85rem 1rem", borderRadius: 11, marginBottom: "1.5rem",
            background: "rgba(255,255,255,.028)", border: "1px solid var(--stroke)",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: ".58rem", letterSpacing: ".14em", textTransform: "uppercase",
              color: "var(--lime)", paddingTop: ".15rem",
            }}
          >
            API
          </span>
          <span style={{ fontSize: ".85rem", lineHeight: 1.7, color: "var(--text-dim)" }}>{p.backend}</span>
        </div>
      )}

      <div style={{ position: "relative", marginTop: "auto", display: "flex", flexWrap: "wrap", gap: ".4rem", alignItems: "center" }}>
        {p.tags.map(t => <Chip key={t} label={t} />)}
        {p.period && (
          <span
            className="mono"
            style={{ marginLeft: "auto", fontSize: ".65rem", color: "var(--text-faint)", letterSpacing: ".04em", whiteSpace: "nowrap" }}
          >
            {p.period}
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section">
      <SectionHeading
        index="04"
        eyebrow="Selected work"
        title="Things I've"
        accentWord="built"
        lead="Production apps running across temples, warehouses and ERP floors — front end, API and deployment."
      />

      <div
        className="proj-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.1rem",
        }}
      >
        {projects.map((p, i) => <Card key={p.num} p={p} index={i} />)}
      </div>
    </section>
  );
}
