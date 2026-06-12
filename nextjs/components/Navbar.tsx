"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Skills",    href: "#skills"   },
  { label: "Work",      href: "#work"     },
  { label: "Projects",  href: "#projects" },
  { label: "Contact",   href: "#contact"  },
  { label: "Live ↗",   href: "http://www.ujjvalgandhi.online/", external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 3rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(245,245,220,0.92)" : "rgba(245,245,220,0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(160,82,45,0.14)",
        transition: "background 0.3s",
      }}
    >
      <a href="#" style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "1.6rem", letterSpacing: ".05em", color: "var(--ink)", textDecoration: "none", cursor: "none" }}>
        UG<span style={{ color: "var(--red)" }}>.</span>
      </a>

      <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener" style={navLinkStyle}>{l.label}</a>
            ) : (
              <button onClick={() => scrollTo(l.href)} style={{ ...navLinkStyle, background: "none", border: "none", cursor: "none" }}>
                {l.label}
              </button>
            )}
          </li>
        ))}
      </ul>

      <a href="mailto:ujjval2804@gmail.com" style={{
        padding: ".5rem 1.4rem",
        background: "var(--ink)", color: "var(--bg)",
        fontSize: ".75rem", fontWeight: 700,
        letterSpacing: ".08em", textTransform: "uppercase",
        borderRadius: "3px", textDecoration: "none", cursor: "none",
        transition: "background .2s",
      }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--red)")}
        onMouseLeave={e => (e.currentTarget.style.background = "var(--ink)")}
      >
        Hire Me
      </a>
    </motion.nav>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: "var(--ink2)", textDecoration: "none",
  fontSize: ".78rem", fontWeight: 600,
  letterSpacing: ".1em", textTransform: "uppercase",
};
