"use client";

import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    // resolvedTheme reflects what is actually shown, including the "system" preference,
    // so the first click always flips the visible theme.
    const { resolvedTheme, setTheme } = useTheme();

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
        <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-full"
            aria-label="Toggle dark mode"
            onClick={toggle}
        >
            <FaSun aria-hidden="true" className="absolute size-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <FaMoon aria-hidden="true" className="absolute size-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
