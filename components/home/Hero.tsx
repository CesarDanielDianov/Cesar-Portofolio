"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import Terminal from "@/components/home/Terminal";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { cn } from "@/lib/utils";

/**
 * Homepage as a desk of papers. From xl up the sheets are scattered and can be
 * dragged around (clicking one brings it to the front); below xl they stack in
 * a column and stay put.
 */

const DESK_QUERY = "(min-width: 1280px)";

type SheetId = "name" | "terminal" | "now" | "project" | "card";
type Offset = { x: number; y: number };

const ZERO: Offset = { x: 0, y: 0 };
/** Back to front. */
const INITIAL_ORDER: SheetId[] = ["name", "terminal", "project", "card", "now"];

/** Where each sheet lies on the desk (xl+), plus its tilt and mobile width. */
const PLACE: Record<SheetId, string> = {
    name: "rotate-[-1.2deg] xl:left-[1%] xl:top-[40px] xl:w-[540px]",
    terminal: "rotate-[0.8deg] xl:right-[1%] xl:top-[16px] xl:w-[576px]",
    now: "max-w-[270px] rotate-[3deg] xl:left-[41%] xl:top-[450px] xl:w-[250px]",
    project: "max-w-md rotate-[-2deg] xl:left-[7%] xl:top-[610px] xl:w-[420px]",
    card: "max-w-sm rotate-[1.5deg] xl:right-[5%] xl:top-[575px] xl:w-[360px]",
};

/** Where each sheet catches fire: three scorch-hole origins. */
const BURN: Record<SheetId, CSSProperties> = {
    name: { "--h1": "25% 88%", "--h2": "80% 70%", "--h3": "40% 20%" } as CSSProperties,
    terminal: { "--h1": "70% 92%", "--h2": "15% 60%", "--h3": "60% 15%" } as CSSProperties,
    now: { "--h1": "50% 95%", "--h2": "85% 40%", "--h3": "10% 20%" } as CSSProperties,
    project: { "--h1": "15% 90%", "--h2": "75% 85%", "--h3": "55% 10%" } as CSSProperties,
    card: { "--h1": "80% 92%", "--h2": "20% 75%", "--h3": "50% 10%" } as CSSProperties,
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

type Drag = { sx: number; sy: number; bx: number; by: number; min: Offset; max: Offset; last: Offset };

function Sheet({
    id,
    z,
    offset,
    onFront,
    onMove,
    handle = false,
    delay,
    phase,
    round,
    children,
}: {
    id: SheetId;
    z: number;
    offset: Offset;
    onFront: (id: SheetId) => void;
    onMove: (id: SheetId, p: Offset) => void;
    /** Only start a drag from an element marked data-drag-handle (the terminal's title bar). */
    handle?: boolean;
    delay: number;
    phase: Phase;
    /** Bumped after a burn so fresh sheets mount and drop in again. */
    round: number;
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
        if (handle ? !t.closest("[data-drag-handle]") : t.closest("a, button, input, textarea, select, label")) return;
        const el = ref.current;
        const stage = el?.parentElement;
        if (!el || !stage) return;

        // Keep the sheet on the desk (with a little overhang).
        const r = el.getBoundingClientRect();
        const s = stage.getBoundingClientRect();
        const slack = 40;
        drag.current = {
            sx: e.clientX,
            sy: e.clientY,
            bx: offset.x,
            by: offset.y,
            min: { x: offset.x + s.left - r.left - slack, y: offset.y + s.top - r.top - slack },
            max: { x: offset.x + s.right - r.right + slack, y: offset.y + s.bottom - r.bottom + slack },
            last: offset,
        };
        el.setPointerCapture(e.pointerId);
        e.preventDefault();
        setDragging(true);
    };

    // Writes straight to the element while dragging; React only hears about the final spot.
    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        if (!d || !ref.current) return;
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
                "fx-desk-sheet relative w-full max-w-xl xl:absolute xl:max-w-none",
                !handle && "xl:cursor-grab",
                dragging && "is-dragging xl:cursor-grabbing",
                phase !== "idle" && "pointer-events-none",
                phase === "reborn" && "is-reborn",
                PLACE[id]
            )}
            style={{ zIndex: z, translate: `${offset.x}px ${offset.y}px`, ...BURN[id] }}
        >
            <div
                key={round}
                className={phase === "burning" ? "fx-burn relative" : "fx-drop"}
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
    return (
        <div className="fx-sheets fx-sheets-alt">
            <div className="fx-paper-top border border-(--paper-edge) p-8 sm:p-10">
                <h1>
                    <span className="sr-only">{site.name}</span>
                    <span aria-hidden="true" className="block text-sm font-bold uppercase tracking-[0.35em] text-slate-500 dark:text-gray-400">
                        {site.name}
                    </span>
                    {/* Signature: written in left to right, then underlined with a swash */}
                    <span aria-hidden="true" className="relative mt-3 block w-fit">
                        <span className="fx-sign block font-hand text-[3.25rem] font-bold leading-[1.05] text-blue-950 sm:text-7xl xl:text-[5.5rem] dark:text-blue-100">
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

                <p className="mt-6 inline-flex rotate-[-2deg] items-center gap-2.5 border-2 border-green-700/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-800 sm:text-sm dark:border-green-400/70 dark:text-green-400">
                    {site.tagline}
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:hidden" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-green-500" />
                    </span>
                </p>

                <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                    Computer Engineering student at IST, IT Executive at Five Thousand Miles, Dev-Team &amp; HR member at
                    NEIIST. Passionate about software engineering, AI, and technology.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        href="/projects"
                        className="fx-btn group inline-flex items-center gap-2 border-2 border-gray-900 bg-gray-900 px-6 py-3 font-bold text-white dark:border-white dark:bg-white dark:text-gray-900"
                    >
                        View projects
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                    <Link
                        href="/cv"
                        className="fx-btn group inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3 font-bold dark:border-white"
                    >
                        Read my CV
                        <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const current = experience.filter((e) => /present/i.test(e.period));

function NowNote() {
    return (
        <div className="fx-sticky relative px-6 pt-8 pb-6">
            <span aria-hidden="true" className="fx-tape" />
            <p className="font-hand text-3xl font-bold leading-none">currently…</p>
            <ul className="mt-3 space-y-1 font-hand text-2xl leading-tight">
                {current.map((e) => (
                    <li key={e.id}>→ {e.title.toLowerCase()}</li>
                ))}
            </ul>
            <Link
                href="/experience"
                className="mt-4 inline-block font-hand text-xl underline decoration-wavy underline-offset-4"
            >
                see the whole story
            </Link>
        </div>
    );
}

function Paperclip() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 60"
            className="absolute -top-6 right-[100px] z-10 h-16 w-7 rotate-[8deg] text-slate-400 dark:text-slate-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
        >
            <path d="M8 18v26a4 4 0 0 0 8 0V10a6 6 0 0 0-12 0v36a8 8 0 0 0 16 0V20" />
        </svg>
    );
}

