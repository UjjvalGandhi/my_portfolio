"use client";
import { motion } from "framer-motion";
import { profile, stats } from "@/lib/data";
import { SectionHeading, Reveal } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading index="01" eyebrow="About" title="One developer," accentWord="four platforms." />

      <div
        className="about-grid"
        style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "4rem", alignItems: "start" }}
      >
        <div>
          <Reveal>
            <p style={{ fontSize: "1.12rem", lineHeight: 1.75, color: "var(--ink)", marginBottom: "1.5rem" }}>
              {profile.summary}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--ink-2)", marginBottom: "2.5rem" }}>
              {profile.summaryTail}
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1.5rem" }}>
              <span className="label" style={{ display: "block", marginBottom: ".7rem" }}>
                Currently
              </span>
              <p style={{ fontSize: ".98rem", lineHeight: 1.7, color: "var(--ink-2)" }}>
                I own a cross-platform ERP at{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Park Universal</strong> that
                integrates with Tally and ships to web, Android, iOS and desktop from one Flutter
                codebase — with server-driven screens, so new forms and reports reach users without
                a release.
              </p>
            </div>
          </Reveal>
        </div>

        {/* stat table */}
        <div
          className="stat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderTop: "1px solid var(--line)",
            borderLeft: "1px solid var(--line)",
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              style={{
                padding: "1.5rem 1.25rem",
                borderRight: "1px solid var(--line)",
                borderBottom: "1px solid var(--line)",
                minHeight: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span className="label" style={{ fontSize: ".58rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span
                  className="display"
                  style={{ display: "block", fontSize: "1.95rem", color: "var(--ink)", marginBottom: ".4rem" }}
                >
                  {s.value}
                </span>
                <span style={{ display: "block", fontSize: ".82rem", fontWeight: 500, color: "var(--ink)", marginBottom: ".25rem" }}>
                  {s.label}
                </span>
                <span className="mono" style={{ fontSize: ".64rem", color: "var(--ink-3)" }}>
                  {s.hint}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
