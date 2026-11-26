"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import Terminal from "@/components/home/Terminal";
import { site } from "@/content/site";
import { useLang, useT } from "@/components/i18n/LangProvider";
import { cn } from "@/lib/utils";

/**
 * Homepage as a desk of papers: the name paper on the left and the terminal on
 * the right, both the same size, with a "next steps" sticky note stuck to the
 * terminal's right side. From xl up the papers can be dragged around (clicking
 * one brings it to the front), and "tidy up" sets the desk on fire and lays
 * fresh papers back where they started.
 */

const DESK_QUERY = "(min-width: 1280px)";

type SheetId = "name" | "terminal" | "now";
type Offset = { x: number; y: number };

const ZERO: Offset = { x: 0, y: 0 };
/** Back to front. */
const INITIAL_ORDER: SheetId[] = ["name", "terminal", "now"];

/** Where each sheet catches fire: three scorch-hole origins. */
const BURN: Record<SheetId, CSSProperties> = {
    name: { "--h1": "25% 88%", "--h2": "80% 70%", "--h3": "40% 20%" } as CSSProperties,
    terminal: { "--h1": "70% 92%", "--h2": "15% 60%", "--h3": "60% 15%" } as CSSProperties,
    now: { "--h1": "50% 95%", "--h2": "85% 40%", "--h3": "10% 20%" } as CSSProperties,
};

/** Flames [left %, top %, size px, delay s] and embers [left %, top %, drift px, delay s]. */
const FLAMES: [number, number, number, number][] = [
    [22, 82, 46, 0], [70, 64, 40, 0.15], [40, 55, 54, 0.35], [82, 30, 38, 0.5],
    [15, 40, 44, 0.6], [55, 22, 50, 0.75], [32, 12, 36, 0.9], [88, 85, 34, 0.25],
];
const EMBERS: [number, number, number, number][] = [
    [25, 80, -20, 0.2], [60, 60, 25, 0.4], [45, 40, -10, 0.6], [80, 50, 30, 0.7],
    [20, 30, -30, 0.85], [65, 20, 15, 1], [50, 70, 5, 0.5], [35, 55, 20, 0.95],
];

const BURN_MS = 1700;
const REBORN_MS = 1000;

type Phase = "idle" | "burning" | "reborn";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function Fire() {
    return (
        <div aria-hidden="true" className="fx-fire">
            {FLAMES.map(([x, y, size, d], i) => (
                <span
                    key={`f${i}`}
                    className="fx-flame"
                    style={{ left: `${x}%`, top: `${y}%`, "--s": `${size}px`, "--d": `${d}s` } as CSSProperties}
                />
            ))}
            {EMBERS.map(([x, y, dx, d], i) => (
                <span
                    key={`e${i}`}
                    className="fx-ember"
                    style={{ left: `${x}%`, top: `${y}%`, "--dx": `${dx}px`, "--d": `${d}s` } as CSSProperties}
                />
            ))}
        </div>
    );
}

type Drag = { id: number; sx: number; sy: number; bx: number; by: number; min: Offset; max: Offset; last: Offset; live: boolean };

/** Pixels the pointer must travel before a press turns into a drag, so plain clicks still work. */
const DRAG_THRESHOLD = 4;

