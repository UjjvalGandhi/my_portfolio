"use client";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { marqueeTags } from "@/lib/data";

const LOOP = 50;              // the track holds two copies
const SECONDS_PER_LOOP = 38;
const BASE = LOOP / SECONDS_PER_LOOP;
const MAX_BOOST = 2.6;
const MAX_FRAME_MS = 50;

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export default function Marquee() {
  const all = [...marqueeTags, ...marqueeTags];
  const reduce = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 380 });
  const factor = useTransform(smooth, [0, 3000], [0, MAX_BOOST], { clamp: false });

  const x = useTransform(baseX, v => `${wrap(-LOOP, 0, v)}%`);

  useAnimationFrame((_t, delta) => {
    if (reduce) return;
    const frame = Math.min(delta, MAX_FRAME_MS);
    const boost = 1 + Math.min(Math.abs(factor.get()), MAX_BOOST);
    baseX.set(baseX.get() - BASE * (frame / 1000) * boost);
  });

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        padding: "1.15rem 0",
        borderTop: "1px solid var(--stroke)",
        borderBottom: "1px solid var(--stroke)",
        background: "rgba(255,255,255,.018)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* edge fades */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background:
            "linear-gradient(90deg, var(--bg) 0%, transparent 12%, transparent 88%, var(--bg) 100%)",
        }}
      />
      <motion.div style={{ display: "flex", width: "max-content", x, willChange: "transform" }}>
        {all.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= marqueeTags.length}
            className="mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".9rem",
              padding: "0 1.35rem",
              fontSize: ".78rem",
              fontWeight: 500,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              whiteSpace: "nowrap",
            }}
          >
            {t}
            <span style={{ color: "var(--cyan)", fontSize: ".4rem", opacity: 0.8 }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
