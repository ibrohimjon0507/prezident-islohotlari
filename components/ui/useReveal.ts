"use client";
import { useEffect } from "react";

/** .rv elementlar koʻrinish maydoniga kirganda .in klassini qoʻshadi (paydo boʻlish animatsiyasi) */
export function useReveal(root: React.RefObject<HTMLElement | null>, onEnter?: (el: Element) => void) {
  useEffect(() => {
    const els = root.current?.querySelectorAll(".rv");
    if (!els) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
          onEnter?.(e.target);
        }),
      { threshold: 0.14, rootMargin: "0px 0px -30px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Raqamni 0 dan qiymatgacha silliq sanash */
export function countUp(el: HTMLElement, to: number, decimals = 0, ms = 1800) {
  const t0 = performance.now();
  const f = (t: number) => {
    const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
    el.textContent = decimals ? (to * e).toFixed(decimals).replace(".", ",") : String(Math.round(to * e));
    if (k < 1) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}
