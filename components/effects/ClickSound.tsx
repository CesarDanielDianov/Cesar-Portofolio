"use client";

import { useEffect } from "react";
import { playToggle } from "@/lib/sound";

const TOUCHABLE = 'a[href], button, [role="button"], summary, select, input[type="checkbox"], input[type="radio"], input[type="submit"], input[type="button"]';

/**
 * Plays the UI tick for every click on a touchable element, site-wide.
 * One delegated listener on the document, so new elements need no wiring.
 * Elements marked data-sound="own" play their own sound (e.g. the experience
 * toggles, which knock differently for open/close) and are skipped here.
 */
export default function ClickSound() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(TOUCHABLE);
      if (!el || el.closest('[data-sound="own"]')) return;
      if (el.matches(":disabled, [aria-disabled='true']")) return;
      playToggle(true);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
