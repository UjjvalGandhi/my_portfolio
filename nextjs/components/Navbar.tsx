"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const links = [
  { label: "About",      id: "about",      num: "01" },
  { label: "Stack",      id: "stack",      num: "02" },
  { label: "Experience", id: "experience", num: "03" },
  { label: "Work",       id: "work",       num: "04" },
  { label: "Packages",   id: "packages",   num: "05" },
  { label: "Contact",    id: "contact",    num: "06" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

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
        /* Let the sheet finish collapsing, or the re-flow strands the scroll. */
        setOpen(false);
        setTimeout(scroll, 360);
      } else {
        scroll();
      }
    },
    [open]
  );

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 200,
        background: "var(--bg)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          paddingInline: "var(--gut)",
          height: 75,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          borderLeft: "1px solid var(--line)",
          borderRight: "1px solid var(--line)",
          background: "var(--bg)",
        }}
      >
        {/* wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          style={{
            display: "flex", alignItems: "baseline", gap: ".55rem",
            background: "none", border: "none", padding: 0, cursor: "pointer",
          }}
        >
          <span className="display" style={{ fontSize: "1.1rem", letterSpacing: "-.045em", color: "var(--ink)" }}>
            Ujjawal Gandhi
          </span>
          <span className="mono" style={{ fontSize: ".66rem", color: "var(--ink-3)" }}>
            /dev
          </span>
        </button>

        {/* links */}
        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: ".25rem" }}>
          {links.map(l => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: ".4rem",
                  padding: ".5rem .7rem",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: ".82rem",
                  fontWeight: 500,
                  letterSpacing: "-.005em",
                  color: isActive ? "var(--ink)" : "var(--ink-2)",
                  transition: "color .2s var(--ease)",
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: ".58rem",
                    color: isActive ? "var(--accent)" : "var(--ink-3)",
                    transition: "color .2s var(--ease)",
                  }}
                >
                  {l.num}
                </span>
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-rule"
                    transition={{ type: "spring", stiffness: 480, damping: 40 }}
                    style={{
                      position: "absolute",
                      left: ".7rem", right: ".7rem", bottom: ".15rem",
                      height: 1.5,
                      background: "var(--accent)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <a className="btn btn--solid" href={`mailto:${profile.email}`} style={{ padding: ".6rem 1.1rem", fontSize: ".78rem" }}>
            Get in touch
          </a>

          <button
            className="nav-burger"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            style={{
              display: "none",
              width: 40, height: 40,
              border: "1px solid var(--line-2)",
              background: "var(--bg)",
              cursor: "pointer",
              placeItems: "center",
            }}
          >
            <span style={{ display: "grid", gap: 4 }}>
              <span style={{ display: "block", width: 15, height: 1.5, background: "var(--ink)", transform: open ? "translateY(5.5px) rotate(45deg)" : "none", transition: "transform .3s" }} />
              <span style={{ display: "block", width: 15, height: 1.5, background: "var(--ink)", opacity: open ? 0 : 1, transition: "opacity .2s" }} />
              <span style={{ display: "block", width: 15, height: 1.5, background: "var(--ink)", transform: open ? "translateY(-5.5px) rotate(-45deg)" : "none", transition: "transform .3s" }} />
            </span>
          </button>
        </div>
      </div>

      {/* mobile sheet — inert while closed so its links stay out of the
          tab order and the a11y tree on desktop */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        inert={!open}
        aria-hidden={!open}
        style={{ overflow: "hidden", background: "var(--bg)", borderTop: open ? "1px solid var(--line)" : "none" }}
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", paddingInline: "var(--gut)" }}>
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              style={{
                width: "100%",
                display: "flex", alignItems: "baseline", gap: ".8rem",
                padding: "1rem 0",
                borderBottom: "1px solid var(--line)",
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left",
                fontSize: "1.05rem",
                fontWeight: 500,
                color: active === l.id ? "var(--accent)" : "var(--ink)",
              }}
            >
              <span className="mono" style={{ fontSize: ".65rem", color: "var(--ink-3)" }}>{l.num}</span>
              {l.label}
            </button>
          ))}
          <div style={{ height: "1.25rem" }} />
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .nav-burger { display: grid !important; }
        }
        @media (max-width: 640px) {
          header > div:first-child { border-left: none; border-right: none; }
        }
      `}</style>
    </header>
  );
}
