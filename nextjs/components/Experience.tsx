"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { jobs, education, type Job } from "@/lib/data";
import { SectionHeading, Chip, Reveal } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

function JobBlock({ job, index }: { job: Job; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      style={{ position: "relative", paddingLeft: "2.4rem", paddingBottom: index === jobs.length - 1 ? 0 : "3.4rem" }}
    >
      {/* node */}
      <span
        style={{
          position: "absolute", left: -5, top: 6,
          width: 11, height: 11, borderRadius: "50%",
          background: job.current ? "var(--cyan)" : "var(--bg-lift)",
          border: `2px solid ${job.current ? "var(--cyan)" : "var(--stroke-2)"}`,
          boxShadow: job.current ? "0 0 16px rgba(34,211,238,.9)" : "none",
        }}
      />

      <div
        className="exp-row"
        style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "2rem", alignItems: "start" }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: ".7rem", letterSpacing: ".06em", color: job.current ? "var(--cyan)" : "var(--text-faint)",
              marginBottom: ".5rem", whiteSpace: "nowrap",
            }}
          >
            {job.period}
          </div>
          {job.current && (
            <span
              className="mono"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".35rem",
                fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase",
                padding: ".22rem .55rem", borderRadius: 999,
                border: "1px solid rgba(163,230,53,.3)", background: "rgba(163,230,53,.08)",
                color: "var(--lime)",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--lime)", animation: "pulse-dot 2.2s infinite" }} />
              Current
            </span>
          )}
        </div>

        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)", fontWeight: 650,
              fontSize: "clamp(1.3rem, 2.4vw, 1.75rem)", letterSpacing: "-.028em",
              color: "var(--text)", marginBottom: ".35rem",
            }}
          >
            {job.role}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: ".55rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <span style={{ fontSize: ".92rem", fontWeight: 500, color: "var(--violet)" }}>{job.company}</span>
            <span style={{ color: "var(--text-faint)", fontSize: ".7rem" }}>·</span>
            <span className="mono" style={{ fontSize: ".72rem", color: "var(--text-faint)" }}>{job.location}</span>
          </div>

          <p style={{ fontSize: ".95rem", lineHeight: 1.75, color: "var(--text-dim)", marginBottom: "1.4rem", maxWidth: 640 }}>
            {job.summary}
          </p>

          <ul style={{ listStyle: "none", display: "grid", gap: ".15rem", marginBottom: "1.4rem" }}>
            {job.points.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
                style={{
                  display: "grid", gridTemplateColumns: "auto 1fr", gap: ".8rem",
                  padding: ".75rem .9rem", borderRadius: 11,
                  borderLeft: "1px solid var(--stroke)",
                  transition: "background .25s, border-color .25s",
                }}
                whileHover={{ backgroundColor: "rgba(255,255,255,.03)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: ".62rem", color: "var(--cyan)", paddingTop: ".2rem", opacity: .8 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong style={{ display: "block", fontSize: ".86rem", fontWeight: 600, color: "var(--text)", marginBottom: ".2rem" }}>
                    {p.title}
                  </strong>
                  <span style={{ fontSize: ".86rem", lineHeight: 1.7, color: "var(--text-dim)" }}>{p.body}</span>
                </span>
              </motion.li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
            {job.stack.map(s => <Chip key={s} label={s} />)}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Where I've"
        accentWord="shipped"
      />

      <div ref={trackRef} style={{ position: "relative" }}>
        {/* rail */}
        <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 1, background: "var(--stroke)" }}>
          <motion.div
            style={{
              position: "absolute", top: 0, left: 0, width: 1, height,
              background: "linear-gradient(180deg, var(--cyan), var(--violet))",
              boxShadow: "0 0 10px rgba(129,140,248,.6)",
            }}
          />
        </div>

        {jobs.map((job, i) => <JobBlock key={job.company} job={job} index={i} />)}
      </div>

      {/* ── Education strip ─────────────────────────────────── */}
      <Reveal delay={1}>
        <div
          id="education"
          style={{
            marginTop: "5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--stroke)",
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: ".68rem", letterSpacing: ".2em", textTransform: "uppercase",
              color: "var(--text-faint)", marginBottom: "1.5rem",
            }}
          >
            Education
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {education.map((e, i) => (
              <motion.div
                key={e.short}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                whileHover={{ y: -3 }}
                className="glass glass-hover"
                style={{ padding: "1.4rem 1.5rem", display: "flex", alignItems: "center", gap: "1.1rem" }}
              >
                <span
                  className="mono"
                  style={{
                    display: "grid", placeItems: "center",
                    width: 48, height: 48, borderRadius: 13, flexShrink: 0,
                    background: "var(--grad-soft)", border: "1px solid var(--stroke-2)",
                    fontSize: ".72rem", fontWeight: 600, color: "var(--text)",
                  }}
                >
                  {e.short}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: ".92rem", fontWeight: 600, color: "var(--text)", marginBottom: ".25rem" }}>
                    {e.degree}
                  </div>
                  <div className="mono" style={{ fontSize: ".7rem", color: "var(--text-faint)", letterSpacing: ".03em" }}>
                    {e.university} · {e.year} · CGPA{" "}
                    <span style={{ color: "var(--lime)" }}>{e.score}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
