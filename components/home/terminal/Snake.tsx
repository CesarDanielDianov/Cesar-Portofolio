"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CELL = 14;
const START_DELAY = 120; // ms per move
const MIN_DELAY = 60;
const BEST_KEY = "terminal-snake-best";

type Pt = { x: number; y: number };

const DIRS: Record<string, Pt> = {
    ArrowUp: { x: 0, y: -1 },
    w: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    s: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    a: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    d: { x: 1, y: 0 },
};

function loadBest() {
    try {
        return Number(window.localStorage.getItem(BEST_KEY)) || 0;
    } catch {
        return 0;
    }
}

function saveBest(n: number) {
    try {
        window.localStorage.setItem(BEST_KEY, String(n));
    } catch {
        /* storage blocked: the best score just isn't remembered */
    }
}

/**
 * Snake played inside the terminal body, on a transparent board.
 * `onExit` must be stable (useCallback).
 */
export default function Snake({ onExit }: { onExit: (score: number, best: number) => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(loadBest);
    const [over, setOver] = useState(false);
    const [paused, setPaused] = useState(false);
    const [round, setRound] = useState(0);
    const dir = useRef<Pt>({ x: 1, y: 0 });
    const turns = useRef<Pt[]>([]);
    const scoreRef = useRef(0);
    const bestRef = useRef(best);
    const overRef = useRef(false);
    const pausedRef = useRef(false);
    const touch = useRef<Pt | null>(null);
    /** Set by the game loop: moves right away when a turn arrives, instead of at the next tick. */
    const kick = useRef<() => void>(() => {});

    const restart = useCallback(() => {
        overRef.current = false;
        pausedRef.current = false;
        scoreRef.current = 0;
        setScore(0);
        setOver(false);
        setPaused(false);
        setRound((r) => r + 1);
    }, []);

    const togglePause = useCallback(() => {
        if (overRef.current) return;
        pausedRef.current = !pausedRef.current;
        setPaused(pausedRef.current);
    }, []);

    const quit = useCallback(() => onExit(scoreRef.current, bestRef.current), [onExit]);

    /** Queues a turn, ignoring reversals so a fast double-tap can't kill you. */
    const turn = useCallback((d: Pt) => {
        if (pausedRef.current) return;
        const last = turns.current.at(-1) ?? dir.current;
        if ((d.x === -last.x && d.y === -last.y) || (d.x === last.x && d.y === last.y)) return;
        if (turns.current.length < 3) turns.current.push(d);
        kick.current();
    }, []);

    // Game loop, restarted every round. Fixed-step on requestAnimationFrame: it only redraws
    // when the snake moves, and stops on its own while the tab is hidden.
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const { width, height } = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cols = Math.max(8, Math.floor(width / CELL));
        const rows = Math.max(6, Math.floor(height / CELL));
        const ox = Math.floor((width - cols * CELL) / 2);
        const oy = Math.floor((height - rows * CELL) / 2);
        const cell = (p: Pt) => p.y * cols + p.x;

        const cx = Math.floor(cols / 2);
        const cy = Math.floor(rows / 2);
        const snake: Pt[] = [{ x: cx, y: cy }, { x: cx - 1, y: cy }, { x: cx - 2, y: cy }];
        // Occupied cells, so collisions and food placement are O(1) instead of scanning the snake.
        const body = new Set(snake.map(cell));
        dir.current = { x: 1, y: 0 };
        turns.current = [];

        const placeFood = (): Pt | null => {
            for (let i = 0; i < 20; i++) {
                const p = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
                if (!body.has(cell(p))) return p;
            }
            // Crowded board: pick from the cells that are actually free.
            const free: number[] = [];
            for (let i = 0; i < cols * rows; i++) if (!body.has(i)) free.push(i);
            if (!free.length) return null;
            const f = free[Math.floor(Math.random() * free.length)];
            return { x: f % cols, y: Math.floor(f / cols) };
        };
        let food = placeFood();
        let delay = START_DELAY;

        const css = getComputedStyle(canvas);
        const frame = css.getPropertyValue("--snake-frame") || "rgba(128,128,128,0.3)";

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = frame;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(ox + 0.5, oy + 0.5, cols * CELL - 1, rows * CELL - 1);
            ctx.setLineDash([]);
            if (food) {
                ctx.fillStyle = "#e95420";
                ctx.beginPath();
                ctx.arc(ox + food.x * CELL + CELL / 2, oy + food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.fillStyle = "#3fb950";
            for (let i = snake.length - 1; i > 0; i--) {
                ctx.fillRect(ox + snake[i].x * CELL + 1, oy + snake[i].y * CELL + 1, CELL - 2, CELL - 2);
            }
            ctx.fillStyle = "#2ea043";
            ctx.fillRect(ox + snake[0].x * CELL, oy + snake[0].y * CELL, CELL, CELL);
        };

        const die = () => {
            const b = Math.max(bestRef.current, scoreRef.current);
            if (b !== bestRef.current) {
                bestRef.current = b;
                saveBest(b);
                setBest(b);
            }
            overRef.current = true;
            setOver(true);
        };

        /** Moves one cell; returns false when the snake dies. */
        const step = () => {
            const next = turns.current.shift();
            if (next) dir.current = next;
            const head = { x: snake[0].x + dir.current.x, y: snake[0].y + dir.current.y };
            if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows) return false;

            const eats = food !== null && head.x === food.x && head.y === food.y;
            if (!eats) {
                // The tail moves out of the way this tick, so it never blocks the head.
                const tail = snake.pop()!;
                body.delete(cell(tail));
            }
            if (body.has(cell(head))) return false;
            snake.unshift(head);
            body.add(cell(head));

            if (eats) {
                scoreRef.current += 1;
                setScore(scoreRef.current);
                food = placeFood();
                delay = Math.max(MIN_DELAY, delay - 3);
            }
            return true;
        };

        let raf = 0;
        let last = performance.now();
        let acc = -450; // short pause before the first move
        let lastStep = 0;

        // Input lag fix: a turn normally waits for the next tick (up to a full move). If the snake
        // has already spent a good part of the current tick, take the turn now and restart the tick.
        // The 40% floor stops rapid tapping from speeding the snake up.
        kick.current = () => {
            if (pausedRef.current || overRef.current || acc < 0 || turns.current.length !== 1) return;
            const now = performance.now();
            if (now - lastStep < delay * 0.4) return;
            lastStep = now;
            acc = 0;
            if (!step()) {
                draw();
                cancelAnimationFrame(raf);
                die();
                return;
            }
            draw();
        };

        const loop = (now: number) => {
            // Clamp so a long frame (tab switch, slow device) doesn't fast-forward the game.
            acc += Math.min(now - last, 250);
            last = now;
            if (pausedRef.current) acc = Math.min(acc, 0);
            let moved = false;
            while (acc >= delay && !pausedRef.current) {
                acc -= delay;
                lastStep = now;
                if (!step()) {
                    draw();
                    die();
                    return;
                }
                moved = true;
            }
            if (moved) draw();
            raf = requestAnimationFrame(loop);
        };

        draw();
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            kick.current = () => {};
        };
    }, [round]);

    // Keyboard: arrows / WASD steer, space or p pauses (and restarts after game over), q / Esc quits.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            if (k === "Escape" || k === "q") {
                e.preventDefault();
                e.stopPropagation();
                quit();
            } else if (k === " " || k === "Enter" || k === "p") {
                e.preventDefault();
                if (overRef.current) restart();
                else togglePause();
            } else if (DIRS[k]) {
                e.preventDefault();
                turn(DIRS[k]);
            }
        };
        window.addEventListener("keydown", onKey, true);
        return () => window.removeEventListener("keydown", onKey, true);
    }, [quit, restart, togglePause, turn]);

    return (
        <div
            className="absolute inset-0 z-20 flex flex-col font-mono text-xs text-gray-700 dark:text-gray-300"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
                const t = e.touches[0];
                touch.current = { x: t.clientX, y: t.clientY };
            }}
            onTouchMove={(e) => {
                // Turn as soon as the finger has moved far enough, not on release, so swipes feel instant.
                const start = touch.current;
                const t = e.touches[0];
                if (!start) return;
                const dx = t.clientX - start.x;
                const dy = t.clientY - start.y;
                if (Math.max(Math.abs(dx), Math.abs(dy)) < 16) return;
                turn(Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) });
                touch.current = { x: t.clientX, y: t.clientY }; // chain swipes without lifting the finger
            }}
            onTouchEnd={() => {
                touch.current = null;
            }}
        >
            <div className="flex items-center justify-between border-b border-gray-300 px-4 py-2 dark:border-white/10">
                <span>
                    <span className="text-green-700 dark:text-green-400">snake</span> · score{" "}
                    <span className="font-bold text-gray-900 dark:text-white">{score}</span> · best {best}
                </span>
                <button
                    type="button"
                    onClick={quit}
                    className="text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                    q to quit
                </button>
            </div>
            <div className="relative min-h-0 flex-1 touch-none">
                <canvas
                    ref={canvasRef}
                    aria-label="Snake game"
                    className="absolute inset-0 h-full w-full [--snake-frame:rgba(0,0,0,0.2)] dark:[--snake-frame:rgba(255,255,255,0.15)]"
                />
                {(over || paused) && (
                    <div className="absolute inset-0 grid place-items-center text-center backdrop-blur-[2px] animate-[fadeIn_0.3s_ease-out_both]">
                        {over ? (
                            <div>
                                <p className="text-base font-bold text-red-600 dark:text-red-400">game over</p>
                                <p className="mt-1">
                                    score {score} · best {best}
                                </p>
                                <button
                                    type="button"
                                    onClick={restart}
                                    className="mt-3 rounded-md border border-gray-400 px-3 py-1 transition-colors hover:bg-gray-500/10 dark:border-white/20"
                                >
                                    play again (space)
                                </button>
                            </div>
                        ) : (
                            <button type="button" onClick={togglePause} className="text-base font-bold">
                                paused · space to resume
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="border-t border-gray-300 px-4 py-1.5 text-gray-500 dark:border-white/10">
                arrows / WASD · space pauses · swipe on phones
            </div>
        </div>
    );
}