function Sheet({
    id,
    z,
    offset,
    onFront,
    onMove,
    delay,
    phase,
    round,
    className,
    children,
}: {
    id: SheetId;
    z: number;
    offset: Offset;
    onFront: (id: SheetId) => void;
    onMove: (id: SheetId, p: Offset) => void;
    delay: number;
    phase: Phase;
    /** Bumped after a burn so fresh sheets mount and drop in again. */
    round: number;
    className?: string;
    children: ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const drag = useRef<Drag | null>(null);
    const [dragging, setDragging] = useState(false);

    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
        if (phase !== "idle") return;
        onFront(id);
        if (e.button !== 0 || !window.matchMedia(DESK_QUERY).matches) return;
        const t = e.target as Element;
        if (t.closest("a, button, input, textarea, select, label")) return;
        const el = ref.current;
        const desk = el?.closest("[data-desk]");
        if (!el || !desk) return;

        // Free roam: across the whole window width, a little above the desk and well below it.
        const r = el.getBoundingClientRect();
        const d = desk.getBoundingClientRect();
        const edge = 8;
        const s = {
            left: edge,
            right: document.documentElement.clientWidth - edge,
            top: d.top - 40,
            bottom: d.bottom + 320,
        };
        drag.current = {
            id: e.pointerId,
            live: false,
            sx: e.clientX,
            sy: e.clientY,
            bx: offset.x,
            by: offset.y,
            min: { x: offset.x + s.left - r.left, y: offset.y + s.top - r.top },
            max: { x: offset.x + s.right - r.right, y: offset.y + s.bottom - r.bottom },
            last: offset,
        };
    };

    // Writes straight to the element while dragging; React only hears about the final spot.
    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        if (!d || !ref.current) return;
        if (!d.live) {
            // Released somewhere else before the drag began: forget the press.
            if (e.buttons === 0) {
                drag.current = null;
                return;
            }
            if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < DRAG_THRESHOLD) return;
            d.live = true;
            ref.current.setPointerCapture(d.id);
            window.getSelection()?.removeAllRanges();
            setDragging(true);
        }
        e.preventDefault();
        d.last = {
            x: clamp(d.bx + e.clientX - d.sx, d.min.x, d.max.x),
            y: clamp(d.by + e.clientY - d.sy, d.min.y, d.max.y),
        };
        ref.current.style.translate = `${d.last.x}px ${d.last.y}px`;
    };

    const end = () => {
        const d = drag.current;
        if (!d) return;
        drag.current = null;
        if (!d.live) return;
        setDragging(false);
        onMove(id, d.last);
    };

    return (
        <div
            ref={ref}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={end}
            onPointerCancel={end}
            onDragStart={(e) => e.preventDefault()}
            className={cn(
                "fx-desk-sheet relative w-full xl:cursor-grab",
                dragging && "is-dragging xl:cursor-grabbing",
                phase !== "idle" && "pointer-events-none",
                phase === "reborn" && "is-reborn",
                className
            )}
            style={{ zIndex: z, translate: `${offset.x}px ${offset.y}px`, ...BURN[id] }}
        >
            <div
                key={round}
                className={cn("h-full", phase === "burning" ? "fx-burn relative" : "fx-drop")}
                style={{ animationDelay: phase === "burning" ? `${delay / 3}ms` : `${delay}ms` }}
            >
                {children}
                {phase === "burning" && (
                    <>
                        <span aria-hidden="true" className="fx-char fx-char-1" />
                        <span aria-hidden="true" className="fx-char fx-char-2" />
                        <span aria-hidden="true" className="fx-char fx-char-3" />
                    </>
                )}
            </div>
            {phase === "burning" && <Fire />}
        </div>
    );
}

