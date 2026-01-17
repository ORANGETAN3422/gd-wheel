import { Tween } from "svelte/motion";
import { expoOut } from "svelte/easing";
import { get } from "svelte/store";
import { levelObjects } from "./statusStore";
import type { Level } from "./api";

export let rotation = new Tween(0, { duration: 3000, easing: expoOut });

export function chooseLevel() {
    let index = Math.round(Math.random() * (get(levelObjects)?.length ?? 0))
    return get(levelObjects)?.[index];
}

export function calculateWheelRotation(level: Level) {
    // segment angle = 360 / levels.count
    // position from 0 = index * segment angle
    // real position / dist from 0 = ((rotation % 360) + position from 0) % 360
    // rotate to zero = 360 - realPos

    const levels = get(levelObjects);
    if (!levels || !levels.length) return 0;

    const index = levels.indexOf(level);
    if (index === -1) return 0;

    const segmentAngle = 360 / levels.length;
    const offsetFromZero = index * segmentAngle;
    const realPosition = ((rotation.current % 360) + offsetFromZero) % 360;
    const distToRotate = 360 - realPosition - (segmentAngle / 2);

    return distToRotate + 1440;
}