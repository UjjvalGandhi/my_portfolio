"use client";
import { motion } from "framer-motion";
import { MdLocationOn, MdWork } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";

const jobs = [
  {
    role: "Flutter Developer",
    period: "May 2025 – Present",
    company: "Park Universal PVT. LTD",
    location: "Anand, Gujarat",
    points: [
      "Cross-platform ERP (Web, Android, iOS, Desktop) integrated with Tally using Flutter + GetX",
      "Data sync, real-time exchange, transaction posting & report generation",
      "Modular GetX architecture for scalability across all platforms",
    ],
  },
  {
    role: "Flutter Developer",
    period: "Nov 2024 – Apr 2025",
    company: "WebEarl Technologies",
    location: "Ahmedabad, Gujarat",
    points: [
      "Built CricGem — fantasy cricket app on Android & iOS with Flutter + Firebase",
      "Real-time data sync, live match updates & seamless cross-platform UI",
    ],
  },
];

export default function Experience() {
  return (
    <section id="work" className="sec-pad" style={{ maxWidth:1100, margin:"0 auto", padding:"4.5rem 3rem", position:"relative", zIndex:2 }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
        <p style={eyebrow}><span style={line} />Experience</p>
        <h2 className="sec-title-size" style={secTitle}>WHERE I <span style={{ color:"var(--red)" }}>WORKED</span></h2>
      </motion.div>

      {jobs.map((job, i) => (
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
                <MdWork size={22} color="var(--red)" /> {job.role}
              </div>
              <div style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--red)", background:"rgba(227,83,54,.08)", border:"1px solid rgba(227,83,54,.2)", padding:".25rem .75rem", borderRadius:"3px" }}>
                {job.period}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:".4rem", fontSize:".85rem", color:"var(--ink2)", marginBottom:"1rem", fontWeight:500 }}>
              <MdLocationOn size={14} color="var(--brown)" />
              {job.company} · {job.location}
            </div>
            <ul style={{ listStyle:"none" }}>
              {job.points.map((pt, j) => (
                <li key={j} style={{ display:"flex", alignItems:"flex-start", gap:".7rem", fontSize:".85rem", color:"var(--ink2)", lineHeight:1.65, padding:".35rem 0", borderTop: j === 0 ? "none" : "1px solid var(--border)" }}>
                  <BsCircleFill size={6} color="var(--red)" style={{ marginTop:"0.45rem", flexShrink:0 }} />
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

const eyebrow: React.CSSProperties = { display:"inline-flex", alignItems:"center", gap:".6rem", fontSize:".7rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--red)", marginBottom:".6rem" };
const line: React.CSSProperties = { width:20, height:2, background:"var(--red)", display:"inline-block" };
const secTitle: React.CSSProperties = { fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"clamp(2.8rem,6vw,5rem)", letterSpacing:".02em", lineHeight:0.92, marginBottom:"3rem", color:"var(--ink)" };
