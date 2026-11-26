"use client";

import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import type { CSSProperties } from "react";
import { useT } from "@/components/i18n/LangProvider";

/* Hand-drawn icons in the site's pen-and-paper style: slightly wobbly ink
   strokes, with a highlighter fill (yellow sun, teal moon like the navbar's
   dark-mode highlighter). */

function SketchSun({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                fill="#fde047"
                d="M12.1 7.4c2.6-.2 4.7 1.9 4.6 4.6-.1 2.5-2.1 4.5-4.7 4.5-2.5 0-4.6-2.1-4.5-4.7.1-2.4 2.1-4.3 4.6-4.4z"
            />
            <path d="M12 2.4v2.3M12.2 19.3v2.3M2.5 12.1h2.2M19.4 11.9h2.2M5.1 5.2l1.6 1.6M17.4 17.3l1.5 1.6M5.4 18.8l1.5-1.6M17.2 6.7l1.7-1.6" />
        </svg>
    );
}

function SketchMoon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                fill="rgb(45 212 191 / 0.4)"
                d="M19.4 15c-1.2.5-2.5.7-3.9.6-4.3-.3-7.5-4-7.2-8.3.1-1.2.4-2.3 1-3.3-3.6 1-6.2 4.4-6 8.3.3 4.6 4.2 8.1 8.8 7.9 3.2-.2 5.9-2.2 7.3-5.2z"
            />
            <path strokeWidth={1.6} d="M17.6 3.2v3.1M16.1 4.8h3.1M21 8.6v1.8M20.1 9.5h1.8" />
        </svg>
    );
}

export function ThemeToggle() {
    // resolvedTheme reflects what is actually shown, including the "system" preference,
    // so the first click always flips the visible theme.
    const { resolvedTheme, setTheme } = useTheme();
    const t = useT();

    /**
     * Switches theme with a circular wipe centred on the button, using the
     * View Transitions API: light expands out of it, and collapses back into it.
     * flushSync makes next-themes apply the new class inside the transition callback, so the browser captures the right "after" state.
     * Falls back to an instant switch when unsupported or with reduced motion.
     */
    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const next = resolvedTheme === "dark" ? "light" : "dark";
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!document.startViewTransition || reduced) {
            setTheme(next);
            return;
        }

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        // Dark → light: the light theme grows out of the button.
        // Light → dark: the light theme shrinks back into it, revealing dark underneath.
        const collapse = next === "dark";
        const root = document.documentElement;
        // Always marked, so the route-change corner peel CSS stays out of theme switches.
        root.dataset.themeShift = collapse ? "collapse" : "expand";

        const transition = document.startViewTransition(() => {
            flushSync(() => setTheme(next));
        });
        const small = `circle(0px at ${x}px ${y}px)`;
        const big = `circle(${radius}px at ${x}px ${y}px)`;
        transition.finished.catch(() => {}).finally(() => delete root.dataset.themeShift);
        transition.ready
            .then(() => {
                root.animate(
                    { clipPath: collapse ? [big, small] : [small, big] },
                    {
                        duration: 400,
                        easing: "cubic-bezier(.65,0,.35,1)",
                        fill: "forwards",
                        pseudoElement: collapse ? "::view-transition-old(root)" : "::view-transition-new(root)",
                    },
                );
            })
            .catch(() => {});
    };

    return (
        <button
            type="button"
            className="fx-chip relative w-10"
            style={{ "--chip-tilt": "2deg" } as CSSProperties}
            aria-label={t.themeToggle}
            title={t.themeToggle}
            onClick={toggle}
        >
            <SketchSun className="absolute size-6 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <SketchMoon className="absolute size-6 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </button>
    );
}
