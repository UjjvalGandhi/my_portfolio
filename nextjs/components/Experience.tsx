"use client";
import { motion } from "framer-motion";

const jobs = [
  {
    role: "Flutter Developer",
    period: "May 2025 – Present",
    company: "Park Universal PVT. LTD · Anand, Gujarat",
    points: [
      "Cross-platform ERP (Web, Android, iOS, Desktop) integrated with Tally using Flutter + GetX",
      "Data sync, real-time exchange, transaction posting & report generation",
      "Modular GetX architecture for scalability across all platforms",
    ],
  },
  {
    role: "Flutter Developer",
    period: "Nov 2024 – Apr 2025",
    company: "WebEarl Technologies · Ahmedabad, Gujarat",
    points: [
      "Built CricGem — fantasy cricket app on Android & iOS with Flutter + Firebase",
      "Real-time data sync, live match updates & seamless cross-platform UI",
    ],
  },
];

export default function Experience() {
  return (
    <section id="work" style={{ maxWidth: 1100, margin: "0 auto", padding: "4.5rem 3rem", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p style={eyebrow}><span style={eyebrowLine} />Experience</p>
        <h2 style={secTitle}>WHERE I <span style={{ color: "var(--red)" }}>WORKED</span></h2>
      </motion.div>

      {jobs.map((job, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.12 }}
          whileHover={{ x: 6, borderColor: "rgba(227,83,54,0.3)" }}
          style={{
            border: "1px solid rgba(160,82,45,0.14)",
            borderRadius: "10px",
            background: "var(--card)",
            marginBottom: "1rem",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* left accent bar on hover handled via CSS below */}
          <div style={{ padding: "2rem 2.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".5rem", marginBottom: ".3rem" }}>
              <div style={{ fontFamily: "var(--font-barlow)", fontWeight: 800, fontSize: "1.6rem", letterSpacing: ".03em", color: "var(--ink)" }}>
                {job.role}
              </div>
              <div style={{
                fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                color: "var(--red)", background: "rgba(227,83,54,.08)",
                border: "1px solid rgba(227,83,54,.2)", padding: ".25rem .75rem", borderRadius: "3px",
              }}>
                {job.period}
              </div>
            </div>
            <div style={{ fontSize: ".85rem", color: "var(--ink2)", marginBottom: "1rem", fontWeight: 500 }}>{job.company}</div>
            <ul style={{ listStyle: "none" }}>
              {job.points.map((pt, j) => (
                <li key={j} style={{
                  fontSize: ".85rem", color: "var(--ink2)", lineHeight: 1.65,
                  padding: ".35rem 0 .35rem 1.3rem",
                  position: "relative",
                  borderTop: j === 0 ? "none" : "1px solid rgba(160,82,45,0.14)",
                }}>
                  <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 5, height: 5, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

const eyebrow: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: ".6rem",
  fontSize: ".7rem", fontWeight: 700, letterSpacing: ".18em",
  textTransform: "uppercase", color: "var(--red)", marginBottom: ".6rem",
};
const eyebrowLine: React.CSSProperties = { width: 20, height: 2, background: "var(--red)", display: "inline-block" };
const secTitle: React.CSSProperties = {
  fontFamily: "var(--font-barlow)", fontWeight: 900,
  fontSize: "clamp(2.8rem, 6vw, 5rem)", letterSpacing: ".02em",
  lineHeight: 0.92, marginBottom: "3rem", color: "var(--ink)",
};
