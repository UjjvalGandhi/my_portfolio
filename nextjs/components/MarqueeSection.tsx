"use client";
import { useEffect, useRef } from "react";

const tags = ["Flutter","Dart","Firebase","GetX","Android","iOS","Web","Desktop","Embedded C","IoT","REST APIs","MongoDB"];

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const items = [...tags, ...tags];
    trackRef.current.innerHTML = items
      .map(t => `<span style="font-family:var(--font-barlow);font-size:.95rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#EDEBD0;padding:0 2rem;display:inline-flex;align-items:center;gap:2rem;">${t} <span style="color:#E35336;font-size:.5rem;">◆</span></span>`)
      .join("");
  }, []);

  return (
    <div style={{ overflow: "hidden", padding: ".9rem 0", background: "var(--ink)", position: "relative", zIndex: 2 }}>
      <div ref={trackRef} style={{ display: "flex", width: "max-content", animation: "marquee 22s linear infinite" }} />
      <style>{`@keyframes marquee { to { transform: translateX(-50%); } } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }`}</style>
    </div>
  );
}
