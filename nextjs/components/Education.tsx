"use client";
import { motion } from "framer-motion";
import { MdSchool, MdDateRange } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";

const edu = [
  {
    degree: "Masters in Computer Application",
    period: "2023 – 2025",
    university: "Charusat University",
    score: "8.91 CGPA",
  },
  {
    degree: "Bachelors in Computer Application",
    period: "2020 – 2023",
    university: "Sardar Patel University",
    score: "8.52 CGPA",
  },
];

export default function Education() {
  return (
    <section id="education" className="sec-pad" style={{ maxWidth:1100, margin:"0 auto", padding:"4.5rem 3rem", position:"relative", zIndex:2 }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
        <p style={eyebrow}><span style={line} />Education</p>
        <h2 className="sec-title-size" style={secTitle}>MY <span style={{ color:"var(--red)" }}>STUDIES</span></h2>
      </motion.div>

      {edu.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
          transition={{ duration:0.55, delay: i * 0.12 }}
          whileHover={{ x:6, borderColor:"rgba(227,83,54,0.3)" }}
          style={{ border:"1px solid var(--border)", borderRadius:"10px", background:"var(--card)", marginBottom:"1rem", overflow:"hidden", position:"relative" }}
        >
          {/* red left bar */}
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"linear-gradient(180deg, var(--red), var(--sand))", borderRadius:"0 0 0 10px" }} />
          <div style={{ padding:"2rem 2.25rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:".5rem", marginBottom:".4rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:".5rem", fontFamily:"var(--font-barlow)", fontWeight:800, fontSize:"1.6rem", letterSpacing:".03em", color:"var(--ink)" }}>
                <MdSchool size={22} color="var(--red)" /> {item.degree}
              </div>
              <div style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--red)", background:"rgba(227,83,54,.08)", border:"1px solid rgba(227,83,54,.2)", padding:".25rem .75rem", borderRadius:"3px" }}>
                {item.period}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:".4rem", fontSize:".85rem", color:"var(--ink2)", fontWeight:500 }}>
              <MdDateRange size={14} color="var(--brown)" />
              {item.university} · {item.score}
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

const eyebrow: React.CSSProperties = { display:"inline-flex", alignItems:"center", gap:".6rem", fontSize:".7rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--red)", marginBottom:".6rem" };
const line: React.CSSProperties = { width:20, height:2, background:"var(--red)", display:"inline-block" };
const secTitle: React.CSSProperties = { fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"clamp(2.8rem,6vw,5rem)", letterSpacing:".02em", lineHeight:0.92, marginBottom:"3rem", color:"var(--ink)" };
