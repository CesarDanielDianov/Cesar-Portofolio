let audioCtx: AudioContext | null = null;

/**
 * Short UI "toggle" sound: a soft, modern tick, synthesized with the
 * Web Audio API (no audio asset). Two layers:
 *  - tick: a very short sine blip that drops quickly in pitch (the snap)
 *  - pop: a soft sine that rises slightly and fades (the rounded body)
 * Opening ticks slightly higher than closing. Fails silently when audio is
 * unavailable (SSR, autoplay policy, old browsers).
 */
export function playToggle(opening: boolean) {
    if (typeof window === "undefined") return;
    try {
        audioCtx ??= new AudioContext();
        const ctx = audioCtx;
        if (ctx.state === "suspended") void ctx.resume();
        const t = ctx.currentTime;
        const pitch = opening ? 1 : 0.8;

        const out = ctx.createGain();
        out.gain.value = 0.2;
        out.connect(ctx.destination);

        // Tick: gentle sine blip, ~25 ms.
        const tick = ctx.createOscillator();
        tick.type = "sine";
        tick.frequency.setValueAtTime(1500 * pitch, t);
        tick.frequency.exponentialRampToValueAtTime(900 * pitch, t + 0.02);
        const tickGain = ctx.createGain();
        tickGain.gain.setValueAtTime(0.0001, t);
        tickGain.gain.exponentialRampToValueAtTime(0.25, t + 0.003);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);
        tick.connect(tickGain).connect(out);
        tick.start(t);
        tick.stop(t + 0.03);

        // Pop: soft rounded sine, ~60 ms.
        const pop = ctx.createOscillator();
        pop.type = "sine";
        pop.frequency.setValueAtTime(500 * pitch, t);
        pop.frequency.exponentialRampToValueAtTime(700 * pitch, t + 0.04);
        const popGain = ctx.createGain();
        popGain.gain.setValueAtTime(0.0001, t);
        popGain.gain.exponentialRampToValueAtTime(0.3, t + 0.008);
        popGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
        pop.connect(popGain).connect(out);
        pop.start(t);
        pop.stop(t + 0.07);
    } catch {
        // Audio unavailable: stay silent.
    }
}
