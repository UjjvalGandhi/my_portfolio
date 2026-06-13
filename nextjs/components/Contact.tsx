"use client";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

const links = [
  { icon: <TbWorld      size={16} />, label: "ujjvalgandhi.online",  href: "http://www.ujjvalgandhi.online/", primary: true  },
  { icon: <HiOutlineMail size={16} />, label: "ujjval2804@gmail.com", href: "mailto:ujjval2804@gmail.com"                    },
  { icon: <HiOutlinePhone size={16} />, label: "+91 99987 60436",     href: "tel:+919998760436"                              },
  { icon: <FaLinkedinIn   size={16} />, label: "LinkedIn",              href: "https://linkedin.com/in/ujjvalgandhi"           },
  { icon: <SiGithub     size={16} />, label: "GitHub",                href: "https://github.com/UjjvalGandhi"               },
];

export default function Contact() {
  return (
    <section id="contact" style={{ background:"var(--ink)", position:"relative", zIndex:2 }}>
      <div className="ct-pad" style={{ maxWidth:1100, margin:"0 auto", padding:"6rem 3rem" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p style={{ display:"inline-flex", alignItems:"center", gap:".6rem", fontSize:".7rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"var(--sand)", marginBottom:".6rem" }}>
            <span style={{ width:20, height:2, background:"var(--sand)", display:"inline-block" }} />Get in touch
          </p>
          <div className="sec-title-size" style={{ fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"clamp(3rem,7vw,6.5rem)", lineHeight:0.88, letterSpacing:".02em", color:"var(--bg)", marginBottom:"1rem" }}>
            LET&apos;S BUILD<br />SOMETHING <span style={{ color:"var(--red)" }}>GREAT</span>
          </div>
          <p style={{ color:"var(--ink3)", fontSize:".95rem", maxWidth:400, lineHeight:1.7, marginBottom:"3rem" }}>
            Open to full-time Flutter roles &amp; freelance projects — Anand, Gujarat. Remote OK.
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.15 }}
          className="ct-grid-cols"
          style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:".75rem" }}
        >
          {links.map(l => (
            <motion.a key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener"
              whileHover={{ y:-3, borderColor:"var(--red)", color:"var(--bg)", backgroundColor:"rgba(227,83,54,.18)" }}
              style={{ display:"flex", alignItems:"center", gap:".6rem", padding:"1rem 1.4rem", border: l.primary ? "1px solid var(--red)" : "1px solid rgba(245,245,220,.1)", borderRadius:"6px", textDecoration:"none", color: l.primary ? "var(--bg)" : "var(--ink3)", fontSize:".82rem", fontWeight: l.primary ? 700 : 500, background: l.primary ? "var(--red)" : "rgba(255,255,255,.03)", cursor:"none" }}
            >
              {l.icon} {l.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
