"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { site } from "@/content/site";
import { getProjects, projectCount } from "@/content/projects";
import { getExperience } from "@/content/experience";
import { useLang, useT } from "@/components/i18n/LangProvider";
import { LOCALE } from "@/lib/i18n";
import type { Dict } from "@/content/i18n";
import Snake from "@/components/home/terminal/Snake";

const INTRO_CMD = "cat developer.ts";


// Only these fixed internal routes are ever passed to router.push.
const ROUTES: Record<string, string> = {
    experience: "/experience",
    projects: "/projects",
    cv: "/cv",
    home: "/",
};

function Prompt() {
    return (
        <>
            <span className="text-green-700 dark:text-green-400">c.dianov@pop-os</span>
            <span className="text-gray-800 dark:text-white">:</span>
            <span className="text-blue-700 dark:text-blue-400">~/workspace</span>
            <span className="text-gray-800 dark:text-white">$ </span>
        </>
    );
}

function DeveloperObject() {
    const T = useT();
    const [r1, r2, r3] = T.terminal.roles;
    return (
        <pre className="overflow-x-auto text-gray-700 dark:text-gray-300">
            <code className="block">
                <span className="text-purple-700 dark:text-purple-400">const</span>{" "}
                <span className="text-blue-700 dark:text-blue-300">developer</span> = {"{"}
                {"\n"}
                {"  "}location: <span className="text-orange-700 dark:text-orange-300">&quot;{site.location}&quot;</span>,
                {"\n"}
                {"  "}roles: [{"\n"}
                {"    "}
                <span className="text-teal-700 dark:text-teal-300">&quot;{r1}&quot;</span>,
                {"\n"}
                {"    "}
                <span className="text-teal-700 dark:text-teal-300">&quot;{r2}&quot;</span>,
                {"\n"}
                {"    "}
                <span className="text-teal-700 dark:text-teal-300">&quot;{r3}&quot;</span>
                {"\n"}
                {"  "}]
                {"\n"}
                {"  "}focus: <span className="text-teal-700 dark:text-teal-300">&quot;{T.home.focusValue}&quot;</span>
                {"\n"}
                {"}"};
            </code>
        </pre>
    );
}

/** Commands listed by `help`, in order; their descriptions are in the dictionary. */
const COMMANDS: (keyof Dict["terminal"]["help"])[] = [
    "help",
    "whoami",
    "neofetch",
    "ls",
    "ls projects",
    "ls experience",
    "cat developer.ts",
    "experience",
    "projects",
    "cv",
    "github",
    "linkedin",
    "theme",
    "matrix",
    "snake",
    "history",
    "clear",
];

/** Everything Tab can complete to, most useful first. */
const COMPLETIONS = [
    ...COMMANDS,
    "theme dark",
    "theme light",
    "date",
    "echo ",
];

/** First completion that extends what was typed (case-insensitive), or "". */
function suggest(input: string) {
    if (!input) return "";
    const lower = input.toLowerCase();
    const hit = COMPLETIONS.find((c) => c.startsWith(lower) && c.length > lower.length);
    return hit ? hit.slice(lower.length) : "";
}

const ASCII = [
    " ██████ ██████ ",
    "██      ██   ██",
    "██      ██   ██",
    "██      ██   ██",
    " ██████ ██████ ",
].join("\n");

