"use client";

import { useEffect, useState } from "react";

export const BOOT_KEY = "booted";

const LINES = [
    "Booting cesar-dianov.dev",
    "Loading experience",
    "Compiling projects",
    "Mounting CV",
    "Starting terminal",
];

const STEP_MS = 220; // time per boot line
const EXIT_MS = 650; // pull-away duration (matches .boot-exit in CSS)

/**
 * Paper-note boot sequence (steps ticked off in ink) shown once per browser session.
 * Rendered on the server so it covers the page from the first paint; an inline
 * script in <head> (see layout) hides it before paint on repeat visits, and a
 * CSS failsafe hides it even if JavaScript never runs.
 */
export default function BootScreen() {
    const [step, setStep] = useState(0);
    const [phase, setPhase] = useState<"boot" | "exit" | "done">("boot");

    useEffect(() => {
        const skip =
            document.documentElement.hasAttribute("data-booted") ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (skip) {
            const t = window.setTimeout(() => setPhase("done"), 0);
            return () => window.clearTimeout(t);
        }

        const id = window.setInterval(() => setStep((s) => Math.min(s + 1, LINES.length)), STEP_MS);

        const skipNow = () => setPhase((p) => (p === "boot" ? "exit" : p));
        window.addEventListener("keydown", skipNow);
        window.addEventListener("pointerdown", skipNow);
        return () => {
            window.clearInterval(id);
            window.removeEventListener("keydown", skipNow);
            window.removeEventListener("pointerdown", skipNow);
        };
    }, []);

    // All lines printed: hold briefly on 100%, then slide away.
    useEffect(() => {
        if (step < LINES.length || phase !== "boot") return;
        const t = window.setTimeout(() => setPhase("exit"), STEP_MS * 1.5);
        return () => window.clearTimeout(t);
    }, [step, phase]);

    useEffect(() => {
        if (phase !== "exit") return;
        try {
            sessionStorage.setItem(BOOT_KEY, "1");
        } catch {
            // Storage blocked: the boot screen will simply show again next visit.
        }
        const t = window.setTimeout(() => setPhase("done"), EXIT_MS);
        return () => window.clearTimeout(t);
    }, [phase]);

    if (phase === "done") return null;

    const pct = Math.round((Math.min(step, LINES.length) / LINES.length) * 100);

    return (
        <div
            role="status"
            aria-label="Loading site"
            className={`boot site-bg fixed inset-0 z-[100] flex items-center justify-center px-6 ${
                phase === "exit" ? "boot-exit" : ""
            }`}
        >
            {/* A note on the desk: the boot steps get ticked off as they load */}
            <div className="fx-sheets w-full max-w-sm rotate-[-1.5deg]">
                <div className="fx-paper-top border border-(--paper-edge) px-8 pt-7 pb-6 text-slate-800 dark:text-gray-100">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500 dark:text-gray-400">César Dianov</p>
                    <p className="mt-2 font-hand text-3xl font-bold text-blue-950 dark:text-blue-100">getting things ready…</p>

                    <ul className="mt-5 space-y-2 text-sm">
                        {LINES.map((line, i) => {
                            const done = i < step;
                            return (
                                <li key={line} className="flex items-center gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="relative grid h-5 w-5 shrink-0 place-items-center border border-slate-400 dark:border-gray-500"
                                    >
                                        {done && (
                                            <span className="boot-tick absolute -top-2.5 left-0.5 font-hand text-2xl font-bold leading-none text-blue-700 dark:text-blue-300">
                                                ✓
                                            </span>
                                        )}
                                    </span>
                                    <span className={done ? "" : "text-slate-400 dark:text-gray-500"}>{line}</span>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Progress: a pen stroke drawn across the page */}
                    <div className="mt-6 flex items-center gap-3">
                        <svg viewBox="0 0 200 10" preserveAspectRatio="none" className="h-2.5 flex-1 overflow-visible" aria-hidden="true">
                            <path d="M2 6 C 50 2, 100 9, 198 4" pathLength={1} fill="none" strokeWidth={2} strokeLinecap="round" className="stroke-slate-300 dark:stroke-gray-600" />
                            <path
                                d="M2 6 C 50 2, 100 9, 198 4"
                                pathLength={1}
                                fill="none"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeDasharray="1"
                                strokeDashoffset={1 - pct / 100}
                                className="boot-ink stroke-blue-900 dark:stroke-blue-200"
                            />
                        </svg>
                        <span className="w-10 text-right text-xs tabular-nums text-slate-500 dark:text-gray-400">{pct}%</span>
                    </div>

                    <p className="mt-5 text-right font-hand text-lg text-slate-500 dark:text-gray-400">press any key to skip</p>
                </div>
            </div>
        </div>
    );
}
