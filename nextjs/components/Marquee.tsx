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

const LOOP = 50;
const SECONDS_PER_LOOP = 44;
const BASE = LOOP / SECONDS_PER_LOOP;
const MAX_BOOST = 2.2;
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
        overflow: "hidden",
        padding: ".95rem 0",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-field)",
      }}
    >
      <motion.div style={{ display: "flex", width: "max-content", x, willChange: "transform" }}>
        {all.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= marqueeTags.length}
            className="mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.1rem",
              padding: "0 1.1rem",
              fontSize: ".72rem",
              fontWeight: 500,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--ink-2)",
              whiteSpace: "nowrap",
            }}
          >
            {t}
            <span style={{ width: 3, height: 3, background: "var(--accent)" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
