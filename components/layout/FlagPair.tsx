"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useT } from "@/components/i18n/LangProvider";

/** Official palettes, used for the confetti. */
const PORTUGAL = ["#046A38", "#DA291C", "#FFE900"];
const MOLDOVA = ["#0046AE", "#FFD200", "#CC092F"];

type Flag = { id: "pt" | "md"; src: string; ratio: number; colors: string[]; audio: string; song: string };

const FLAGS: Flag[] = [
    // "A Portuguesa" by the United States Navy Band: public domain (US government work),
    // from Wikimedia Commons, File:A_Portuguesa.ogg.
    { id: "pt", src: "/pt.webp", ratio: 3 / 2, colors: PORTUGAL, audio: "/audio/a-portuguesa.ogg", song: "A Portuguesa" },
    // "Limba noastră" by the United States Navy Band (c. 2003): public domain,
    // from Wikimedia Commons, File:Imnul_Republicii_Moldova_US_NAVY.ogg.
    { id: "md", src: "/ml.png", ratio: 2, colors: MOLDOVA, audio: "/audio/limba-noastra.ogg", song: "Limba noastră" },
];

/**
 * Easter egg: 1 in 10 clicks on the Moldovan flag plays the Soviet anthem
 * instead, with red-and-gold confetti. 1955 instrumental arrangement: public
 * domain, from Wikimedia Commons, File:Soviet_Anthem_Instrumental_1955.ogg.
 */
const EGG = { chance: 0.1, audio: "/audio/soviet-anthem.ogg", colors: ["#CC0000", "#FFD700", "#A30000"] };

/** The song and confetti for a click on `f` (rolls the easter egg for Moldova). */
function pickSong(f: Flag) {
    return f.id === "md" && Math.random() < EGG.chance ? EGG : f;
}


/** Wave period in seconds: idle, hovered, and while that flag's anthem plays. */
const PERIOD = { idle: 1.6, hover: 0.7, playing: 0.5 };
/** Room above and below the cloth for the wave, as a fraction of the flag's height. */
const PAD = 0.1;
/** How many wavelengths fit across the flag. */
const WAVES = 1.15;
/** Minimum time between redraws (~30 fps). */
const FRAME_MS = 1000 / 30;
/**
 * A flag drawn on a canvas one pixel column at a time. Each column shifts by
 * a travelling sine wave whose height grows away from the pole, so the cloth
 * bends as one continuous surface. Light and shade follow the slope of the
 * wave to show the folds. `period` changes ease in, so the speed never jumps.
 */
function WavingFlag({ src, ratio, period }: Pick<Flag, "src" | "ratio"> & { period: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const periodRef = useRef(period);

    useEffect(() => {
        periodRef.current = period;
    }, [period]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const img = new Image();
        img.src = src;

        let phase = 0;
        let speed = (2 * Math.PI) / periodRef.current;
        let last = performance.now();
        let raf = 0;

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            if (!W || !H || !img.naturalWidth) return;
            const pad = (H * PAD) / (1 + 2 * PAD);
            const fh = H - 2 * pad;
            const k = WAVES * 2 * Math.PI;
            const sw = img.naturalWidth / W;

            ctx.clearRect(0, 0, W, H);
            ctx.globalCompositeOperation = "source-over";
            for (let x = 0; x < W; x++) {
                const u = x / W;
                const a = phase - u * k;
                const reach = u * (0.35 + 0.65 * u); // pinned at the pole
                const dy = Math.sin(a) * pad * reach;
                // Folds facing away look slightly shorter: a hint of depth.
                const ch = fh * (1 - 0.05 * reach * (1 - Math.cos(a)));
                ctx.drawImage(img, x * sw, 0, sw, img.naturalHeight, x, pad + dy + (fh - ch) / 2, 1, ch);
            }

            // Shade the cloth only (source-atop): light on rising slopes, dark on falling ones.
            const shade = ctx.createLinearGradient(0, 0, W, 0);
            const stops = 32;
            for (let i = 0; i <= stops; i++) {
                const u = i / stops;
                const slope = Math.cos(phase - u * k) * (0.3 + 0.7 * u);
                shade.addColorStop(
                    u,
                    slope > 0 ? `rgba(255,255,255,${(0.22 * slope).toFixed(3)})` : `rgba(0,0,0,${(-0.28 * slope).toFixed(3)})`,
                );
            }
            ctx.globalCompositeOperation = "source-atop";
            ctx.fillStyle = shade;
            ctx.fillRect(0, 0, W, H);
            ctx.globalCompositeOperation = "source-over";
        };

        // Redraw at most ~30 times a second: smooth enough for cloth, and on 120/144 Hz
        // screens it avoids redrawing the flag several hundred column slices every frame.
        const frame = (now: number) => {
            raf = requestAnimationFrame(frame);
            if (now - last < FRAME_MS) return;
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            const target = (2 * Math.PI) / periodRef.current;
            speed += (target - speed) * Math.min(1, dt * 4);
            phase += speed * dt;
            draw();
        };

        const resize = () => {
            const r = canvas.getBoundingClientRect();
            // Capped at 2x: denser screens would only add columns nobody can tell apart.
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(r.width * dpr);
            canvas.height = Math.round(r.height * dpr);
            draw();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        img.onload = () => {
            resize();
            if (!still) {
                last = performance.now();
                raf = requestAnimationFrame(frame);
            }
        };

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            img.onload = null;
        };
    }, [src]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="fx-flag h-[18px] sm:h-8 lg:h-10"
            style={{ aspectRatio: `${ratio} / ${1 + 2 * PAD}` } as CSSProperties}
        />
    );
}

