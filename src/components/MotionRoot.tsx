"use client";

import { useEffect } from "react";

/**
 * Arms the entrance animations and reveals each section as it scrolls in.
 *
 * Two properties the prototype learned the hard way and this carries over:
 *
 *  1. The resting (visible) state is the CSS default. The hidden start state is
 *     applied only under `data-armed` on <html>, and we only arm once the
 *     animation clock is confirmed to be advancing — a frozen clock (print, a
 *     screenshot pipeline, a host that pauses rAF) degrades to fully visible.
 *  2. An unconditional safety net reveals anything the observer misses — an
 *     anchor jump, a fast scroll, a node added after the fact.
 */
export default function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    let observer: IntersectionObserver | null = null;
    let safetyNet: number | undefined;
    let mutations: MutationObserver | null = null;
    let cancelled = false;

    const reveal = (el: Element) => {
      if (!el.hasAttribute("data-in")) el.setAttribute("data-in", "");
    };

    const arm = () => {
      if (cancelled) return;
      root.setAttribute("data-armed", "");

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.intersectionRatio > 0) {
              reveal(entry.target);
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0, rootMargin: "0px 0px -8% 0px" },
      );

      const seen = new WeakSet<Element>();
      const scan = () => {
        for (const frame of document.querySelectorAll("[data-reveal-frame]")) {
          if (seen.has(frame)) continue;
          seen.add(frame);

          // A frame already in view or scrolled past — because we armed after an
          // anchor jump, a restored scroll position, or a fast scroll during
          // hydration — never gets an intersection, so reveal it now.
          if (frame.getBoundingClientRect().top < window.innerHeight) {
            reveal(frame);
            continue;
          }

          observer?.observe(frame);
        }
      };

      const revealAll = () => {
        for (const frame of document.querySelectorAll("[data-reveal-frame]")) reveal(frame);
      };

      scan();
      // Nothing can be left stranded at opacity 0.
      safetyNet = window.setInterval(revealAll, 2500);

      mutations = new MutationObserver(scan);
      mutations.observe(document.body, { childList: true, subtree: true });
    };

    // Only arm if the transition clock actually advances in this context.
    const t0 = document.timeline?.currentTime;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const t1 = document.timeline?.currentTime;
        if (typeof t0 === "number" && typeof t1 === "number" && t1 > t0) arm();
      });
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      mutations?.disconnect();
      if (safetyNet) window.clearInterval(safetyNet);
      root.removeAttribute("data-armed");
    };
  }, []);

  return null;
}
