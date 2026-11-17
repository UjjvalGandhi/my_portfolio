"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const links = [
  { label: "About",      id: "about"      },
  { label: "Stack",      id: "stack"      },
  { label: "Experience", id: "experience" },
  { label: "Work",       id: "work"       },
  { label: "Packages",   id: "packages"   },
  { label: "Contact",    id: "contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight whichever section owns the upper third of the viewport. */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.2, 0.6] }
    );
    links.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = useCallback(
    (id: string) => {
      const scroll = () =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

      if (open) {
        /* The mobile sheet collapsing re-flows the page mid-scroll, which
           strands the smooth scroll short of the target — so close it first
           and scroll once the height animation has settled. */
        setOpen(false);
        setTimeout(scroll, 360);
      } else {
        scroll();
      }
    },
    [open]
  );

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }}
    >
      <div
        className="nav-inner"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: scrolled ? ".7rem 2.5rem" : "1.1rem 2.5rem",
          maxWidth: 1320,
          margin: "0 auto",
          background: scrolled ? "rgba(7,7,11,.72)" : "transparent",
          backdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--stroke)" : "transparent"}`,
          transition: "padding .35s var(--ease), background .35s var(--ease), border-color .35s var(--ease)",
        }}
      >
        {/* wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "flex", alignItems: "center", gap: ".6rem",
            background: "none", border: "none", padding: 0, color: "inherit",
          }}
          aria-label="Back to top"
        >
          <span
            style={{
              display: "grid", placeItems: "center",
              width: 32, height: 32, borderRadius: 9,
              background: "var(--grad)", color: "#07070B",
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: ".86rem",
              letterSpacing: "-.02em",
              boxShadow: "0 4px 18px -4px rgba(129,140,248,.7)",
            }}
          >
            UG
          </span>
          <span
            className="mono"
            style={{ fontSize: ".78rem", letterSpacing: ".02em", color: "var(--text-dim)" }}
          >
            ujjawal<span style={{ color: "var(--cyan)" }}>.dev</span>
          </span>
        </button>

        {/* links */}
        <nav
          className="nav-links glass"
          style={{
            display: "flex", alignItems: "center", gap: ".15rem",
            padding: ".3rem", borderRadius: 999,
          }}
        >
          {links.map(l => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                style={{
                  position: "relative",
                  padding: ".5rem .95rem",
                  borderRadius: 999,
                  border: "none",
                  background: "none",
                  fontSize: ".79rem",
                  fontWeight: 500,
                  letterSpacing: ".005em",
                  color: isActive ? "var(--text)" : "var(--text-faint)",
                  transition: "color .3s var(--ease)",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    style={{
                      position: "absolute", inset: 0, borderRadius: 999,
                      background: "rgba(255,255,255,.08)",
                      border: "1px solid var(--stroke-2)",
                    }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{l.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ y: -2, boxShadow: "0 12px 34px -10px rgba(34,211,238,.7)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: ".45rem",
              padding: ".58rem 1.15rem", borderRadius: 999,
              background: "var(--grad)", color: "#07070B",
              fontSize: ".78rem", fontWeight: 700, textDecoration: "none",
              boxShadow: "0 6px 24px -10px rgba(129,140,248,.8)",
              whiteSpace: "nowrap",
            }}
          >
            Hire me
          </motion.a>

          {/* mobile menu toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="nav-burger"
            style={{
              display: "none",
              width: 38, height: 38, borderRadius: 11,
              background: "var(--glass)", border: "1px solid var(--stroke)",
              color: "var(--text)", placeItems: "center",
            }}
          >
            <span style={{ display: "grid", gap: 4 }}>
              <span style={{ display: "block", width: 15, height: 1.5, background: "currentColor", borderRadius: 2, transform: open ? "translateY(5.5px) rotate(45deg)" : "none", transition: "transform .3s" }} />
              <span style={{ display: "block", width: 15, height: 1.5, background: "currentColor", borderRadius: 2, opacity: open ? 0 : 1, transition: "opacity .2s" }} />
              <span style={{ display: "block", width: 15, height: 1.5, background: "currentColor", borderRadius: 2, transform: open ? "translateY(-5.5px) rotate(-45deg)" : "none", transition: "transform .3s" }} />
            </span>
          </button>
        </div>
      </div>

      {/* mobile sheet — `inert` while closed, otherwise the collapsed links
          stay in the tab order and the accessibility tree on desktop, where
          the sheet is never shown. */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        inert={!open}
        aria-hidden={!open}
        style={{ overflow: "hidden", background: "rgba(7,7,11,.95)", backdropFilter: "blur(22px)", borderBottom: open ? "1px solid var(--stroke)" : "none" }}
      >
        <div style={{ display: "grid", padding: "1rem 1.25rem 1.5rem", gap: ".2rem" }}>
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              style={{
                textAlign: "left", padding: ".8rem .6rem", borderRadius: 10,
                background: active === l.id ? "rgba(255,255,255,.06)" : "none",
                border: "none", color: active === l.id ? "var(--text)" : "var(--text-dim)",
                fontSize: "1rem", fontWeight: 500,
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          .nav-burger { display: grid !important; }
        }
      `}</style>
    </motion.header>
  );
}
