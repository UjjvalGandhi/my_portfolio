"use client";
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { initGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";

/* Splits a string into per-word spans and raises them into place on scroll.

   The real words stay in the DOM as text, separated by real spaces, so
   crawlers and screen readers read the sentence normally — nothing is
   duplicated into a hidden layer.

   Words are hidden by CSS only under html[data-anim="on"], a flag an inline
   script in layout.tsx sets before first paint when JS is running and motion
   is allowed. That avoids the flash of the text appearing, re-hiding, then
   animating. The same script clears the flag if the animation never reports
   ready, so a JS failure leaves the text visible rather than blank.

   Only opacity and transform are animated, so nothing reflows. */
export default function SplitWords({
  text,
  className,
  style,
  start = "top 85%",
  stagger = 0.035,
  delay = 0,
  highlight,
  highlightStyle,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  start?: string;
  stagger?: number;
  delay?: number;
  /** Trailing words to colour differently, e.g. an accent phrase. */
  highlight?: string;
  highlightStyle?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const { gsap } = initGsap();
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 55, opacity: 0 });
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [text, highlight, start, stagger, delay]);

  const render = (chunk: string, accent: boolean, offset: number): ReactNode[] =>
    chunk.split(" ").filter(Boolean).map((word, i) => (
      <span
        key={`${offset}-${i}-${word}`}
        data-word
        style={{
          display: "inline-block",
          willChange: "transform, opacity",
          ...(accent ? highlightStyle : undefined),
        }}
      >
        {word}
      </span>
    )).flatMap((node, i, arr) => (i < arr.length - 1 ? [node, " "] : [node]));

  return (
    <span ref={ref} className={className} style={style}>
      {render(text, false, 0)}
      {highlight && <> {render(highlight, true, 1000)}</>}
    </span>
  );
}
