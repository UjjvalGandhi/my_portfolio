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
          borderTop: "1px solid var(--line)",
          borderLeft: "1px solid var(--line)",
        }}
      >
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.key}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: EASE }}
            style={{
              padding: "1.6rem 1.5rem",
              borderRight: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                display: "flex", alignItems: "baseline", gap: ".7rem",
                paddingBottom: ".9rem", marginBottom: "1.1rem",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span className="mono" style={{ fontSize: ".62rem", color: "var(--accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 style={{ fontSize: ".92rem", fontWeight: 600, letterSpacing: "-.012em", color: "var(--ink)" }}>
                {g.title}
              </h3>
              <span className="mono" style={{ marginLeft: "auto", fontSize: ".62rem", color: "var(--ink-3)" }}>
                {g.items.length}
              </span>
            </div>

            <ul style={{ listStyle: "none", display: "grid", gap: ".45rem" }}>
              {g.items.map(item => (
                <li
                  key={item}
                  className="mono"
                  style={{
                    display: "flex", alignItems: "center", gap: ".55rem",
                    fontSize: ".76rem", color: "var(--ink-2)",
                  }}
                >
                  <span
                    style={{ width: 3, height: 3, background: "var(--ink-3)", flexShrink: 0 }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