const featured = projects.find((p) => p.layout === "featured") ?? projects[0];

function ProjectSheet() {
    return (
        <div className="fx-sheets relative">
            <Paperclip />
            <div className="fx-paper-top border border-(--paper-edge) p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400">
                            ★ Featured project
                        </p>
                        <h2 className="mt-2 text-2xl font-bold">{featured.title}</h2>
                    </div>
                    <Image
                        src={featured.icon}
                        alt={featured.iconAlt}
                        width={64}
                        height={64}
                        draggable={false}
                        className="h-16 w-16 shrink-0 object-contain"
                    />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-gray-300">{featured.desc}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
                    <a
                        href={featured.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:underline"
                    >
                        View on GitHub ↗
                    </a>
                    <Link href="/projects" className="text-slate-500 underline-offset-4 hover:underline dark:text-gray-400">
                        all {projects.length} projects →
                    </Link>
                </div>
            </div>
        </div>
    );
}

function IndexCard() {
    const rows: [string, string][] = [
        ["based in", site.location],
        ["studying", "LEIC @ IST"],
        ["focus", "Software Architecture & AI"],
    ];
    const links: [string, string][] = [
        ["GitHub ↗", site.links.github],
        ["LinkedIn ↗", site.links.linkedin],
    ];
    return (
        <div className="fx-paper-top fx-lined border border-(--paper-edge) py-[28px] pr-6 pl-14">
            <p className="font-hand text-3xl font-bold leading-[28px] text-blue-900 dark:text-blue-200">about me</p>
            <dl className="mt-[28px] text-sm leading-[28px]">
                {rows.map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                        <dt className="text-slate-500 dark:text-gray-400">{k}:</dt>
                        <dd className="font-bold">{v}</dd>
                    </div>
                ))}
            </dl>
            <div className="flex flex-wrap gap-x-5 text-sm font-bold leading-[28px]">
                {links.map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                        {label}
                    </a>
                ))}
                <a href={site.cv.href} download={site.cv.downloadName} className="underline-offset-4 hover:underline">
                    CV ↓
                </a>
            </div>
        </div>
    );
}

export default function Hero() {
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
        const t = window.setTimeout(
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
        return () => window.clearTimeout(t);
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
            <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 pt-32 pb-20 xl:mt-24 xl:mb-8 xl:block xl:h-[880px] xl:p-0">
                <Sheet {...sheet("name", 0)}>
                    <NameSheet />
                </Sheet>
                <Sheet {...sheet("terminal", 150)} handle>
                    <Terminal />
                </Sheet>
                <Sheet {...sheet("now", 450)}>
                    <NowNote />
                </Sheet>
                <Sheet {...sheet("project", 300)}>
                    <ProjectSheet />
                </Sheet>
                <Sheet {...sheet("card", 400)}>
                    <IndexCard />
                </Sheet>

                <div className="absolute bottom-1 right-[1%] z-10 hidden items-center gap-5 font-hand text-xl text-slate-500 xl:flex dark:text-gray-400">
                    {phase !== "idle" ? null : moved ? (
                        <button
                            type="button"
                            onClick={tidy}
                            className="underline decoration-wavy underline-offset-4 hover:text-slate-900 dark:hover:text-white"
                        >
                            ↺ tidy up the desk
                        </button>
                    ) : (
                        <span>psst… the papers move. drag them around ↖</span>
                    )}
                </div>
            </div>
        </section>
    );
}
