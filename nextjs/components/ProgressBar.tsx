"use client";
import { useEffect } from "react";
import { getLenis } from "@/lib/scroll";

export default function ProgressBar() {
  useEffect(() => {
    const prog = document.getElementById("prog");
    if (!prog) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      prog.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    /* Lenis emits its own scroll event every frame it animates; the native
       one still fires too, so this is belt and braces rather than either/or. */
    const lenis = getLenis();
    lenis?.on("scroll", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      lenis?.off("scroll", update);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div id="prog" aria-hidden />;
}
