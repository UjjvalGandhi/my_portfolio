"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";
import SplitWords from "./anim/SplitWords";

const EASE = [0.22, 1, 0.36, 1] as const;

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
  }),
};

export const VIEWPORT = { once: true, margin: "-70px" } as const;

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

/* ── Section heading ─────────────────────────────────────────
   Number, rule and label sit on one baseline — the recurring
   masthead for every section.                                  */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accentWord,
  lead,
  onInk = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accentWord?: string;
  lead?: string;
  onInk?: boolean;
}) {
  return (
    <header style={{ marginBottom: "4rem" }}>
      <Reveal>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingBottom: "1.25rem",
            marginBottom: "2rem",
            borderBottom: `1px solid ${onInk ? "var(--line-ink)" : "var(--line)"}`,
          }}
        >
          <span className="mono" style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--accent)" }}>
            {index}
          </span>
          <span className="label" style={onInk ? { color: "var(--on-ink-2)" } : undefined}>
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <h2
          className="display"
          style={{
            fontSize: "clamp(2.3rem, 4.6vw, 5.2rem)",
            color: onInk ? "var(--on-ink)" : "var(--ink)",
            maxWidth: "20ch",
          }}
        >
          <SplitWords
            text={title}
            highlight={accentWord}
            highlightStyle={{ color: "var(--accent)" }}
          />
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={2}>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "1.02rem",
              lineHeight: 1.7,
              color: onInk ? "var(--on-ink-2)" : "var(--ink-2)",
              maxWidth: 580,
            }}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </header>
  );
}

/* ── Tag ────────────────────────────────────────────────────── */
export function Tag({ label, onInk = false }: { label: string; onInk?: boolean }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: ".68rem",
        fontWeight: 500,
        padding: ".28rem .6rem",
        border: `1px solid ${onInk ? "var(--line-ink)" : "var(--line)"}`,
        color: onInk ? "var(--on-ink-2)" : "var(--ink-2)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/* ── Buttons ────────────────────────────────────────────────── */
type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
  variant?: "solid" | "ghost" | "on-ink" | "on-ink-ghost";
};

export function Button({ children, href, onClick, target, variant = "solid" }: BtnProps) {
  const cls = `btn btn--${variant}`;
  return href ? (
    <a className={cls} href={href} target={target} rel={target ? "noopener" : undefined}>
      {children}
    </a>
  ) : (
    <button className={cls} onClick={onClick} type="button">
      {children}
    </button>
  );
}
