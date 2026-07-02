"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiFlutter, SiDart, SiFirebase, SiAndroidstudio, SiXcode, SiMongodb, SiPhp, SiPython } from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbApi, TbCpu } from "react-icons/tb";
import { MdSettingsSuggest } from "react-icons/md";

const skills = [
  { icon: <SiFlutter       size={28} color="#54C5F8" />, name: "Flutter"        },
  { icon: <SiDart          size={28} color="#0175C2" />, name: "Dart"           },
  { icon: <SiFirebase      size={28} color="#FFCA28" />, name: "Firebase"       },
  { icon: <MdSettingsSuggest size={28} color="#E35336" />, name: "GetX"         },
  { icon: <SiAndroidstudio size={28} color="#3DDC84" />, name: "Android Studio" },
  { icon: <SiXcode         size={28} color="#1575F9" />, name: "Xcode"          },
  { icon: <TbApi           size={28} color="#A0522D" />, name: "REST APIs"      },
  { icon: <SiMongodb       size={28} color="#47A248" />, name: "MongoDB"        },
  { icon: <TbCpu           size={28} color="#6b3a1f" />, name: "IoT / Embedded C" },
  { icon: <SiPhp           size={28} color="#777BB4" />, name: "PHP"            },
  { icon: <SiPython        size={28} color="#3776AB" />, name: "Python"         },
  { icon: <FaAws           size={28} color="#FF9900" />, name: "AWS"            },
];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 55%"],
  });
  const scale   = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y       = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y, background:"var(--card)", padding:"1.75rem 1rem", textAlign:"center", cursor:"default" }}
      whileHover={{ backgroundColor:"#EDEBD0", scale: 1.04, transition:{ duration:0.2 } }}
    >
      <div style={{ display:"flex", justifyContent:"center", marginBottom:".6rem" }}>{skill.icon}</div>
      <div style={{ fontSize:".78rem", fontWeight:700, color:"var(--ink2)", letterSpacing:".04em" }}>{skill.name}</div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headingOp = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="sec-pad"
      style={{ maxWidth:1100, margin:"0 auto", padding:"4.5rem 3rem", position:"relative", zIndex:2 }}
    >
      <motion.div style={{ y: headingY, opacity: headingOp }}>
        <p style={eyebrow}><span style={line} />Stack</p>
        <h2 className="sec-title-size" style={secTitle}>
          FLUTTER <span style={{ WebkitTextStroke:"2px var(--ink)", color:"transparent" }}>TOOLKIT</span>
        </h2>
      </motion.div>

      <div
        className="sk-grid-cols"
        style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(140px,1fr))",
          gap:"1px", background:"var(--border)", border:"1px solid var(--border)",
          borderRadius:"10px", overflow:"hidden",
        }}
      >
        {skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} index={i} />
        ))}
      </div>
    </section>
  );
}

const eyebrow: React.CSSProperties = { display:"inline-flex", alignItems:"center", gap:".6rem", fontSize:".7rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--red)", marginBottom:".6rem" };
const line: React.CSSProperties = { width:20, height:2, background:"var(--red)", display:"inline-block" };
const secTitle: React.CSSProperties = { fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"clamp(2.8rem,6vw,5rem)", letterSpacing:".02em", lineHeight:0.92, marginBottom:"3rem", color:"var(--ink)" };
