"use client";
import { motion } from "framer-motion";

const skills = [
  { icon: "📱", name: "Flutter"        },
  { icon: "🎯", name: "Dart"           },
  { icon: "🔥", name: "Firebase"       },
  { icon: "⚙️", name: "GetX"           },
  { icon: "🤖", name: "Android Studio" },
  { icon: "🍎", name: "Xcode"          },
  { icon: "🌐", name: "REST APIs"      },
  { icon: "🍃", name: "MongoDB"        },
  { icon: "🔌", name: "IoT / Embedded" },
];

export default function Skills() {
  return (
    <section id="skills" style={{ maxWidth: 1100, margin: "0 auto", padding: "4.5rem 3rem", position: "relative", zIndex: 2 }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p style={eyebrow}><span style={eyebrowLine} />Stack</p>
        <h2 style={secTitle}>
          FLUTTER <span style={{ WebkitTextStroke: "2px var(--ink)", color: "transparent" }}>TOOLKIT</span>
        </h2>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "1px",
        background: "rgba(160,82,45,0.14)",
        border: "1px solid rgba(160,82,45,0.14)",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
        {skills.map((s, i) => (
          <motion.div key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ background: "#EDEBD0" }}
            style={{ background: "var(--card)", padding: "1.75rem 1rem", textAlign: "center", cursor: "default" }}
          >
            <div style={{ fontSize: "1.8rem", marginBottom: ".5rem" }}>{s.icon}</div>
            <div style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--ink2)", letterSpacing: ".04em" }}>{s.name}</div>
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
