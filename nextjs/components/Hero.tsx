"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";
import { Button } from "./ui";
import { scrollToSection } from "@/lib/scroll";
import SplitWords from "./anim/SplitWords";
import { initGsap } from "@/lib/gsap";

const EASE = [0.22, 1, 0.36, 1] as const;

const COMMANDS = [
  { cmd: "flutter build ipa --release",     out: "iOS · Android · Web · Desktop" },
  { cmd: "next build && vercel deploy",     out: "Next.js app live on the edge" },
  { cmd: "sam deploy --stack prasadam-api", out: "Node + Express on AWS Lambda" },
];

const TARGETS = [
  { label: "iOS",     sub: ".ipa" },
  { label: "Android", sub: ".aab" },
  { label: "Web",     sub: "SPA"  },
  { label: "Desktop", sub: ".app" },
];

/* State advances only from timer callbacks — no synchronous setState in
   the effect body, so StrictMode's double mount just re-arms it. */
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
  const reduce = useReducedMotion();
  const { text, done, index } = useTypewriter(!reduce);
  const svgRef = useRef<SVGSVGElement>(null);

  /* The platform targets start dim and light up in sequence as the hero
     scrolls away — the diagram reads as a pipeline running, rather than a
     static picture. They begin visible, so arriving at the page never shows
     an empty panel. */
  useLayoutEffect(() => {
    if (reduce) return;
    const el = svgRef.current;
    if (!el) return;

    const { gsap } = initGsap();
    const targets = el.querySelectorAll("[data-target]");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0.5 });
      gsap.to(targets, {
        opacity: 1,
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: el,
          /* Starts at the top of the panel rather than a percentage: the
             panel is already on screen at load, so a percentage start would
             begin part-way through and leave the initial state depending on
             viewport height. */
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  const fade = (d: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay: d, ease: EASE },
  });

  return (
    <section id="top" style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative" }}>
      <div className="hero-grid">
        {/* ───────────── LEFT ───────────── */}
        <div>
          <motion.div
            {...fade(0)}
            style={{
              display: "flex", alignItems: "center", gap: ".6rem",
              paddingBottom: "1.1rem", marginBottom: "2.2rem",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <span className="tick" style={{ animation: "blink-soft 2.4s infinite" }} />
            <span className="label">Available for work</span>
            <span className="label" style={{ marginLeft: "auto" }}>{profile.location}</span>
          </motion.div>

          <motion.h1
            {...fade(0.06)}
            className="display"
            style={{ fontSize: "clamp(2.9rem, 6.2vw, 7.2rem)", marginBottom: "1.75rem" }}
          >
            <SplitWords
              text="Full stack developer building for"
              highlight="every platform."
              highlightStyle={{ color: "var(--accent)" }}
              start="top 95%"
              stagger={0.045}
            />
          </motion.h1>

          <motion.div
            {...fade(0.14)}
            style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "2rem" }}
          >
            {profile.roles.map(r => (
              <span
                key={r}
                className="mono"
                style={{
                  fontSize: ".74rem",
                  padding: ".34rem .7rem",
                  border: "1px solid var(--line-2)",
                  color: "var(--ink-2)",
                }}
              >
                {r}
              </span>
            ))}
          </motion.div>

          <motion.p
            {...fade(0.2)}
            className="measure"
            style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--ink-2)", marginBottom: "2.5rem" }}
          >
            {profile.summary}
          </motion.p>

          <motion.div
            {...fade(0.28)}
            className="hero-cta"
            style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "3rem" }}
          >
            <Button
              variant="solid"
              onClick={() => scrollToSection("work")}
            >
              Selected work
            </Button>
            <Button variant="ghost" href={profile.resumeUrl} target="_blank">
              Résumé (PDF)
            </Button>
          </motion.div>

        </div>

        {/* ───────────── RIGHT: build diagram ───────────── */}
        <motion.div
          className="hero-visual panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
        >
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "1rem", padding: ".7rem .9rem",
              borderBottom: "1px solid var(--line)",
              background: "var(--bg-alt)",
            }}
          >
            <span className="label" style={{ fontSize: ".6rem" }}>Build pipeline</span>
            <span
              className="mono"
              style={{ fontSize: ".6rem", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: ".4rem" }}
            >
              <span className="tick" />
              CI passing
            </span>
          </div>

          <div
            className="mono"
            style={{
              padding: ".9rem", fontSize: ".76rem", color: "var(--ink)",
              borderBottom: "1px solid var(--line)",
              whiteSpace: "nowrap", overflow: "hidden", minHeight: "2.6rem",
            }}
          >
            <span style={{ color: "var(--ink-3)" }}>$</span> {text}
            {!reduce && <span className="caret" style={{ marginLeft: 1 }} />}
          </div>

          <div style={{ padding: "1.1rem .6rem" }}>
            <svg
              ref={svgRef}
              viewBox="0 0 440 210"
              style={{ width: "100%", height: "auto", display: "block" }}
              role="img"
              aria-label="One Dart codebase building to iOS, Android, Web and Desktop"
            >
              {TARGETS.map((t, i) => {
                const yc = 26 + i * 52;
                const d = `M146 105 C196 105, 214 ${yc}, 268 ${yc}`;
                return (
                  <g key={t.label}>
                    <path d={d} fill="none" stroke="#E4E4E7" strokeWidth="1" />
                    <path
                      className={reduce ? undefined : "flow-line"}
                      d={d}
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="1.25"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  </g>
                );
              })}

              <g>
                <rect x="10" y="78" width="136" height="54" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.25" />
                <text
                  x="78" y="101" textAnchor="middle" fill="#0A0A0A"
                  style={{ font: "600 14px var(--font-display), sans-serif", letterSpacing: "-.025em" }}
                >
                  1 codebase
                </text>
                <text
                  x="78" y="118" textAnchor="middle" fill="#A1A1AA"
                  style={{ font: "400 10px var(--font-mono), monospace" }}
                >
                  lib/main.dart
                </text>
              </g>

              {TARGETS.map((t, i) => {
                const yc = 26 + i * 52;
                return (
                  <g key={t.label} data-target>
                    <rect x="268" y={yc - 17} width="162" height="34" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
                    <rect x="268" y={yc - 17} width="3" height="34" fill="#2563EB" />
                    <text x="284" y={yc + 4} fill="#0A0A0A" style={{ font: "500 12px var(--font-inter), sans-serif" }}>
                      {t.label}
                    </text>
                    <text
                      x="418" y={yc + 4} textAnchor="end" fill="#A1A1AA"
                      style={{ font: "400 9.5px var(--font-mono), monospace" }}
                    >
                      {t.sub}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div
            className="mono"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "1rem", padding: ".7rem .9rem",
              borderTop: "1px solid var(--line)",
              fontSize: ".68rem",
            }}
          >
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0.3 }}
              transition={{ duration: 0.35 }}
              style={{ color: "var(--ink-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              → {COMMANDS[index].out}
            </motion.span>
            <span style={{ color: "var(--ink-3)", whiteSpace: "nowrap" }}>42.6s</span>
          </div>
        </motion.div>

          <motion.div
            {...fade(0.36)}
            className="hero-meta"
            style={{
              gridColumn: "1 / -1",
              display: "flex", justifyContent: "space-between",
              gap: "clamp(1.5rem, 4vw, 4rem)", flexWrap: "wrap",
              paddingTop: "1.5rem", marginTop: "1rem",
              borderTop: "1px solid var(--line)",
            }}
          >
            {[
              { k: "Email",    v: profile.email,  h: `mailto:${profile.email}` },
              { k: "GitHub",   v: "UjjvalGandhi", h: profile.github },
              { k: "LinkedIn", v: "ujjvalgandhi", h: profile.linkedin },
            ].map(x => (
              <span key={x.k} style={{ display: "grid", gap: ".3rem" }}>
                <span className="label" style={{ fontSize: ".6rem" }}>{x.k}</span>
                <a
                  className="link mono"
                  href={x.h}
                  target={x.h.startsWith("http") ? "_blank" : undefined}
                  rel={x.h.startsWith("http") ? "noopener" : undefined}
                  style={{ fontSize: ".78rem" }}
                >
                  {x.v}
                </a>
              </span>
            ))}
          </motion.div>
      </div>
    </section>
  );
}