function Neofetch({ theme, uptime }: { theme: string; uptime: number }) {
    const { lang } = useLang();
    const t = useT();
    const k = t.terminal.neofetch;
    const rows: [string, string][] = [
        [k.location, site.location],
        [k.study, t.site.tagline],
        [k.roles, getExperience(lang).map((e) => e.title.toLowerCase()).slice(0, 3).join(", ")],
        [k.projects, String(projectCount)],
        [k.shell, "portfolio-sh"],
        [k.theme, t.terminal.themeName[theme] ?? theme],
        [k.uptime, uptime < 60 ? `${uptime}s` : `${Math.floor(uptime / 60)}m ${uptime % 60}s`],
    ];
    return (
        <div className="flex flex-wrap items-start gap-x-5 gap-y-2">
            <pre aria-hidden="true" className="fx-neofetch-art leading-tight">{ASCII}</pre>
            <div className="min-w-0 flex-1">
                <div className="font-bold text-green-700 dark:text-green-400">c.dianov@pop-os</div>
                <div className="text-gray-400">───────────────</div>
                {rows.map(([k, v]) => (
                    <div key={k}>
                        <span className="font-bold text-blue-700 dark:text-blue-400">{k}</span>: {v}
                    </div>
                ))}
                <div className="mt-1.5 flex gap-1" aria-hidden="true">
                    {["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500", "bg-teal-500", "bg-blue-500", "bg-purple-500"].map((c) => (
                        <span key={c} className={`h-3 w-4 ${c}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/** Falling-glyph "digital rain" over the terminal body for a few seconds. */
function MatrixRain({ onDone }: { onDone: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return onDone();
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        const size = 14;
        const drops = Array.from({ length: Math.ceil(width / size) }, () => Math.random() * -20);
        const glyphs = "アカサタナハマヤラワ0123456789CESARDIANOV<>{}=;";
        ctx.font = `${size}px monospace`;

        let frame = 0;
        let raf = 0;
        const tick = () => {
            frame++;
            if (frame % 2 === 0) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
                ctx.fillRect(0, 0, width, height);
                drops.forEach((y, i) => {
                    const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
                    ctx.fillStyle = Math.random() < 0.05 ? "#d1fae5" : "#22c55e";
                    ctx.fillText(ch, i * size, y * size);
                    drops[i] = y * size > height && Math.random() > 0.96 ? 0 : y + 1;
                });
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        const stop = window.setTimeout(onDone, 5000);
        const onKey = () => onDone();
        window.addEventListener("keydown", onKey);
        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(stop);
            window.removeEventListener("keydown", onKey);
        };
    }, [onDone]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            onClick={onDone}
            className="absolute inset-0 z-20 h-full w-full cursor-pointer bg-black/85 animate-[fadeIn_0.4s_ease-out_both]"
        />
    );
}

type Entry = { cmd?: string; out: ReactNode };

export default function Terminal() {
    const router = useRouter();
    const { lang } = useLang();
    const T = useT();
    const t = T.terminal;
    const { resolvedTheme, setTheme } = useTheme();
    const [matrix, setMatrix] = useState(false);
    const [snake, setSnake] = useState(false);
    const [typed, setTyped] = useState(0); // chars of INTRO_CMD typed so far
    const [entries, setEntries] = useState<Entry[]>([]);
    const [input, setInput] = useState("");
    const [past, setPast] = useState<string[]>([]);
    const [pastIdx, setPastIdx] = useState(-1);
    const [cleared, setCleared] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const introDone = typed >= INTRO_CMD.length;

    // Type the intro command, one character at a time.
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const t = window.setTimeout(() => setTyped(INTRO_CMD.length), 0);
            return () => window.clearTimeout(t);
        }
        let i = 0;
        let id = 0;
        const start = window.setTimeout(() => {
            id = window.setInterval(() => {
                i++;
                setTyped(i);
                if (i >= INTRO_CMD.length) window.clearInterval(id);
            }, 70);
        }, 900);
        return () => {
            window.clearTimeout(start);
            window.clearInterval(id);
        };
    }, []);

    // Keep the newest output in view.
    useEffect(() => {
        const el = bodyRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [entries, introDone]);

    const stopMatrix = useCallback(() => setMatrix(false), []);

    const endSnake = useCallback((score: number, best: number) => {
        setSnake(false);
        setEntries((e) => [...e, { out: t.snakeOver(score, best) }]);
        window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 30);
    }, [t]);

    /** Runs a command clicked in the output, as if typed. */
    const runClicked = (cmd: string) => {
        run(cmd);
        setPast((p) => [cmd, ...p]);
        setPastIdx(-1);
        inputRef.current?.focus({ preventScroll: true });
    };

    const run = (raw: string) => {
        const cmd = raw.trim();
        const lower = cmd.toLowerCase();
        const name = lower.replace(/^cd\s+/, "").replace(/\/$/, "");
        let out: ReactNode = null;

        if (lower === "clear") {
            setEntries([]);
            setCleared(true);
            return;
        } else if (lower === "") {
            out = null;
        } else if (lower === "help") {
            out = (
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                    {COMMANDS.map((c) => (
                        <div key={c} className="contents">
                            <button
                                type="button"
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    runClicked(c);
                                }}
                                className="text-left text-amber-700 underline-offset-2 hover:underline dark:text-yellow-300"
                            >
                                {c}
                            </button>
                            <span className="text-gray-500 dark:text-gray-400">{t.help[c]}</span>
                        </div>
                    ))}
                </div>
            );
        } else if (lower === "whoami") {
            out = `${site.name}, ${T.site.tagline}.`;
        } else if (lower === "ls") {
            out = (
                <span className="text-blue-700 dark:text-blue-400">
                    experience/ &nbsp;projects/ &nbsp;cv/ &nbsp;<span className="text-gray-700 dark:text-gray-300">developer.ts</span>
                </span>
            );
        } else if (lower === "ls projects" || lower === "ls projects/") {
            out = (
                <ol className="list-none">
                    {getProjects(lang).map((p, i) => (
                        <li key={p.title}>
                            <span className="text-gray-400">{String(i + 1).padStart(2, "0")} </span>
                            <a
                                href={p.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(ev) => ev.stopPropagation()}
                                className="text-blue-700 underline-offset-2 hover:underline dark:text-blue-400"
                            >
                                {p.title.toLowerCase()}
                            </a>
                            <span className="text-gray-500 dark:text-gray-400"> [{p.tags.join(", ")}]</span>
                        </li>
                    ))}
                </ol>
            );
        } else if (lower === "ls experience" || lower === "ls experience/") {
            out = (
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                    {getExperience(lang).map((e) => (
                        <div key={e.id} className="contents">
                            <span className="text-teal-700 dark:text-teal-300">{e.title.toLowerCase()}</span>
                            <span className="text-gray-500 dark:text-gray-400">{e.period}</span>
                        </div>
                    ))}
                </div>
            );
        } else if (lower === "neofetch") {
            const uptime = Math.floor(window.performance.now() / 1000);
            out = <Neofetch theme={resolvedTheme ?? "system"} uptime={uptime} />;
        } else if (lower === "theme" || lower === "theme dark" || lower === "theme light") {
            const next = lower === "theme" ? (resolvedTheme === "dark" ? "light" : "dark") : lower.slice(6);
            setTheme(next);
            out = t.themeSet(t.themeName[next] ?? next);
        } else if (lower === "matrix") {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                out = t.matrixOff;
            } else {
                setMatrix(true);
                out = t.matrixOn;
            }
        } else if (lower === "snake") {
            setSnake(true);
            out = t.snakeStart;
        } else if (lower === "history") {
            out = past.length ? [...past].reverse().map((c, i) => `${String(i + 1).padStart(3)}  ${c}`).join("\n") : t.noHistory;
        } else if (lower === "cat developer.ts") {
            out = <DeveloperObject />;
        } else if (ROUTES[name]) {
            out = t.opening(name);
            window.setTimeout(() => router.push(ROUTES[name]), 450);
        } else if (lower === "github" || lower === "linkedin") {
            out = t.opening(lower);
            window.open(site.links[lower], "_blank", "noopener,noreferrer");
        } else if (lower === "date") {
            out = new Date().toLocaleString(LOCALE[lang], { dateStyle: "full", timeStyle: "long" });
        } else if (lower.startsWith("echo ")) {
            out = cmd.slice(5);
        } else if (lower.startsWith("sudo")) {
            out = t.sudo;
        } else {
            out = (
                <>
                    {t.notFound(cmd)}
                    <span className="text-amber-700 dark:text-yellow-300">help</span>
                    {t.notFoundAfter}
                </>
            );
        }

        setEntries((e) => [...e, { cmd, out }]);
    };

    const ghost = suggest(input);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const atEnd = e.currentTarget.selectionStart === input.length;
        if ((e.key === "Tab" || (e.key === "ArrowRight" && atEnd)) && ghost) {
            e.preventDefault();
            setInput(input + ghost);
        } else if (e.key === "Tab" && input) {
            // Swallow Tab only mid-command; on an empty prompt it still moves focus on.
            e.preventDefault();
        } else if (e.key === "Enter") {
            run(input);
            if (input.trim()) setPast((p) => [input, ...p]);
            setInput("");
            setPastIdx(-1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const i = Math.min(pastIdx + 1, past.length - 1);
            if (i >= 0) {
                setPastIdx(i);
                setInput(past[i]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const i = pastIdx - 1;
            setPastIdx(Math.max(i, -1));
            setInput(i >= 0 ? past[i] : "");
        }
    };

    return (
        <div className="fx-sheets w-full max-w-xl rounded-xl">
        <div
            className="fx-paper-top relative isolate w-full cursor-text overflow-hidden rounded-xl border border-(--paper-edge) shadow-2xl shadow-black/10 dark:border-white/10 dark:shadow-black/40"
            onClick={() => {
                if (!snake) inputRef.current?.focus({ preventScroll: true });
            }}
        >
            {/* Window bar, GNOME / Pop!_OS style: title centered, minimize / maximize / close on the right */}
            <div data-drag-handle className="relative flex items-center justify-end border-b border-(--paper-edge) px-3 py-2 xl:cursor-grab">
                <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-xs font-medium text-gray-500 dark:text-gray-400">
                    c.dianov@pop-os:~
                </span>
                <div className="relative flex items-center gap-2">
                    <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full text-gray-500 dark:text-gray-400">
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path d="M4 11h8" />
                        </svg>
                    </span>
                    <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full text-gray-500 dark:text-gray-400">
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <rect x="4" y="4" width="8" height="8" rx="1" />
                        </svg>
                    </span>
                    <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-gray-500/15 text-gray-500 dark:text-gray-300">
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
                            <path d="M5 5l6 6M11 5l-6 6" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Terminal body */}
            <div className="relative overflow-hidden">
            {matrix && <MatrixRain onDone={stopMatrix} />}
            {snake && <Snake onExit={endSnake} />}
            <div
                ref={bodyRef}
                className={`fx-term-scroll relative h-[400px] sm:h-[460px] overflow-y-auto p-5 font-mono text-xs leading-[1.9] sm:p-6 sm:text-sm sm:leading-[1.9] lg:p-8 lg:text-base lg:leading-[1.6] ${snake ? "invisible" : ""}`}
            >

                <div className="relative z-10 flex flex-col gap-3">
                    {!cleared && (
                        <>
                            <div>
                                <Prompt />
                                <span className="text-amber-700 dark:text-yellow-300">
                                    {INTRO_CMD.slice(0, typed)}
                                </span>
                                {!introDone && <span className="fx-caret" />}
                            </div>
                            {introDone && (
                                <div className="animate-[fadeIn_0.5s_ease-out_both]">
                                    <DeveloperObject />
                                    <p className="mt-2 text-gray-400 dark:text-gray-500">
                                        {t.hintBefore}
                                        <button
                                            type="button"
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                runClicked("help");
                                            }}
                                            className="text-amber-700 underline underline-offset-2 dark:text-yellow-300"
                                        >
                                            help
                                        </button>
                                        {t.hintAfter}
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {entries.map((e, i) => (
                        <div key={i}>
                            {e.cmd !== undefined && (
                                <div>
                                    <Prompt />
                                    <span className="text-amber-700 dark:text-yellow-300">{e.cmd}</span>
                                </div>
                            )}
                            {e.out !== null && (
                                <div className="mt-1 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{e.out}</div>
                            )}
                        </div>
                    ))}

                    {introDone && !snake && (
                        <label className="flex items-center">
                            <Prompt />
                            <span className="relative flex-1">
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={onKeyDown}
                                    aria-label={t.inputLabel}
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    className="peer w-full bg-transparent text-amber-700 caret-transparent outline-none dark:text-yellow-300"
                                />
                                {/* block cursor drawn after the typed text */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute left-0 top-0 whitespace-pre text-transparent"
                                >
                                    {input}
                                    <span className="fx-caret" />
                                    <span className="text-gray-400 dark:text-gray-500">{ghost}</span>
                                </span>
                            </span>
                        </label>
                    )}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
