"use client";
import { useEffect, useRef, useState } from "react";
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

export default function MarqueeSection() {
  const all = [...tags, ...tags];
  const [duration, setDuration] = useState(24);
  const lastScrollY = useRef(0);
  const lastTime    = useRef(Date.now());
  const rafRef      = useRef<number>(0);
  const timeoutRef  = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const now    = Date.now();
      const deltaT = now - lastTime.current;
      const deltaY = Math.abs(window.scrollY - lastScrollY.current);
      const velocity = deltaT > 0 ? deltaY / deltaT : 0; // px/ms

      lastScrollY.current = window.scrollY;
      lastTime.current    = now;

      // Map velocity to duration: faster scroll → shorter duration (faster marquee)
      // Clamp: velocity 0 → 24s, velocity 2+ px/ms → 6s
      const newDuration = Math.max(6, 24 - velocity * 9);
      setDuration(newDuration);

      // After scroll stops, ease back to normal speed
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setDuration(24);
      }, 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={{ overflow:"hidden", padding:".9rem 0", background:"var(--ink)", position:"relative", zIndex:2 }}>
      <div
        style={{
          display:"flex", width:"max-content",
          animation:`marquee ${duration}s linear infinite`,
          transition:"animation-duration 0.4s ease",
        }}
      >
        {all.map((t, i) => (
          <span key={i} style={{ fontFamily:"var(--font-barlow)", fontSize:".92rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"#EDEBD0", padding:"0 2rem", display:"inline-flex", alignItems:"center", gap:".5rem" }}>
            {t.icon}
            {t.label}
            <span style={{ color:"var(--red)", fontSize:".45rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
