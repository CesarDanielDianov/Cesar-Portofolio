"use client";

import { useEffect } from "react";

/**
 * Tracks the cursor over .fx-card elements so the CSS spotlight can follow it.
 * Pointer events are coalesced to one DOM write per animation frame, and only
 * on devices with a real hover-capable pointer.
 */
export default function HoverFx() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let last: PointerEvent | null = null;

    const flush = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const card = (e.target as Element | null)?.closest<HTMLElement>(".fx-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
