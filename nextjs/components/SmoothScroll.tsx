"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis, prefersReducedMotion } from "@/lib/scroll";
import { initGsap } from "@/lib/gsap";

/* Owns the Lenis instance and the single animation loop everything else
   hangs off. Renders nothing.

   Reduced motion: Lenis is never constructed. The CSS media query hands
   `scroll-behavior: smooth` back to the browser, and lib/scroll helpers
   fall through to native scrolling, so every control still works. */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = prefersReducedMotion();

    /* Deep links from the sitemap (/#work, /#packages …). The browser's own
       hash jump happens before hydration, so re-run it with the navbar
       offset applied, whichever scroll mode we are in. */
    const jumpToHash = (smooth: boolean) => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      requestAnimationFrame(() => {
        const lenis = smooth ? instance : null;
        if (lenis) lenis.scrollTo(el, { immediate: true });
        else el.scrollIntoView({ behavior: "auto", block: "start" });
      });
    };

    let instance: Lenis | null = null;

    if (reduce) {
      jumpToHash(false);
      // Back/forward between hashes still needs the offset applied.
      const onHash = () => jumpToHash(false);
      window.addEventListener("hashchange", onHash);
      return () => window.removeEventListener("hashchange", onHash);
    }

    const { gsap, ScrollTrigger } = initGsap();
    (window as unknown as { __animReady?: boolean }).__animReady = true;

    instance = new Lenis({
      duration: 1.05,
      // Gentle exponential ease-out; no overshoot.
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      /* Touch is left to the platform: hijacking it on phones costs more in
         responsiveness than it buys in polish, and it is the main source of
         scroll jank on low-end Android. */
      syncTouch: false,
      autoRaf: false,
    });

    setLenis(instance);

    // Keep ScrollTrigger in step with Lenis rather than with native scroll.
    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance?.raf(time * 1000);
    gsap.ticker.add(tick);

    jumpToHash(true);
    const onHash = () => jumpToHash(true);
    window.addEventListener("hashchange", onHash);

    return () => {
      window.removeEventListener("hashchange", onHash);
      gsap.ticker.remove(tick);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
