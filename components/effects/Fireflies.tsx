import type { CSSProperties } from "react";

/**
 * A few fireflies drifting in the page background, dark theme only (see .fx-fireflies
 * in globals.css). Each one stays dark most of its cycle and only now and then
 * blinks on. CSS only, animating transform and opacity, so it stays cheap.
 *
 * [left %, top %, drift x px, drift y px, cycle s, delay s]
 */
const FLIES: [number, number, number, number, number, number][] = [
    [6, 18, 40, -30, 14, 0],
    [14, 72, -30, -50, 17, 4],
    [22, 40, 55, 25, 19, 9],
    [31, 88, 35, -40, 15, 2],
    [38, 12, -45, 30, 21, 12],
    [47, 63, 30, -35, 16, 6],
    [55, 30, -35, -25, 18, 15],
    [63, 82, 45, -30, 20, 1],
    [70, 50, -40, 35, 15, 10],
    [77, 15, 30, 40, 22, 5],
    [84, 68, -50, -20, 17, 13],
    [91, 35, 25, -45, 19, 7],
    [96, 90, -30, -35, 16, 11],
    [3, 55, 35, 20, 20, 16],
];

export default function Fireflies() {
    return (
        <div aria-hidden="true" className="fx-fireflies">
            {FLIES.map(([x, y, dx, dy, dur, d], i) => (
                <span
                    key={i}
                    className="fx-firefly"
                    style={
                        {
                            left: `${x}%`,
                            top: `${y}%`,
                            "--dx": `${dx}px`,
                            "--dy": `${dy}px`,
                            "--dur": `${dur}s`,
                            "--d": `-${d}s`,
                        } as CSSProperties
                    }
                />
            ))}
        </div>
    );
}