/** Small confetti burst in one flag's colours, launched from its centre. */
function burst(from: HTMLElement, colors: string[]) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { left, top, width, height } = from.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    for (let i = 0; i < 28; i++) {
        const bit = document.createElement("span");
        const size = 4 + Math.random() * 4;
        Object.assign(bit.style, {
            position: "fixed",
            left: `${x}px`,
            top: `${y}px`,
            width: `${size}px`,
            height: `${size * (Math.random() < 0.5 ? 1 : 0.5)}px`,
            background: colors[i % colors.length],
            borderRadius: Math.random() < 0.3 ? "50%" : "1px",
            pointerEvents: "none",
            zIndex: "50",
        });
        document.body.appendChild(bit);

        // Fan out mostly downward-right (away from the screen edge), then fall.
        const angle = (Math.random() * 0.9 - 0.15) * Math.PI;
        const dist = 40 + Math.random() * 70;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const spin = (Math.random() - 0.5) * 720;

        bit.animate(
            [
                { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) rotate(${spin / 2}deg)`, opacity: 1, offset: 0.45 },
                { transform: `translate(${dx * 1.2}px, ${dy + 60}px) rotate(${spin}deg)`, opacity: 0 },
            ],
            { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.4,1)" },
        ).onfinish = () => bit.remove();
    }
}

/**
 * One song at a time, module-wide. A song plays to its end; starting another
 * cuts off the current one. `owner` is the flag that started it; `onChange`
 * hears which flag is playing (or null), including when a song ends by itself.
 */
const players = new Map<string, HTMLAudioElement>();
let playing: { owner: string; audio: HTMLAudioElement } | null = null;
let onChange: ((owner: string | null) => void) | null = null;

function stopClip() {
    if (!playing) return;
    playing.audio.pause();
    playing = null;
    onChange?.(null);
}

function playClip(src: string, owner: string) {
    stopClip();
    let audio = players.get(src);
    if (!audio) {
        audio = new Audio(src);
        audio.addEventListener("ended", () => playing?.audio === audio && stopClip());
        players.set(src, audio);
    }
    const a = audio;
    a.currentTime = 0;
    a.volume = 0.8;
    // Fails quietly when the file is missing or the browser blocks playback.
    a.play().catch(() => playing?.audio === a && stopClip());
    playing = { owner, audio: a };
    onChange?.(owner);
}

/**
 * Portuguese and Moldovan flags waving side by side. A click plays that
 * country's anthem and throws confetti in its colours; clicking the flag again
 * while its anthem plays stops it.
 */
export default function FlagPair() {
    const t = useT().flags;
    const [active, setActive] = useState<string | null>(null);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        onChange = setActive;
        return () => {
            onChange = null;
            stopClip();
        };
    }, []);

    return (
        <div
            role="group"
            aria-label={t.group}
            className="fx-flags flex items-center gap-2.5"
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
        >
            {FLAGS.map((f) => {
                const on = active === f.id;
                return (
                    <button
                        key={f.id}
                        type="button"
                        title={t.play(t[f.id], f.song)}
                        aria-label={t.play(t[f.id], f.song)}
                        aria-pressed={on}
                        className={`fx-flag-btn ${on ? "is-playing" : ""}`}
                        onClick={(e) => {
                            if (on) return stopClip();
                            const song = pickSong(f);
                            playClip(song.audio, f.id);
                            burst(e.currentTarget, song.colors);
                        }}
                    >
                        <WavingFlag src={f.src} ratio={f.ratio} period={on ? PERIOD.playing : hover ? PERIOD.hover : PERIOD.idle} />
                    </button>
                );
            })}
        </div>
    );
}
