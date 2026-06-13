"use client";
import { SiFlutter, SiDart, SiFirebase, SiMongodb, SiAndroid } from "react-icons/si";
import { TbApi, TbCpu } from "react-icons/tb";
import { MdDesktopMac, MdWeb } from "react-icons/md";

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
];

export default function MarqueeSection() {
  const all = [...tags, ...tags];
  return (
    <div style={{ overflow:"hidden", padding:".9rem 0", background:"var(--ink)", position:"relative", zIndex:2 }}>
      <div style={{ display:"flex", width:"max-content", animation:"marquee 24s linear infinite" }}>
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
