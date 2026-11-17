"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

/* ── Motion presets ─────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: EASE },
  }),
};

export const VIEWPORT = { once: true, margin: "-70px" } as const;

/** Fades + rises its children once they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  style,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      className={className}
      style={style}
      variants={riseIn}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Cmp>
  );
}

/* ── Section heading ────────────────────────────────────────── */
export function SectionHeading({
  eyebrow,
  title,
  accentWord,
  lead,
  index,
}: {
  eyebrow: string;
  title: string;
  accentWord?: string;
  lead?: string;
  index?: string;
}) {
  return (
    <div style={{ marginBottom: "3.5rem", maxWidth: 760 }}>
      <Reveal>
        <div
          className="mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".7rem",
            fontSize: ".7rem",
            fontWeight: 500,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "var(--text-faint)",
            marginBottom: "1.1rem",
          }}
        >
          {index && <span style={{ color: "var(--cyan)" }}>{index}</span>}
          <span
            style={{
              width: 26,
              height: 1,
              background: "linear-gradient(90deg, var(--cyan), transparent)",
              display: "inline-block",
            }}
          />
          {eyebrow}
        </div>
      </Reveal>

      <Reveal delay={1}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(2.4rem, 5.5vw, 4.1rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            color: "var(--text)",
          }}
        >
          {title}{" "}
          {accentWord && <span className="grad-text">{accentWord}</span>}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={2}>
          <p
            style={{
              marginTop: "1.1rem",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--text-dim)",
              maxWidth: 620,
            }}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ── Chip ───────────────────────────────────────────────────── */
export function Chip({
  label,
  accent,
  size = "sm",
}: {
  label: string;
  accent?: string;
  size?: "sm" | "md";
}) {
  const c = accent ?? "rgba(255,255,255,.55)";
  return (
    <span
      className="mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".4rem",
        fontSize: size === "sm" ? ".67rem" : ".74rem",
        fontWeight: 500,
        letterSpacing: ".06em",
        padding: size === "sm" ? ".3rem .62rem" : ".42rem .8rem",
        borderRadius: 999,
        border: `1px solid ${accent ? `${accent}33` : "var(--stroke)"}`,
        background: accent ? `${accent}12` : "var(--glass)",
        color: accent ? c : "var(--text-dim)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/* ── Buttons ────────────────────────────────────────────────── */
const btnBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: ".55rem",
  padding: ".85rem 1.6rem",
  borderRadius: 999,
  fontSize: ".84rem",
  fontWeight: 600,
  letterSpacing: ".01em",
  textDecoration: "none",
  border: "1px solid transparent",
  whiteSpace: "nowrap",
};

export function PrimaryButton({
  children,
  href,
  onClick,
  target,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
}) {
  const style: CSSProperties = {
    ...btnBase,
    background: "var(--grad)",
    color: "#07070B",
    fontWeight: 700,
    boxShadow: "0 8px 30px -8px rgba(129,140,248,.6)",
  };
  const motionProps = {
    whileHover: { y: -2, boxShadow: "0 14px 40px -8px rgba(34,211,238,.65)" },
    whileTap: { y: 0, scale: 0.985 },
    transition: { duration: 0.22, ease: EASE },
  };
  return href ? (
    <motion.a href={href} target={target} rel={target ? "noopener" : undefined} style={style} {...motionProps}>
      {children}
    </motion.a>
  ) : (
    <motion.button onClick={onClick} style={{ ...style, border: "none" }} {...motionProps}>
      {children}
    </motion.button>
  );
}

export function GhostButton({
  children,
  href,
  onClick,
  target,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
}) {
  const style: CSSProperties = {
    ...btnBase,
    background: "var(--glass)",
    border: "1px solid var(--stroke-2)",
    color: "var(--text)",
    backdropFilter: "blur(12px)",
  };
  const motionProps = {
    whileHover: { y: -2, borderColor: "rgba(34,211,238,.5)", background: "rgba(255,255,255,.07)" },
    whileTap: { y: 0, scale: 0.985 },
    transition: { duration: 0.22, ease: EASE },
  };
  return href ? (
    <motion.a href={href} target={target} rel={target ? "noopener" : undefined} style={style} {...motionProps}>
      {children}
    </motion.a>
  ) : (
    <motion.button onClick={onClick} style={style} {...motionProps}>
      {children}
    </motion.button>
  );
}
