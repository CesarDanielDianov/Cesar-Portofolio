"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useT } from "@/components/i18n/LangProvider";

const SLICES = 12;

/** Official palettes, used for the confetti. */
const PORTUGAL = ["#046A38", "#DA291C", "#FFE900"];
const MOLDOVA = ["#0046AE", "#FFD200", "#CC092F"];

type Flag = { id: "pt" | "md"; src: string; ratio: string; colors: string[]; audio: string; song: string };

const FLAGS: Flag[] = [
    // "A Portuguesa" by the United States Navy Band: public domain (US government work),
    // from Wikimedia Commons, File:A_Portuguesa.ogg.
    { id: "pt", src: "/pt.webp", ratio: "3 / 2", colors: PORTUGAL, audio: "/audio/a-portuguesa.ogg", song: "A Portuguesa" },
    // "Limba noastră" by the United States Navy Band (c. 2003): public domain,
    // from Wikimedia Commons, File:Imnul_Republicii_Moldova_US_NAVY.ogg.
    { id: "md", src: "/ml.png", ratio: "2 / 1", colors: MOLDOVA, audio: "/audio/limba-noastra.ogg", song: "Limba noastră" },
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

/** Longest a song plays per click, and the fade at its end. */
const CLIP_MS = 60000;
const FADE_MS = 500;

/**
 * A flag drawn as vertical strips of the same image, each bobbing slightly
 * out of phase so the cloth ripples. The ripple grows away from the pole
 * (--a scales with the slice index), and a moving sheen fakes the folds.
 */
function WavingFlag({ src, ratio }: Pick<Flag, "src" | "ratio">) {
    return (
        <span
            className="fx-flag h-4 sm:h-7 lg:h-9"
            style={{ aspectRatio: ratio } as CSSProperties}
        >
            {Array.from({ length: SLICES }, (_, i) => (
                <span
                    key={i}
                    className="fx-flag-slice"
                    style={
                        {
                            "--i": i,
                            "--a": `${(i / (SLICES - 1)) * 2.2}px`,
                            backgroundImage: `url(${src})`,
                            backgroundSize: `${SLICES * 100}% 100%`,
                            backgroundPosition: `${(i / (SLICES - 1)) * 100}% 0`,
                        } as CSSProperties
                    }
                />
            ))}
        </span>
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
 * One song at a time, module-wide. Plays up to CLIP_MS of a song, fading out at
 * the end; starting another song cuts off the current one. `owner` is the flag
 * that started it; `onChange` hears which flag is playing (or null), including
 * when a song ends on its own.
 */
const players = new Map<string, HTMLAudioElement>();
let playing: { owner: string; audio: HTMLAudioElement; stop: ReturnType<typeof setTimeout>; fade?: ReturnType<typeof setInterval> } | null = null;
let onChange: ((owner: string | null) => void) | null = null;

function stopClip() {
    if (!playing) return;
    clearTimeout(playing.stop);
    clearInterval(playing.fade);
    playing.audio.pause();
    playing = null;
    onChange?.(null);
}

function playClip(src: string, owner: string) {
    stopClip();
    let audio = players.get(src);
    if (!audio) {
        audio = new Audio(src);
        // A song shorter than CLIP_MS ends by itself: count it as stopped.
        audio.addEventListener("ended", () => playing?.audio === audio && stopClip());
        players.set(src, audio);
    }
    const a = audio;
    a.currentTime = 0;
    a.volume = 0.8;
    // Fails quietly when the file is missing or the browser blocks playback.
    a.play().catch(() => playing?.audio === a && stopClip());

    const stop = setTimeout(() => {
        if (!playing || playing.audio !== a) return;
        const steps = 10;
        let n = 0;
        playing.fade = setInterval(() => {
            a.volume = Math.max(0, 0.8 * (1 - ++n / steps));
            if (n >= steps) stopClip();
        }, FADE_MS / steps);
    }, CLIP_MS - FADE_MS);
    playing = { owner, audio: a, stop };
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

    useEffect(() => {
        onChange = setActive;
        return () => {
            onChange = null;
            stopClip();
        };
    }, []);

    return (
        <div role="group" aria-label={t.group} className="fx-flags flex items-center gap-2.5">
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
                        <WavingFlag src={f.src} ratio={f.ratio} />
                    </button>
                );
            })}
        </div>
    );
}
