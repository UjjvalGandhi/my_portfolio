"use client";
import { useEffect } from "react";

export default function ProgressBar() {
  useEffect(() => {
    const prog = document.getElementById("prog");
    const onScroll = () => {
      if (!prog) return;
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      prog.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div id="prog" />;
}
