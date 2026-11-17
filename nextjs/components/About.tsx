"use client";
import { motion } from "framer-motion";
import { profile, stats } from "@/lib/data";
import { SectionHeading, Reveal } from "./ui";

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading index="01" eyebrow="About" title="One developer," accentWord="four platforms." />

      <div
        className="about-grid"
        style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "3.5rem", alignItems: "start" }}
      >
        <div>
          <Reveal>
            <p style={{ fontSize: "1.08rem", lineHeight: 1.82, color: "var(--text)", marginBottom: "1.4rem" }}>
              {profile.summary}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ fontSize: "1rem", lineHeight: 1.82, color: "var(--text-dim)", marginBottom: "2rem" }}>
              {profile.summaryTail}
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div
              className="glass"
              style={{
                padding: "1.3rem 1.5rem",
                borderRadius: "var(--r)",
                borderLeft: "2px solid var(--cyan)",
                background: "rgba(34,211,238,.04)",
              }}
            >
              <p style={{ fontSize: ".95rem", lineHeight: 1.75, color: "var(--text-dim)" }}>
                Right now I own a cross-platform ERP at{" "}
                <strong style={{ color: "var(--text)", fontWeight: 600 }}>Park Universal</strong> that
                integrates with Tally and ships to web, Android, iOS and desktop from one Flutter
                codebase — with server-driven screens so new forms and reports reach users without a
                release.
              </p>
            </div>
          </Reveal>
        </div>

        {/* stat panel */}
        <div
          className="stat-row"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "var(--stroke)", border: "1px solid var(--stroke)", borderRadius: "var(--r)", overflow: "hidden" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: "rgba(255,255,255,.055)" }}
              style={{
                padding: "1.6rem 1.3rem",
                background: "rgba(255,255,255,.022)",
                backdropFilter: "blur(18px)",
                minHeight: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: ".35rem",
              }}
            >
              <span
                className="grad-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                  letterSpacing: "-.035em",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              <span style={{ fontSize: ".83rem", fontWeight: 500, color: "var(--text)" }}>{s.label}</span>
              <span className="mono" style={{ fontSize: ".64rem", color: "var(--text-faint)", letterSpacing: ".05em" }}>
                {s.hint}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