function NameSheet() {
    const t = useT();
    return (
        <div className="fx-sheets fx-sheets-alt h-full">
            <div className="fx-paper-top flex h-full flex-col justify-center border border-(--paper-edge) p-8 sm:p-10">
                <h1>
                    <span className="sr-only">{site.name}</span>
                    {/* Signature: written in left to right, then underlined with a swash */}
                    <span aria-hidden="true" className="relative block w-fit">
                        <span className="fx-sign block font-hand text-[3.25rem] font-bold leading-[1.05] text-blue-950 sm:text-7xl xl:text-[5.75rem] dark:text-blue-100">
                            {site.name}
                        </span>
                        <svg
                            viewBox="0 0 300 24"
                            preserveAspectRatio="none"
                            className="fx-swash -mt-1 block h-5 w-[105%] text-blue-950 sm:h-6 dark:text-blue-100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            strokeLinecap="round"
                        >
                            <path pathLength={1} d="M4 16 C 60 6, 110 22, 170 13 S 260 6, 296 12" />
                        </svg>
                    </span>
                </h1>

                <p className="mt-6 inline-flex w-fit rotate-[-2deg] items-center gap-2.5 border-2 border-green-700/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-800 sm:text-sm lg:text-base dark:border-green-400/70 dark:text-green-400">
                    {t.site.tagline}
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:hidden" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-green-500" />
                    </span>
                </p>

                <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl dark:text-gray-300">
                    {t.home.intro}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        href="/projects"
                        className="fx-btn group inline-flex items-center gap-2 border-2 border-gray-900 bg-gray-900 px-6 py-3 font-bold lg:text-lg text-white dark:border-white dark:bg-white dark:text-gray-900"
                    >
                        {t.home.viewProjects}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                    <Link
                        href="/cv"
                        className="fx-btn group inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3 font-bold lg:text-lg dark:border-white"
                    >
                        {t.home.readCv}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function NextStepsNote() {
    const t = useT().home;
    return (
        <div className="fx-sticky relative px-5 pt-7 pb-5">
            <span aria-hidden="true" className="fx-tape" />
            <p className="font-hand text-2xl font-bold leading-none">{t.nextSteps}</p>
            <ul className="mt-3 space-y-1.5 font-hand text-xl leading-tight">
                {t.nextStepsList.map((s) => (
                    <li key={s}>→ {s}</li>
                ))}
            </ul>
        </div>
    );
}

export default function Hero() {
    const { lang } = useLang();
    const t = useT().home;
    const [order, setOrder] = useState<SheetId[]>(INITIAL_ORDER);
    const [offsets, setOffsets] = useState<Partial<Record<SheetId, Offset>>>({});

    const front = useCallback(
        (id: SheetId) => setOrder((o) => (o[o.length - 1] === id ? o : [...o.filter((x) => x !== id), id])),
        []
    );
    const move = useCallback((id: SheetId, p: Offset) => setOffsets((o) => ({ ...o, [id]: p })), []);

    const [phase, setPhase] = useState<Phase>("idle");
    const [round, setRound] = useState(0);

    const moved = Object.values(offsets).some((p) => p && (p.x || p.y));

    // Tidy up = set the desk on fire, then lay out fresh sheets where they started.
    const tidy = () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setOffsets({});
            setOrder(INITIAL_ORDER);
            return;
        }
        setPhase("burning");
    };

    useEffect(() => {
        if (phase === "idle") return;
        const timer = window.setTimeout(
            () => {
                if (phase === "burning") {
                    setOffsets({});
                    setOrder(INITIAL_ORDER);
                    setRound((r) => r + 1);
                    setPhase("reborn");
                } else {
                    setPhase("idle");
                }
            },
            phase === "burning" ? BURN_MS + 200 : REBORN_MS
        );
        return () => window.clearTimeout(timer);
    }, [phase]);

    const sheet = (id: SheetId, delay: number) => ({
        id,
        delay,
        z: order.indexOf(id) + 1,
        offset: offsets[id] ?? ZERO,
        onFront: front,
        onMove: move,
        phase,
        round,
    });

    return (
        <section className="relative">
            <div data-desk className="relative mx-auto max-w-6xl px-6 pt-40 pb-28 sm:pt-44">
                <div className="grid items-stretch gap-10 lg:grid-cols-2">
                    {/* Left: name paper */}
                    <Sheet {...sheet("name", 0)} className="h-full lg:h-[580px]">
                        <NameSheet />
                    </Sheet>

                    {/* Right: terminal, sized to match the name paper, with the "next steps" note stuck to its right side */}
                    <div className="relative">
                        <Sheet {...sheet("terminal", 150)} className="h-full lg:h-[580px]">
                            <Terminal />
                        </Sheet>
                        {/* The Portuguese items are longer, so the note is a bit wider there */}
                        <Sheet
                            {...sheet("now", 300)}
                            className={cn(
                                "mt-8 max-w-xs rotate-[4deg] xl:absolute xl:-right-14 xl:-bottom-20 xl:mt-0 2xl:-right-20",
                                lang === "pt" ? "xl:w-[260px] xl:max-w-none" : "xl:w-60"
                            )}
                        >
                            <NextStepsNote />
                        </Sheet>
                    </div>
                </div>

                <div className="absolute bottom-2 left-6 z-10 hidden items-center gap-5 font-hand text-xl text-slate-500 xl:flex dark:text-gray-400">
                    {phase !== "idle" ? null : moved ? (
                        <button
                            type="button"
                            onClick={tidy}
                            className="underline decoration-wavy underline-offset-4 hover:text-slate-900 dark:hover:text-white"
                        >
                            {t.tidy}
                        </button>
                    ) : (
                        <span>{t.psst}</span>
                    )}
                </div>
            </div>
        </section>
    );
}
