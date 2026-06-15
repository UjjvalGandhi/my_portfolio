"use client";
import { motion } from "framer-motion";
import { SiAndroid } from "react-icons/si";
import { FaApple, FaDesktop, FaGlobe, FaFilePdf } from "react-icons/fa";

// Replace src with your real app screenshots (drop them in public/screens/)
const phones = [
  { src: "/screens/app2.png", alt: "App screen 1", x: -118, rot: -10, ry: -14, scale: 0.84, z: 1 },
  { src: "/screens/app1.png", alt: "App screen 2", x: 0,    rot: 0,   ry: 0,   scale: 1,    z: 3 },
  { src: "/screens/app3.png", alt: "App screen 3", x: 118,  rot: 10,  ry: 14,  scale: 0.84, z: 1 },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const platforms = [
  { icon: <SiAndroid size={14} color="#3DDC84" />, label: "Android" },
  { icon: <FaApple   size={14} color="#555"    />, label: "iOS"     },
  { icon: <FaGlobe   size={14} color="#4A90D9" />, label: "Web"     },
  { icon: <FaDesktop size={14} color="#7b6b5a" />, label: "Desktop" },
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="hero" style={{ minHeight:"92vh", maxWidth:1600, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr auto", gridTemplateRows:"1fr auto", paddingTop:0 }}>

      {/* ── LEFT ── */}
      <div className="hero-left-pad" style={{ background:"var(--bg)", padding:"6.5rem 3rem 2.5rem", display:"flex", flexDirection:"column", justifyContent:"flex-start", position:"relative", overflow:"hidden" }}>

        <motion.p {...fadeUp(0.1)} style={{ display:"inline-flex", alignItems:"center", gap:".6rem", fontSize:".72rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--red)", marginBottom:"1.5rem" }}>
          <span style={{ width:24, height:2, background:"var(--red)", display:"inline-block" }} />
          Flutter Developer · Available for hire
        </motion.p>

        <motion.h1 {...fadeUp(0.2)} className="hero-name-size" style={{ fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"clamp(5rem,12vw,11rem)", lineHeight:0.88, letterSpacing:"-.01em", color:"var(--ink)" }}>
          UJJAWAL<br />
          <span style={{ WebkitTextStroke:"2px var(--ink)", color:"transparent" }}>GANDHI</span>
        </motion.h1>

        <motion.div {...fadeUp(0.35)} style={{ marginTop:"2rem", display:"flex", flexDirection:"column", gap:"1.2rem" }}>
          <p style={{ maxWidth:340, fontSize:".92rem", lineHeight:1.7, color:"var(--ink2)" }}>
            Building beautiful cross-platform apps for{" "}
            <strong style={{ color:"var(--ink)", fontWeight:700 }}>Android, iOS, Web &amp; Desktop</strong>{" "}— using Flutter &amp; Dart.
          </p>
          <div className="plat-wrap" style={{ display:"flex", gap:".5rem", flexWrap:"wrap" }}>
            {platforms.map(p => (
              <div key={p.label} style={{ display:"flex", alignItems:"center", gap:".4rem", padding:".35rem .9rem", border:"1.5px solid var(--border)", borderRadius:"3px", fontSize:".72rem", fontWeight:600, letterSpacing:".05em", color:"var(--ink2)", background:"var(--card)" }}>
                {p.icon} {p.label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.5)} className="cta-stack" style={{ display:"flex", gap:".75rem", flexWrap:"wrap", marginTop:"2.5rem" }}>
          <button onClick={() => scrollTo("#projects")} style={btnP}>View Projects</button>
          <a href="/resume.pdf" target="_blank" rel="noopener" style={{ ...btnS, display:"inline-flex", alignItems:"center", gap:".5rem" }}><FaFilePdf size={14} color="var(--red)" /> Resume</a>
          <button onClick={() => scrollTo("#contact")}  style={btnS}>Let&apos;s Talk</button>
          <a href="http://www.ujjvalgandhi.online/" target="_blank" rel="noopener" style={{ ...btnS, display:"inline-block" }}>Live Site ↗</a>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <motion.div className="hero-right-panel"
        initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }}
        transition={{ duration:0.8, delay:0.2, ease:"easeOut" }}
        style={{ width:"clamp(360px, 38%, 560px)", background:"transparent", position:"relative", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem" }}
      >
        {/* half-circle backdrop, anchored to right edge, behind phones */}
        <div className="hero-circle" style={{ position:"absolute", right:-60, top:"50%", transform:"translateY(-50%)", width:520, height:1040, borderRadius:"1040px 0 0 1040px", background:"var(--sand)", opacity:0.5, zIndex:0, pointerEvents:"none" }} />

        {/* ── 3D PHONE FAN ── */}
        <div className="phone-fan" style={{ position:"relative", zIndex:1, width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", perspective:"1400px" }}>
          {phones.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity:0, y:40, x:p.x, rotate:p.rot, rotateY:p.ry, scale:p.scale }}
              animate={{ opacity:1, y:0, x:p.x, rotate:p.rot, rotateY:p.ry, scale:p.scale }}
              transition={{ duration:0.8, delay:0.4 + i*0.12, ease:"easeOut" }}
              whileHover={{ y:-14, scale:p.scale*1.05, zIndex:5, transition:{ duration:0.3 } }}
              style={{
                position:"absolute",
                zIndex:p.z,
              }}
            >
              <div style={{
                width:182, height:380, borderRadius:30, background:"#0e0b09",
                padding:7, boxShadow:`0 ${18+p.z*6}px ${40+p.z*10}px rgba(20,8,3,${0.28+p.z*0.06})`,
                border:"1px solid rgba(255,255,255,.08)",
              }}>
                {/* notch */}
                <div style={{ position:"absolute", top:14, left:"50%", transform:"translateX(-50%)", width:48, height:13, borderRadius:8, background:"#0e0b09", zIndex:2 }} />
                <div style={{ width:"100%", height:"100%", borderRadius:24, overflow:"hidden", position:"relative", background:"#1c1c1c" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── BOTTOM BAR ── */}
      <motion.div {...fadeUp(0.65)} className="hero-bottom-bar" style={{ gridColumn:"1/-1", borderTop:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.2rem 3rem", fontSize:".7rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"var(--ink2)" }}>
        <span style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--red)", boxShadow:"0 0 8px var(--red)", display:"inline-block", animation:"blink 2s infinite" }} />
          Open to opportunities
        </span>
        <span>Anand, Gujarat, India</span>
        <span>ujjval2804@gmail.com</span>
      </motion.div>
    </section>
  );
}

const btnP: React.CSSProperties = { padding:".85rem 2.2rem", background:"var(--ink)", color:"var(--bg)", fontFamily:"var(--font-dm-sans)", fontSize:".82rem", fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", border:"none", borderRadius:"3px", cursor:"none" };
const btnS: React.CSSProperties = { padding:".85rem 2.2rem", background:"transparent", color:"var(--ink)", fontFamily:"var(--font-dm-sans)", fontSize:".82rem", fontWeight:600, letterSpacing:".07em", textTransform:"uppercase", border:"1.5px solid var(--ink)", borderRadius:"3px", textDecoration:"none", cursor:"none" };
