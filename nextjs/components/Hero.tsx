"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";
import { PrimaryButton, GhostButton } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const COMMANDS = [
  { cmd: "flutter build ipa --release", out: "✓ iOS · Android · Web · Desktop" },
  { cmd: "next build && vercel deploy", out: "✓ Next.js app live on the edge" },
  { cmd: "sam deploy --stack prasadam-api", out: "✓ Node + Express on AWS Lambda" },
];

const TARGETS = [
  { label: "iOS",     sub: ".ipa",  color: "#22D3EE" },
  { label: "Android", sub: ".aab",  color: "#A3E635" },
  { label: "Web",     sub: "SPA",   color: "#818CF8" },
  { label: "Desktop", sub: ".app",  color: "#F472B6" },
];

/* ── typewriter that cycles through the commands ─────────────────
   State advances only from timer callbacks, never synchronously in the
   effect body, so there are no cascading renders and StrictMode's double
   mount just re-arms the same timeout. */
function useTypewriter(enabled: boolean) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);

  const full = COMMANDS[i].cmd;
  const complete = n >= full.length;

  useEffect(() => {
    if (!enabled) return;

    if (complete) {
      const hold = setTimeout(() => {
        setI(v => (v + 1) % COMMANDS.length);
        setN(0);
      }, 2600);
      return () => clearTimeout(hold);
    }

    const tick = setTimeout(() => setN(v => v + 1), 42);
    return () => clearTimeout(tick);
  }, [enabled, complete, full]);

  if (!enabled) return { text: full, done: true, index: i };
  return { text: full.slice(0, n), done: complete, index: i };
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { text, done, index } = useTypewriter(!reduce);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      style={{
        position: "relative",
        zIndex: 2,
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        padding: "8.5rem 2.5rem 5rem",
        maxWidth: 1320,
        margin: "0 auto",
      }}
    >
      <motion.div
        style={{ y, opacity, width: "100%" }}
        className="hero-grid-wrap"
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: "4.5rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* ─────────────────── LEFT ─────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mono glass"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".6rem",
                padding: ".42rem .9rem .42rem .7rem", borderRadius: 999,
                fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase",
                color: "var(--text-dim)", marginBottom: "1.8rem",
              }}
            >
              <span
                style={{
                  width: 7, height: 7, borderRadius: "50%", background: "var(--lime)",
                  boxShadow: "0 0 10px var(--lime)", animation: "pulse-dot 2.2s infinite",
                }}
              />
              Open to opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(3.1rem, 7.4vw, 6.4rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.045em",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ display: "block", color: "var(--text)" }}>{profile.first}</span>
              <span className="grad-text" style={{ display: "block" }}>{profile.last}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              style={{
                display: "flex", alignItems: "center", flexWrap: "wrap",
                gap: ".55rem", marginBottom: "1.6rem",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.22rem)", fontWeight: 600,
                  letterSpacing: "-.015em", color: "var(--text)",
                }}
              >
                {profile.role}
              </span>
              <span style={{ color: "var(--text-faint)" }}>·</span>
              {profile.roles.map((r, i) => (
                <span key={r} style={{ display: "inline-flex", alignItems: "center", gap: ".55rem" }}>
                  <span className="mono" style={{ fontSize: ".84rem", color: "var(--cyan)" }}>{r}</span>
                  {i < profile.roles.length - 1 && (
                    <span style={{ color: "var(--text-faint)", fontSize: ".7rem" }}>/</span>
                  )}
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              style={{
                maxWidth: 480, fontSize: "1rem", lineHeight: 1.78,
                color: "var(--text-dim)", marginBottom: "2.4rem",
              }}
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="hero-cta"
              style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginBottom: "2.8rem" }}
            >
              <PrimaryButton onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
                View work →
              </PrimaryButton>
              <GhostButton href={profile.resumeUrl} target="_blank">
                Résumé ↓
              </GhostButton>
              <GhostButton href={profile.github} target="_blank">
                GitHub ↗
              </GhostButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mono hero-meta"
              style={{
                display: "flex", gap: "2rem", flexWrap: "wrap",
                paddingTop: "1.6rem", borderTop: "1px solid var(--stroke)",
                fontSize: ".72rem", letterSpacing: ".06em", color: "var(--text-faint)",
              }}
            >
              <span>{profile.location}</span>
              <a href={`mailto:${profile.email}`} style={{ color: "var(--text-dim)", textDecoration: "none" }}>
                {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener" style={{ color: "var(--text-dim)", textDecoration: "none" }}>
                LinkedIn ↗
              </a>
            </motion.div>
          </div>

          {/* ─────────────────── RIGHT: build pipeline ─────────────────── */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 34, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            style={{ position: "relative" }}
          >
            {/* glow behind the panel */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: "-14%",
                background: "radial-gradient(ellipse at 60% 40%, rgba(129,140,248,.26), transparent 65%)",
                filter: "blur(44px)", pointerEvents: "none",
              }}
            />

            <div
              className="glass"
              style={{
                position: "relative",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                boxShadow: "0 40px 90px -30px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.04) inset",
              }}
            >
              {/* terminal chrome */}
              <div
                style={{
                  display: "flex", alignItems: "center", gap: ".6rem",
                  padding: ".8rem 1.1rem",
                  borderBottom: "1px solid var(--stroke)",
                  background: "rgba(255,255,255,.025)",
                }}
              >
                <span style={{ display: "flex", gap: ".4rem" }}>
                  {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
                    <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: .9 }} />
                  ))}
                </span>
                <span
                  className="mono"
                  style={{ fontSize: ".68rem", color: "var(--text-faint)", marginLeft: ".4rem", letterSpacing: ".04em" }}
                >
                  ujjawal@build — one codebase
                </span>
                <span
                  className="mono"
                  style={{
                    marginLeft: "auto", fontSize: ".6rem", letterSpacing: ".14em",
                    textTransform: "uppercase", color: "var(--lime)",
                    display: "inline-flex", alignItems: "center", gap: ".35rem",
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--lime)", boxShadow: "0 0 8px var(--lime)" }} />
                  CI passing
                </span>
              </div>

              {/* command line */}
              <div
                className="mono"
                style={{
                  padding: "1rem 1.2rem .35rem",
                  fontSize: ".78rem",
                  color: "var(--text)",
                  minHeight: "2.1rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <span style={{ color: "var(--cyan)" }}>❯</span>{" "}
                <span>{text}</span>
                {!reduce && <span className="caret" style={{ marginLeft: 2 }} />}
              </div>

              {/* pipeline diagram */}
              <div style={{ padding: ".4rem .5rem 0" }}>
                <svg viewBox="0 0 460 236" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="One Dart codebase building to iOS, Android, Web and Desktop">
                  <defs>
                    <linearGradient id="gw" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#818CF8" />
                    </linearGradient>
                    <linearGradient id="src" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(34,211,238,.18)" />
                      <stop offset="100%" stopColor="rgba(129,140,248,.1)" />
                    </linearGradient>
                  </defs>

                  {/* connectors */}
                  {TARGETS.map((t, i) => {
                    const yc = 30 + i * 54;
                    const d = `M150 111 C206 111, 228 ${yc}, 286 ${yc}`;
                    return (
                      <g key={t.label}>
                        <path d={d} fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1.4" />
                        <path
                          id={`p${i}`}
                          className={reduce ? undefined : "flow-line"}
                          d={d}
                          fill="none"
                          stroke={t.color}
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          opacity=".85"
                          style={{ animationDelay: `${i * 0.18}s` }}
                        />
                      </g>
                    );
                  })}

                  {/* source node */}
                  <g>
                    <rect x="14" y="78" width="136" height="66" rx="15" fill="url(#src)" stroke="url(#gw)" strokeWidth="1.2" />
                    <text x="82" y="105" textAnchor="middle" fill="#ECECF4" style={{ font: "600 15px var(--font-display), sans-serif", letterSpacing: "-.02em" }}>
                      1 codebase
                    </text>
                    <text x="82" y="124" textAnchor="middle" fill="#9797A8" style={{ font: "400 10.5px var(--font-mono), monospace", letterSpacing: ".04em" }}>
                      lib/main.dart
                    </text>
                  </g>

                  {/* targets */}
                  {TARGETS.map((t, i) => {
                    const yc = 30 + i * 54;
                    return (
                      <g key={t.label} className={reduce ? undefined : "tgt"} style={{ animationDelay: `${i * 0.35}s` }}>
                        <rect
                          x="286" y={yc - 20} width="160" height="40" rx="11"
                          fill="rgba(255,255,255,.035)" stroke={`${t.color}44`} strokeWidth="1"
                        />
                        <circle cx="306" cy={yc} r="3.5" fill={t.color} />
                        <text x="320" y={yc + 4.5} fill="#ECECF4" style={{ font: "500 12.5px var(--font-inter), sans-serif" }}>
                          {t.label}
                        </text>
                        <text x="432" y={yc + 4} textAnchor="end" fill="#5E5E6E" style={{ font: "400 10px var(--font-mono), monospace" }}>
                          {t.sub}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* output line */}
              <div
                className="mono"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: "1rem", padding: ".85rem 1.2rem",
                  borderTop: "1px solid var(--stroke)",
                  background: "rgba(255,255,255,.02)",
                  fontSize: ".7rem", letterSpacing: ".03em",
                }}
              >
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: done ? 1 : 0.25, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ color: "var(--lime)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {COMMANDS[index].out}
                </motion.span>
                <span style={{ color: "var(--text-faint)", whiteSpace: "nowrap" }}>42.6s</span>
              </div>
            </div>

            {/* floating pub.dev badge */}
            <motion.a
              href="https://pub.dev/packages/liquid_glass_bottom_nav_native"
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
              whileHover={{ y: -4 }}
              className="glass pkg-float"
              style={{
                position: "absolute", right: "-1.2rem", bottom: "-1.9rem",
                display: "flex", alignItems: "center", gap: ".75rem",
                padding: ".7rem .95rem", borderRadius: 14,
                textDecoration: "none",
                background: "rgba(11,11,18,.9)",
                boxShadow: "0 18px 46px -16px rgba(0,0,0,.9)",
              }}
            >
              <span
                style={{
                  display: "grid", placeItems: "center", width: 34, height: 34,
                  borderRadius: 10, background: "rgba(34,211,238,.12)",
                  border: "1px solid rgba(34,211,238,.3)", color: "var(--cyan)",
                  fontSize: ".95rem",
                }}
              >
                ◆
              </span>
              <span style={{ display: "grid", gap: ".15rem" }}>
                <span className="mono" style={{ fontSize: ".66rem", color: "var(--text)", letterSpacing: ".01em" }}>
                  liquid_glass_bottom_nav
                </span>
                <span className="mono" style={{ fontSize: ".6rem", color: "var(--text-faint)", letterSpacing: ".06em" }}>
                  <span style={{ color: "var(--lime)" }}>160/160</span> pub points · pub.dev
                </span>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes tgt-pulse {
          0%, 72%, 100% { opacity: .55; }
          80%           { opacity: 1; }
        }
        .tgt { animation: tgt-pulse 3.4s ease-in-out infinite; }
        @media (max-width: 1024px) {
          .pkg-float { right: 0 !important; }
        }
        @media (max-width: 640px) {
          .pkg-float { position: static !important; margin-top: 1.1rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tgt { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
