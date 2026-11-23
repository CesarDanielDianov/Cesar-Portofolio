"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";

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
                <span className="text-teal-700 dark:text-teal-300">&quot;LEIC Senior @ IST&quot;</span>,
                {"\n"}
                {"    "}
                <span className="text-teal-700 dark:text-teal-300">&quot;IT Exec @ Five Thousand Miles&quot;</span>,
                {"\n"}
                {"    "}
                <span className="text-teal-700 dark:text-teal-300">&quot;Dev & HR @ NEIIST&quot;</span>
                {"\n"}
                {"  "}]
                {"\n"}
                {"  "}focus: <span className="text-teal-700 dark:text-teal-300">&quot;Software Architecture & AI&quot;</span>
                {"\n"}
                {"}"};
            </code>
        </pre>
    );
}

const HELP: [string, string][] = [
    ["help", "list commands"],
    ["whoami", "who is this?"],
    ["neofetch", "system info, developer edition"],
    ["ls", "list files"],
    ["ls projects", "list every project"],
    ["ls experience", "list every role"],
    ["cat developer.ts", "print the developer object"],
    ["experience", "open the experience page"],
    ["projects", "open the projects page"],
    ["cv", "open the CV page"],
    ["github", "open my GitHub"],
    ["linkedin", "open my LinkedIn"],
    ["theme", "switch light / dark"],
    ["matrix", "follow the white rabbit"],
    ["history", "commands you ran"],
    ["clear", "clear the terminal"],
];

/** Everything Tab can complete to, most useful first. */
const COMPLETIONS = [
    ...HELP.map(([c]) => c),
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
    const rows: [string, string][] = [
        ["Location", site.location],
        ["Study", site.tagline],
        ["Roles", experience.map((e) => e.title.toLowerCase()).slice(0, 3).join(", ")],
        ["Projects", String(projects.length)],
        ["Shell", "portfolio-sh"],
        ["Theme", theme],
        ["Uptime", uptime < 60 ? `${uptime}s` : `${Math.floor(uptime / 60)}m ${uptime % 60}s`],
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

type Entry = { cmd: string; out: ReactNode };

export default function Terminal() {
    const router = useRouter();
    const { resolvedTheme, setTheme } = useTheme();
    const [matrix, setMatrix] = useState(false);
    const [session, setSession] = useState(0); // bumped by the red dot to replay the intro
    const [typed, setTyped] = useState(0); // chars of INTRO_CMD typed so far
    const [entries, setEntries] = useState<Entry[]>([]);
    const [input, setInput] = useState("");
    const [past, setPast] = useState<string[]>([]);
    const [pastIdx, setPastIdx] = useState(-1);
    const [cleared, setCleared] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const introDone = typed >= INTRO_CMD.length;

    // Type the intro command, one character at a time (again after each restart).
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
    }, [session]);

    // Keep the newest output in view.
    useEffect(() => {
        const el = bodyRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [entries, introDone]);

    const stopMatrix = useCallback(() => setMatrix(false), []);

    const restart = () => {
        setEntries([]);
        setCleared(false);
        setInput("");
        setMatrix(false);
        setTyped(0);
        setSession((n) => n + 1);
    };

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
                    {HELP.map(([c, d]) => (
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
                            <span className="text-gray-500 dark:text-gray-400">{d}</span>
                        </div>
                    ))}
                </div>
            );
        } else if (lower === "whoami") {
            out = `${site.name}, ${site.tagline}.`;
        } else if (lower === "ls") {
            out = (
                <span className="text-blue-700 dark:text-blue-400">
                    experience/ &nbsp;projects/ &nbsp;cv/ &nbsp;<span className="text-gray-700 dark:text-gray-300">developer.ts</span>
                </span>
            );
        } else if (lower === "ls projects" || lower === "ls projects/") {
            out = (
                <ol className="list-none">
                    {projects.map((p, i) => (
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
                    {experience.map((e) => (
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
            out = `Theme set to ${next}.`;
        } else if (lower === "matrix") {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                out = "Wake up, Neo… (animation off: reduced motion is on)";
            } else {
                setMatrix(true);
                out = "Wake up, Neo… (press any key to exit)";
            }
        } else if (lower === "history") {
            out = past.length ? [...past].reverse().map((c, i) => `${String(i + 1).padStart(3)}  ${c}`).join("\n") : "No history yet.";
        } else if (lower === "cat developer.ts") {
            out = <DeveloperObject />;
        } else if (ROUTES[name]) {
            out = `Opening ${name}…`;
            window.setTimeout(() => router.push(ROUTES[name]), 450);
        } else if (lower === "github" || lower === "linkedin") {
            out = `Opening ${lower}…`;
            window.open(site.links[lower], "_blank", "noopener,noreferrer");
        } else if (lower === "date") {
            out = new Date().toString();
        } else if (lower.startsWith("echo ")) {
            out = cmd.slice(5);
        } else if (lower.startsWith("sudo")) {
            out = "Permission denied. Nice try.";
        } else {
            out = (
                <>
                    command not found: {cmd}. Type{" "}
                    <span className="text-amber-700 dark:text-yellow-300">help</span>.
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
        <div
            className="relative isolate w-full max-w-md cursor-text overflow-hidden border-2 border-gray-600"
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
            {/* Linux/Tilix style Window bar */}
            <div className="flex items-center justify-between border-b border-gray-300/50 px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <svg
                        className="h-4 w-4 text-purple-600 dark:text-purple-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="font-mono text-xs font-medium text-gray-600 dark:text-gray-400">
                        c.dianov@pop-os:~
                    </span>
                </div>
                <div className="flex gap-1.5">
                    <button
                        type="button"
                        aria-label="Restart terminal"
                        title="Restart"
                        onClick={(ev) => {
                            ev.stopPropagation();
                            restart();
                        }}
                        className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-400"
                    />
                    <span className="h-3 w-3 rounded-full bg-yellow-400 transition-colors hover:bg-yellow-300" />
                    <span className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-400" />
                </div>
            </div>

            {/* Terminal body (glows sit outside the scroll area so they never cause scrollbars) */}
            <div className="relative overflow-hidden">
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 bg-[radial-gradient(circle,rgb(249_115_22/0.12),transparent_65%)]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 bg-[radial-gradient(circle,rgb(20_184_166/0.12),transparent_65%)]" />
            {matrix && <MatrixRain onDone={stopMatrix} />}
            <div
                ref={bodyRef}
                className="fx-term-scroll relative h-[360px] overflow-y-auto p-5 font-mono text-xs leading-relaxed sm:p-6 sm:text-sm lg:p-8"
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
                                        {"// type "}
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
                                        {" and press Enter (Tab completes)"}
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {entries.map((e, i) => (
                        <div key={i}>
                            <div>
                                <Prompt />
                                <span className="text-amber-700 dark:text-yellow-300">{e.cmd}</span>
                            </div>
                            {e.out !== null && (
                                <div className="mt-1 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{e.out}</div>
                            )}
                        </div>
                    ))}

                    {introDone && (
                        <label className="flex items-center">
                            <Prompt />
                            <span className="relative flex-1">
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={onKeyDown}
                                    aria-label="Terminal input"
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
    );
}
