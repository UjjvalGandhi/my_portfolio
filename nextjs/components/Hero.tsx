"use client";
import { motion } from "framer-motion";
import { SiAndroid } from "react-icons/si";
import { FaApple, FaDesktop, FaGlobe } from "react-icons/fa";

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
    <section id="hero" style={{ minHeight:"92vh", display:"grid", gridTemplateColumns:"1fr auto", gridTemplateRows:"1fr auto", paddingTop:0 }}>

      {/* ── LEFT ── */}
      <div className="hero-left-pad" style={{ background:"var(--bg)", padding:"6.5rem 3rem 2.5rem", display:"flex", flexDirection:"column", justifyContent:"flex-start", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-80, top:"50%", transform:"translateY(-50%)", width:280, height:280, borderRadius:"50%", background:"var(--sand)", opacity:0.15, pointerEvents:"none" }} />

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
          <button onClick={() => scrollTo("#contact")}  style={btnS}>Let&apos;s Talk</button>
          <a href="http://www.ujjvalgandhi.online/" target="_blank" rel="noopener" style={{ ...btnS, display:"inline-block" }}>Live Site ↗</a>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <motion.div className="hero-right-panel"
        initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }}
        transition={{ duration:0.8, delay:0.2, ease:"easeOut" }}
        style={{ width:"34vw", background:"var(--sand)", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem" }}
      >
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(60% 60% at 30% 30%, rgba(227,83,54,.25), transparent), radial-gradient(50% 50% at 80% 80%, rgba(160,82,45,.3), transparent)" }} />
        <span style={{ position:"absolute", top:"1rem", right:"1.5rem", fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"7rem", color:"rgba(28,10,4,.07)", lineHeight:1, pointerEvents:"none" }}>01</span>

        <div className="hero-right-tag" style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
          <svg width="90" height="90" viewBox="0 0 100 100" style={{ marginBottom:"1.2rem", filter:"drop-shadow(0 8px 28px rgba(160,82,45,.4))", display:"block" }}>
            <polygon points="22,56 50,28 78,28 50,56" fill="#E35336" opacity="0.95" />
            <polygon points="22,56 50,84 78,84 50,56" fill="#1C0A04" opacity="0.75" />
            <polygon points="50,56 78,28 78,56" fill="#E35336" opacity="0.45" />
            <polygon points="50,56 78,84 78,56" fill="#A0522D" opacity="0.8" />
          </svg>
          <div style={{ fontFamily:"var(--font-barlow)", fontWeight:800, fontSize:"clamp(1.4rem,2.5vw,2.2rem)", letterSpacing:".04em", color:"var(--ink)", lineHeight:1.1 }}>1+ Year<br />Flutter Dev</div>
          <div style={{ fontSize:".75rem", fontWeight:500, color:"var(--ink2)", marginTop:".5rem", letterSpacing:".06em" }}>Anand, Gujarat · Remote OK</div>
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
