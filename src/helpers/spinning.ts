import { Tween } from "svelte/motion";
import { expoOut } from "svelte/easing";
import { get } from "svelte/store";
import { levelObjects } from "./statusStore";
import type { Level } from "./api";

export let rotDuration = 3000;
export let rotation = new Tween(0, { duration: rotDuration, easing: expoOut });

export function createTween() {
    let animationFrameId: number;
    let start: number;

    type TweenOptions = {
        from: number;
        to: number;
        duration: number;
        easing?: (t: number) => number;
        update: (value: number) => void;
        onComplete?: () => void;
    };

    return function tween({
        from,
        to,
        duration,
        easing = t => t,
        update,
        onComplete
    }: TweenOptions) {
        cancelAnimationFrame(animationFrameId);
        start = performance.now();

        const segmentAngle = getSegmentAngle();

        function frame(now: number): void {
            const t = Math.min((now - start) / duration, 1);
            const currentValue = from + (to - from) * easing(t);

            update(currentValue);

            if (t < 1) {
                animationFrameId = requestAnimationFrame(frame);
            } else {
                onComplete?.();
            }
        }

        animationFrameId = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(animationFrameId);
    };
}

export function chooseLevel() {
    let index = Math.round(Math.random() * (get(levelObjects)?.length ?? 0))
    return get(levelObjects)?.[index];
}

export function getSegmentAngle() {
    const levels = get(levelObjects);
    if (!levels || !levels.length) return 0;
    return 360 / levels.length;
}

export function calculateWheelRotation(level: Level) {
    // segment angle = 360 / levels.count
    // position from 0 = index * segment angle
    // real position / dist from 0 = ((rotation % 360) + position from 0) % 360 +- segmentangle / 2
    // rotate to zero = 360 - realPos

    const levels = get(levelObjects);
    if (!levels || !levels.length) return 0;

    const index = levels.indexOf(level);
    if (index === -1) return 0;

    const segmentAngle = getSegmentAngle();
    const offsetFromZero = index * segmentAngle;

    const realPosition =
        ((rotation.current % 360) + offsetFromZero) % 360;
    const maxDeviation = segmentAngle * 0.45;
    const randomDeviation =
        (Math.random() * 2 - 1) * maxDeviation;

    const distToRotate =
        360 - realPosition - segmentAngle / 2 + randomDeviation;

    return distToRotate + 2880;
}