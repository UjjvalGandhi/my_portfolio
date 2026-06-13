"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";

const links = [
  { label: "Skills",   href: "#skills"   },
  { label: "Work",     href: "#work"     },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
  { label: "Live ↗",  href: "http://www.ujjvalgandhi.online/", external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      className="nav-pad"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 3rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(245,245,220,0.95)" : "rgba(245,245,220,0.75)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.3s",
      }}
    >
      <a href="#" style={{ fontFamily:"var(--font-barlow)", fontWeight:900, fontSize:"1.6rem", letterSpacing:".05em", color:"var(--ink)", textDecoration:"none", cursor:"none" }}>
        UG<span style={{ color:"var(--red)" }}>.</span>
      </a>

      <ul className="nav-links-hide" style={{ display:"flex", gap:"2rem", listStyle:"none" }}>
        {links.map(l => (
          <li key={l.label}>
            {l.external
              ? <a href={l.href} target="_blank" rel="noopener" style={navLink}>{l.label}</a>
              : <button onClick={() => scrollTo(l.href)} style={{ ...navLink, background:"none", border:"none", cursor:"none" }}>{l.label}</button>
            }
          </li>
        ))}
      </ul>

      <a href="mailto:ujjval2804@gmail.com"
        style={{ display:"flex", alignItems:"center", gap:".4rem", padding:".5rem 1.2rem", background:"var(--ink)", color:"var(--bg)", fontSize:".75rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", borderRadius:"3px", textDecoration:"none", cursor:"none" }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--red)")}
        onMouseLeave={e => (e.currentTarget.style.background = "var(--ink)")}
      >
        <HiOutlineMail size={14} /> Hire Me
      </a>
    </motion.nav>
  );
}

const navLink: React.CSSProperties = { color:"var(--ink2)", textDecoration:"none", fontSize:".78rem", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase" };
