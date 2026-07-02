"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiFlutter, SiFirebase } from "react-icons/si";
import { MdInventory2, MdSensors, MdSchool } from "react-icons/md";
import { FaPlaceOfWorship } from "react-icons/fa6";

const tagColor: Record<string, React.CSSProperties> = {
  r: { background:"rgba(227,83,54,.1)",  color:"var(--red)",   border:"1px solid rgba(227,83,54,.2)"   },
  s: { background:"rgba(244,164,96,.1)", color:"#c07828",      border:"1px solid rgba(244,164,96,.25)" },
  b: { background:"rgba(160,82,45,.08)", color:"var(--brown)", border:"1px solid rgba(160,82,45,.18)" },
  k: { background:"rgba(28,10,4,.05)",   color:"var(--ink2)",  border:"1px solid rgba(28,10,4,.12)"   },
};

const Tag = ({ label, type }: { label: string; type: string }) => (
  <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", padding:".2rem .65rem", borderRadius:"2px", ...tagColor[type] }}>{label}</span>
);

const projects = [
  {
    num: "01", icon: <FaPlaceOfWorship size={32} color="#A0522D" />,
    name: "Parabhakti",
    desc: "Flutter app to centrally track temple devotee meal counts across multiple states with real-time admin notifications.",
    tags: [["Flutter","r"],["Real-time","s"],["Multi-state","b"]],
  },
  {
    num: "02", icon: <MdInventory2 size={32} color="#E35336" />,
    name: "AVD Kitchen",
    desc: "Flutter-based inventory app for category-wise/godown-wise daily grocery inflow tracking with Firebase Cloud Messaging.",
    tags: [["Flutter","r"],["FCM","s"],["Inventory","k"]],
  },
  {
    num: "03", icon: <MdSchool size={32} color="#4A90D9" />,
    name: "Online Course Registration",
    desc: "Course registration system using PHP, XAMPP, and MySQL for secure enrollment and real-time updates.",
    tags: [["PHP","r"],["MySQL","s"],["Web","b"]],
  },
  {
    num: "04", icon: <MdSensors size={32} color="#6b3a1f" />,
    name: "Smart Door Lock System",
    desc: "IoT lock integrating fingerprint, RFID, push-button control, and a Flutter app using Embedded C.",
    tags: [["Flutter","r"],["Embedded C","b"],["IoT","s"]],
  },
];

function ProjectCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 40%"],
  });

  // Alternating: even cards from left, odd from right
  const xStart = index % 2 === 0 ? -40 : 40;
  const x        = useTransform(scrollYProgress, [0, 1], [xStart, 0]);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [0, 1]);
  const rotateY  = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -18 : 18, 0]);
  const scale    = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        x, opacity, rotateY, scale,
        background:"var(--card)", padding:"2rem", position:"relative",
        overflow:"hidden", cursor:"default",
        transformStyle:"preserve-3d", perspective:800,
      }}
      whileHover={{ backgroundColor:"#EDEBD0", y:-6, transition:{ duration:0.25 } }}
    >
      <span style={{ position:"absolute", top:".5rem", right:"1rem", fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"5rem", color:"var(--ink)", opacity:0.05, lineHeight:1 }}>{p.num}</span>
      <div style={{ marginBottom:"1rem" }}>{p.icon}</div>
      <div style={{ fontFamily:"var(--font-barlow)", fontWeight:800, fontSize:"1.5rem", letterSpacing:".03em", marginBottom:".5rem", color:"var(--ink)" }}>{p.name}</div>
      <div style={{ fontSize:".83rem", color:"var(--ink2)", lineHeight:1.7, marginBottom:"1.25rem" }}>{p.desc}</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:".35rem" }}>
        {p.tags.map(([label, type]) => <Tag key={label} label={label} type={type} />)}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });
  const headingY  = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headingOp = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="projects" className="sec-pad" ref={sectionRef} style={{ maxWidth:1100, margin:"0 auto", padding:"4.5rem 3rem", position:"relative", zIndex:2 }}>
      <motion.div style={{ y: headingY, opacity: headingOp }}>
        <p style={eyebrow}><span style={line} />Portfolio</p>
        <h2 className="sec-title-size" style={secTitle}>APPS I <span style={{ WebkitTextStroke:"2px var(--ink)", color:"transparent" }}>BUILT</span></h2>
      </motion.div>

      <div
        className="proj-grid-cols"
        style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
          gap:"1px", background:"var(--border)", border:"1px solid var(--border)",
          borderRadius:"10px", overflow:"hidden",
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.num} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

const eyebrow: React.CSSProperties = { display:"inline-flex", alignItems:"center", gap:".6rem", fontSize:".7rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--red)", marginBottom:".6rem" };
const line: React.CSSProperties = { width:20, height:2, background:"var(--red)", display:"inline-block" };
const secTitle: React.CSSProperties = { fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"clamp(2.8rem,6vw,5rem)", letterSpacing:".02em", lineHeight:0.92, marginBottom:"3rem", color:"var(--ink)" };
