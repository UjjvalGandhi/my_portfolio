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
import { SiFlutter, SiDart, SiFirebase, SiMongodb, SiAndroid, SiPhp, SiPython } from "react-icons/si";
import { TbApi, TbCpu } from "react-icons/tb";
import { MdDesktopMac, MdWeb } from "react-icons/md";
import { FaJava, FaAws } from "react-icons/fa";

const tags = [
  { label: "Flutter",    icon: <SiFlutter    size={12} color="#54C5F8" /> },
  { label: "Dart",       icon: <SiDart       size={12} color="#0175C2" /> },
  { label: "Firebase",   icon: <SiFirebase   size={12} color="#FFCA28" /> },
  { label: "GetX",       icon: null },
  { label: "Android",    icon: <SiAndroid    size={12} color="#3DDC84" /> },
  { label: "iOS",        icon: null },
  { label: "Web",        icon: <MdWeb        size={12} color="#4A90D9" /> },
  { label: "Desktop",    icon: <MdDesktopMac size={12} color="#c4a882" /> },
  { label: "Embedded C", icon: <TbCpu        size={12} color="#c4a882" /> },
  { label: "IoT",        icon: null },
  { label: "REST APIs",  icon: <TbApi        size={12} color="#F4A460" /> },
  { label: "MongoDB",    icon: <SiMongodb    size={12} color="#47A248" /> },
  { label: "PHP",        icon: <SiPhp        size={12} color="#777BB4" /> },
  { label: "Python",     icon: <SiPython     size={12} color="#3776AB" /> },
  { label: "AWS",        icon: <FaAws        size={12} color="#FF9900" /> },
  { label: "Java",       icon: <FaJava       size={12} color="#5382a1" /> },
  { label: "C/C++",      icon: null },
];

/* The track holds two identical copies, so -50% of its width is exactly one
   copy — the same seam-free wrap the old CSS keyframe relied on. */
const LOOP_PERCENT = 50;
const SECONDS_PER_LOOP = 24;
const BASE_PERCENT_PER_SEC = LOOP_PERCENT / SECONDS_PER_LOOP;

/* How much scrolling can speed the marquee up, as a multiplier ceiling. */
const MAX_BOOST = 3;
/* Ignore absurd frame gaps (tab was backgrounded) so it never lurches. */
const MAX_FRAME_MS = 50;

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export default function MarqueeSection() {
  const all = [...tags, ...tags];
  const prefersReducedMotion = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  /* Spring-smoothed so speed ramps instead of snapping on every scroll event. */
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 3000], [0, MAX_BOOST], { clamp: false });

  const x = useTransform(baseX, v => `${wrap(-LOOP_PERCENT, 0, v)}%`);

  useAnimationFrame((_time, delta) => {
    if (prefersReducedMotion) return;
    const frame = Math.min(delta, MAX_FRAME_MS);
    const boost = 1 + Math.min(Math.abs(velocityFactor.get()), MAX_BOOST);
    baseX.set(baseX.get() - BASE_PERCENT_PER_SEC * (frame / 1000) * boost);
  });

  return (
    <div style={{ overflow:"hidden", padding:".9rem 0", background:"var(--ink)", position:"relative", zIndex:2 }}>
      <motion.div style={{ display:"flex", width:"max-content", x, willChange:"transform" }}>
        {all.map((t, i) => (
          <span
            key={i}
            /* second copy is purely visual filler — keep it out of the a11y tree */
            aria-hidden={i >= tags.length}
            style={{ fontFamily:"var(--font-barlow)", fontSize:".92rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"#EDEBD0", padding:"0 2rem", display:"inline-flex", alignItems:"center", gap:".5rem", whiteSpace:"nowrap" }}
          >
            {t.icon}
            {t.label}
            <span style={{ color:"var(--red)", fontSize:".45rem" }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
