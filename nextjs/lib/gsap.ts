"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register ScrollTrigger once, on the client only. */
export function initGsap() {
  if (registered || typeof window === "undefined") return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger);
  /* Lenis drives the ticker; lag smoothing would make it stutter after a
     dropped frame. */
  gsap.ticker.lagSmoothing(0);
  registered = true;
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
