"use client";

import { useRef, type CSSProperties } from "react";

const SLICES = 12;

/** Official palettes, used for the confetti. */
const PORTUGAL = ["#046A38", "#DA291C", "#FFE900"];
const MOLDOVA = ["#0046AE", "#FFD200", "#CC092F"];

type Flag = { src: string; name: string; ratio: string };

const FLAGS: Flag[] = [
    { src: "/pt.webp", name: "Portugal", ratio: "3 / 2" },
    { src: "/ml.png", name: "Moldova", ratio: "2 / 1" },
];

/**
 * A flag drawn as vertical strips of the same image, each bobbing slightly
 * out of phase so the cloth ripples. The ripple grows away from the pole
 * (--a scales with the slice index), and a moving sheen fakes the folds.
 */
function WavingFlag({ src, name, ratio }: Flag) {
    return (
        <span
            className="fx-flag h-4 sm:h-7 lg:h-9"
            style={{ aspectRatio: ratio } as CSSProperties}
            title={name}
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

/** Small confetti burst in both flags' colours, launched from the pair's centre. */
function burst(from: HTMLElement) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { left, top, width, height } = from.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const colors = [...PORTUGAL, ...MOLDOVA];

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

/** Portuguese and Moldovan flags waving side by side; click for confetti. */
export default function FlagPair() {
    const ref = useRef<HTMLButtonElement>(null);

    return (
        <button
            ref={ref}
            type="button"
            aria-label="Portugal and Moldova"
            className="fx-flags flex items-center gap-2.5"
            onClick={() => ref.current && burst(ref.current)}
        >
            {FLAGS.map((f) => (
                <WavingFlag key={f.name} {...f} />
            ))}
        </button>
    );
}
