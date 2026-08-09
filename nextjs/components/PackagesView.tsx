"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaApple, FaTerminal, FaRegThumbsUp, FaDownload } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import type { PubPackage } from "./Packages";

const icons: Record<string, React.ReactNode> = {
  liquid_glass_bottom_nav_native: <FaApple size={30} color="#555" />,
  liquid_glass_bottom_nav_cli: <FaTerminal size={26} color="#E35336" />,
};

const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const Platform = ({ label }: { label: string }) => (
  <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", padding:".2rem .65rem", borderRadius:"2px", background:"rgba(160,82,45,.08)", color:"var(--brown)", border:"1px solid rgba(160,82,45,.18)" }}>{label}</span>
);

const Stat = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:".2rem" }}>
    <span style={{ display:"flex", alignItems:"center", gap:".35rem", fontFamily:"var(--font-barlow)", fontWeight:800, fontSize:"1.15rem", color:"var(--ink)", lineHeight:1 }}>
      {icon} {value}
    </span>
    <span style={{ fontSize:".6rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--ink2)", opacity:.75 }}>{label}</span>
  </div>
);

function PackageCard({ pkg, index }: { pkg: PubPackage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 40%"],
  });

  const xStart   = index % 2 === 0 ? -40 : 40;
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
        overflow:"hidden", display:"flex", flexDirection:"column",
        transformStyle:"preserve-3d", perspective:800,
      }}
      whileHover={{ backgroundColor:"#EDEBD0", y:-6, transition:{ duration:0.25 } }}
    >
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"1rem", marginBottom:"1rem" }}>
        {icons[pkg.name]}
        <span style={{ fontFamily:mono, fontSize:".7rem", fontWeight:700, letterSpacing:".04em", color:"var(--red)", background:"rgba(227,83,54,.08)", border:"1px solid rgba(227,83,54,.2)", padding:".25rem .7rem", borderRadius:"3px", whiteSpace:"nowrap" }}>
          v{pkg.version}
        </span>
      </div>

      <div className="pk-name" style={{ fontFamily:mono, fontWeight:700, fontSize:".98rem", letterSpacing:"-.01em", marginBottom:".6rem", color:"var(--ink)", wordBreak:"break-word" }}>
        {pkg.name}
      </div>

      <div style={{ fontSize:".83rem", color:"var(--ink2)", lineHeight:1.7, marginBottom:"1.25rem" }}>
        {pkg.description}
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:".35rem", marginBottom:"1.5rem" }}>
        {pkg.platforms.map(p => <Platform key={p} label={p} />)}
      </div>

      {/* stats + install pinned to the bottom so cards line up */}
      <div style={{ marginTop:"auto" }}>
        <div style={{ display:"flex", gap:"1.75rem", flexWrap:"wrap", paddingTop:"1.25rem", borderTop:"1px solid var(--border)", marginBottom:"1.25rem" }}>
          <Stat icon={<MdVerified size={14} color="var(--red)" />} value={`${pkg.points}/${pkg.maxPoints}`} label="Pub points" />
          <Stat icon={<FaRegThumbsUp size={12} color="var(--red)" />} value={String(pkg.likes)} label="Likes" />
          <Stat icon={<FaDownload size={12} color="var(--red)" />} value={String(pkg.downloads)} label="Downloads / 30d" />
        </div>

        <div style={{ fontFamily:mono, fontSize:".7rem", color:"var(--ink2)", background:"rgba(28,10,4,.04)", border:"1px solid var(--border)", borderRadius:"4px", padding:".55rem .75rem", marginBottom:"1rem", overflowX:"auto", whiteSpace:"nowrap" }}>
          <span style={{ color:"var(--red)" }}>$</span> flutter pub add {pkg.name}
        </div>

        <motion.a
          href={`https://pub.dev/packages/${pkg.name}`}
          target="_blank"
          rel="noopener"
          whileHover={{ backgroundColor:"var(--red)", borderColor:"var(--red)", color:"#F5F5DC" }}
          style={{ display:"inline-flex", alignItems:"center", gap:".45rem", padding:".6rem 1.3rem", border:"1.5px solid var(--ink)", borderRadius:"3px", textDecoration:"none", color:"var(--ink)", fontSize:".75rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", cursor:"none" }}
        >
          View on pub.dev ↗
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function PackagesView({ packages }: { packages: PubPackage[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });
  const headingY  = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headingOp = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="packages" className="sec-pad" ref={sectionRef} style={{ maxWidth:1100, margin:"0 auto", padding:"4.5rem 3rem", position:"relative", zIndex:2 }}>
      <motion.div style={{ y: headingY, opacity: headingOp }}>
        <p style={eyebrow}><span style={line} />Open Source</p>
        <h2 className="sec-title-size" style={secTitle}>PACKAGES I <span style={{ WebkitTextStroke:"2px var(--ink)", color:"transparent" }}>PUBLISHED</span></h2>
      </motion.div>

      <div
        className="pk-grid-cols"
        style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
          gap:"1px", background:"var(--border)", border:"1px solid var(--border)",
          borderRadius:"10px", overflow:"hidden",
        }}
      >
        {packages.map((p, i) => (
          <PackageCard key={p.name} pkg={p} index={i} />
        ))}
      </div>
    </section>
  );
}

const eyebrow: React.CSSProperties = { display:"inline-flex", alignItems:"center", gap:".6rem", fontSize:".7rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--red)", marginBottom:".6rem" };
const line: React.CSSProperties = { width:20, height:2, background:"var(--red)", display:"inline-block" };
const secTitle: React.CSSProperties = { fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"clamp(2.8rem,6vw,5rem)", letterSpacing:".02em", lineHeight:0.92, marginBottom:"3rem", color:"var(--ink)" };
