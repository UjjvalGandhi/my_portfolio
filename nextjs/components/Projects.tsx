"use client";
import { motion } from "framer-motion";
import { projects, profile, type Project } from "@/lib/data";
import { SectionHeading, Tag } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

function Card({ p, index }: { p: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.07, ease: EASE }}
      className={`panel-hover${p.featured ? " proj-featured" : ""}`}
      style={{
        padding: "2rem 1.75rem",
        borderRight: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* head rule */}
      <div
        style={{
          display: "flex", alignItems: "baseline", gap: ".75rem",
          paddingBottom: ".9rem", marginBottom: "1.25rem",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <span className="mono" style={{ fontSize: ".7rem", fontWeight: 600, color: "var(--accent)" }}>
          {p.num}
        </span>
        <span className="label" style={{ fontSize: ".6rem" }}>{p.tagline}</span>
        {p.badge && (
          <span
            className="mono"
            style={{
              marginLeft: "auto", fontSize: ".58rem", letterSpacing: ".1em",
              textTransform: "uppercase", padding: ".2rem .5rem",
              border: "1px solid var(--line-2)", color: "var(--ink-2)",
              whiteSpace: "nowrap",
            }}
          >
            {p.badge}
          </span>
        )}
      </div>

      <h3
        className="display"
        style={{ fontSize: p.featured ? "clamp(1.6rem, 3vw, 2.1rem)" : "1.35rem", marginBottom: ".9rem" }}
      >
        {p.name}
      </h3>

      <p
        style={{
          fontSize: ".93rem", lineHeight: 1.7, color: "var(--ink-2)",
          marginBottom: p.backend ? "1.1rem" : "1.75rem",
          maxWidth: p.featured ? 680 : undefined,
        }}
      >
        {p.body}
      </p>

      {p.backend && (
        <div
          style={{
            display: "grid", gridTemplateColumns: "2.6rem 1fr", gap: ".6rem",
            padding: "1rem", marginBottom: "1.75rem",
            background: "var(--bg-alt)", border: "1px solid var(--line)",
          }}
        >
          <span className="label" style={{ fontSize: ".56rem", color: "var(--accent)", paddingTop: ".15rem" }}>
            API
          </span>
          <span style={{ fontSize: ".86rem", lineHeight: 1.65, color: "var(--ink-2)" }}>{p.backend}</span>
        </div>
      )}

      <div
        style={{
          marginTop: "auto", display: "flex", flexWrap: "wrap",
          gap: ".4rem", alignItems: "center",
        }}
      >
        {p.tags.map(t => <Tag key={t} label={t} />)}
        {p.period && (
          <span
            className="mono"
            style={{ marginLeft: "auto", fontSize: ".66rem", color: "var(--ink-3)", whiteSpace: "nowrap" }}
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
          borderTop: "1px solid var(--line)",
          borderLeft: "1px solid var(--line)",
        }}
      >
        {projects.map((p, i) => <Card key={p.num} p={p} index={i} />)}

        {/* Sixth cell — keeps the card count divisible and gives the grid
            somewhere to send people next. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          style={{
            padding: "2rem 1.75rem",
            borderRight: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            background: "var(--bg-alt)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span className="label" style={{ marginBottom: "1.5rem" }}>More</span>
          <h3 className="display" style={{ fontSize: "1.35rem", marginBottom: ".9rem" }}>
            Source on GitHub
          </h3>
          <p className="measure" style={{ fontSize: ".92rem", lineHeight: 1.7, color: "var(--ink-2)", marginBottom: "1.5rem" }}>
            Client work stays private, but the packages, experiments and the code behind this site
            are all public.
          </p>
          <a
            className="link mono"
            href={profile.github}
            target="_blank"
            rel="noopener"
            style={{ marginTop: "auto", fontSize: ".78rem", fontWeight: 500 }}
          >
            github.com/UjjvalGandhi ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
