"use client";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

/* Vertical type set in the margins either side of the content sheet.
   Only rendered where the margins are wide enough to hold it — below
   that the CSS hides it, so narrow screens are untouched. */
export default function SideRails() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="side-rails" aria-hidden>
      <div className="side-rail side-rail--left">
        <span className="side-rail__text label">
          {profile.name} — {profile.role}
        </span>
      </div>

      <div className="side-rail side-rail--right">
        <span className="side-rail__text label">
          {profile.location} · Available for work
        </span>
        <span className="side-rail__pct mono">{String(pct).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
