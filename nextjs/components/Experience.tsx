"use client";
import { motion } from "framer-motion";
import { jobs, education, type Job } from "@/lib/data";
import { SectionHeading, Tag, Reveal } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

function JobBlock({ job, index }: { job: Job; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="exp-row"
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: "3rem",
        padding: "2.5rem 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* meta column */}
      <div>
        <div className="mono" style={{ fontSize: ".74rem", color: "var(--ink)", marginBottom: ".6rem" }}>
          {job.period}
        </div>
        {job.current && (
          <span
            className="mono"
            style={{
              display: "inline-flex", alignItems: "center", gap: ".4rem",
              fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            <span className="tick" style={{ animation: "blink-soft 2.4s infinite" }} />
            Current
          </span>
        )}
      </div>

      {/* body */}
      <div>
        <h3 className="display" style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", marginBottom: ".5rem" }}>
          {job.role}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
          <span style={{ fontSize: ".95rem", fontWeight: 500, color: "var(--ink)" }}>{job.company}</span>
          <span style={{ color: "var(--ink-3)" }}>—</span>
          <span className="mono" style={{ fontSize: ".74rem", color: "var(--ink-3)" }}>{job.location}</span>
        </div>

        <p style={{ fontSize: ".98rem", lineHeight: 1.7, color: "var(--ink-2)", marginBottom: "1.75rem", maxWidth: 620 }}>
          {job.summary}
        </p>

        <ul
          style={{
            listStyle: "none",
            display: "grid",
            borderTop: "1px solid var(--line)",
            marginBottom: "1.75rem",
          }}
        >
          {job.points.map((p, i) => (
            <li
              key={p.title}
              style={{
                display: "grid",
                gridTemplateColumns: "2.4rem 1fr",
                gap: ".5rem",
                padding: "1rem 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span className="mono" style={{ fontSize: ".62rem", color: "var(--accent)", paddingTop: ".2rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <strong style={{ display: "block", fontSize: ".88rem", fontWeight: 600, color: "var(--ink)", marginBottom: ".25rem" }}>
                  {p.title}
                </strong>
                <span style={{ fontSize: ".88rem", lineHeight: 1.65, color: "var(--ink-2)" }}>{p.body}</span>
              </span>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
          {job.stack.map(s => <Tag key={s} label={s} />)}
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading index="03" eyebrow="Experience" title="Where I've" accentWord="shipped" />

      <div style={{ borderBottom: "1px solid var(--line)" }}>
        {jobs.map((job, i) => <JobBlock key={job.company} job={job} index={i} />)}
      </div>

      {/* ── Education ──────────────────────────────────────── */}
      <Reveal>
        <div id="education" style={{ marginTop: "4.5rem" }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: "1rem",
              paddingBottom: "1rem", marginBottom: "0",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <span className="mono" style={{ fontSize: ".72rem", fontWeight: 600, color: "var(--accent)" }}>—</span>
            <span className="label">Education</span>
          </div>

          {education.map(e => (
            <div
              key={e.short}
              className="exp-row"
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr auto",
                gap: "3rem",
                alignItems: "baseline",
                padding: "1.5rem 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span className="mono" style={{ fontSize: ".74rem", color: "var(--ink-2)" }}>
                {e.short} · {e.year}
              </span>
              <span>
                <span style={{ display: "block", fontSize: "1rem", fontWeight: 500, color: "var(--ink)" }}>
                  {e.degree}
                </span>
                <span className="mono" style={{ fontSize: ".74rem", color: "var(--ink-3)" }}>
                  {e.university}
                </span>
              </span>
              <span className="mono" style={{ fontSize: ".82rem", color: "var(--accent)", whiteSpace: "nowrap" }}>
                CGPA {e.score}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
