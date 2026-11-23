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
const EXIT_MS = 550; // slide-out duration (matches .boot-exit in CSS)

/**
 * Terminal-style boot sequence shown once per browser session.
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
    const filled = Math.round(pct / 5);

    return (
        <div
            role="status"
            aria-label="Loading site"
            className={`boot fixed inset-0 z-[100] flex items-center justify-center bg-[#f2f2f2] px-6 font-mono text-sm text-gray-800 dark:bg-[#030605] dark:text-gray-200 ${
                phase === "exit" ? "boot-exit" : ""
            }`}
        >
            <div className="w-full max-w-md">
                <ul className="space-y-1.5">
                    {LINES.slice(0, step).map((line) => (
                        <li key={line} className="boot-line">
                            <span className="text-green-700 dark:text-green-400">[ OK ]</span> {line}
                        </li>
                    ))}
                </ul>

                <p className="mt-6 whitespace-pre text-gray-500 dark:text-gray-400">
                    [<span className="text-gray-900 dark:text-white">{"#".repeat(filled)}</span>
                    {"-".repeat(20 - filled)}] {String(pct).padStart(3, " ")}%
                </p>

                <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">press any key to skip</p>
            </div>
        </div>
    );
}
