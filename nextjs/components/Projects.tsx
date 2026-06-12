"use client";
import { motion } from "framer-motion";

const projects = [
  { num: "01", icon: "🛕", name: "Parabhakti",      desc: "Temple meal tracking across multiple states with real-time admin notifications.",            tags: [["Flutter","r"],["Firebase","s"],["Multi-state","b"]] },
  { num: "02", icon: "🍽️", name: "AVD Kitchen",     desc: "Inventory management with category & godown-wise tracking + FCM push alerts.",             tags: [["Flutter","r"],["FCM","s"],["Inventory","k"]] },
  { num: "03", icon: "🔐", name: "Smart Door Lock",  desc: "IoT lock with fingerprint, RFID, Flutter app & Embedded C firmware integration.",          tags: [["Flutter","r"],["Embedded C","b"],["IoT","s"]] },
  { num: "04", icon: "🏏", name: "CricGem",          desc: "Fantasy cricket platform — real-time scoring, leagues & cross-platform play.",              tags: [["Flutter","r"],["Firebase","s"],["Real-time","k"]] },
];

const tagColor: Record<string, React.CSSProperties> = {
  r: { background: "rgba(227,83,54,.1)",   color: "var(--red)",   border: "1px solid rgba(227,83,54,.2)"  },
  s: { background: "rgba(244,164,96,.1)",  color: "#c07828",      border: "1px solid rgba(244,164,96,.25)" },
  b: { background: "rgba(160,82,45,.08)",  color: "var(--brown)", border: "1px solid rgba(160,82,45,.18)" },
  k: { background: "rgba(28,10,4,.05)",    color: "var(--ink2)",  border: "1px solid rgba(28,10,4,.12)"   },
};

export default function Projects() {
  return (
    <section id="projects" style={{ maxWidth: 1100, margin: "0 auto", padding: "4.5rem 3rem", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p style={eyebrow}><span style={eyebrowLine} />Portfolio</p>
        <h2 style={secTitle}>APPS I <span style={{ WebkitTextStroke: "2px var(--ink)", color: "transparent" }}>BUILT</span></h2>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1px",
        background: "rgba(160,82,45,0.14)",
        border: "1px solid rgba(160,82,45,0.14)",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
        {projects.map((p, i) => (
          <motion.div key={p.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ background: "#EDEBD0" }}
            style={{ background: "var(--card)", padding: "2rem", position: "relative", overflow: "hidden", cursor: "default" }}
          >
            <motion.span
              whileHover={{ color: "var(--red)", opacity: 0.15 }}
              style={{ position: "absolute", top: ".5rem", right: "1rem", fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "5rem", color: "var(--ink)", opacity: 0.06, lineHeight: 1 }}
            >
              {p.num}
            </motion.span>

            <span style={{ fontSize: "2rem", marginBottom: "1rem", display: "block" }}>{p.icon}</span>
            <div style={{ fontFamily: "var(--font-barlow)", fontWeight: 800, fontSize: "1.5rem", letterSpacing: ".03em", marginBottom: ".5rem", color: "var(--ink)" }}>{p.name}</div>
            <div style={{ fontSize: ".83rem", color: "var(--ink2)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{p.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
              {p.tags.map(([label, type]) => (
                <span key={label} style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".2rem .65rem", borderRadius: "2px", ...tagColor[type] }}>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
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
