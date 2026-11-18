import type Lenis from "lenis";

/* Height of the fixed navbar.

   Measured, not assumed: Lenis 1.3 DOES honour `scroll-padding-top`, so
   scrollTo needs no offset of its own — passing one lands every section at
   152px instead of 76. `scroll-padding-top` in globals.css is therefore the
   single source of truth for both the Lenis and the native path, and this
   constant is only used for ScrollTrigger start positions. Keep the two in
   sync with the navbar height in Navbar.tsx. */
export const NAV_OFFSET = 76;

/* A module singleton rather than context: Navbar, Hero and Footer all need
   this, and none of them is a child of a provider in a useful way. When
   Lenis is absent — reduced motion, or before mount — every helper below
   degrades to the native equivalent instead of doing nothing. */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll to a section id, accounting for the fixed navbar. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    // No offset: scroll-padding-top already supplies it.
    lenis.scrollTo(el);
    return;
  }
  // Native path: the same scroll-padding-top applies.
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

/** Scroll to the top of the document. */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0);
    return;
  }
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/** Pause/resume scrolling — used while the mobile menu is open. */
export function lockScroll(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
