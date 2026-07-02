import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * Returns scroll progress (0 → 1) for a section ref,
 * plus the raw scrollYProgress MotionValue.
 */
export function useScrollProgress(offsetStart = "start end", offsetEnd = "end start") {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offsetStart as never, offsetEnd as never],
  });
  return { ref, scrollYProgress };
}

/**
 * Maps scrollYProgress through a custom input/output range.
 */
export function useScrollTransform(
  scrollYProgress: MotionValue<number>,
  input: number[],
  output: number[] | string[]
) {
  return useTransform(scrollYProgress, input, output as number[]);
}
