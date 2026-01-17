<script lang="ts">
    // this is probablyt not gonna be used any more bt i want to keep the component here because ia ssaj l

    import { type Level } from "../../helpers/api";

    export let offsetAngle: number = 90; // deg
    export let angle: number = 90; // deg
    export let r: number = 100; // pixels
    export let fill: string;
    export let level: Level;

    let cx: number = r;
    let cy: number = r;

    function toRadians(deg: number) {
        return (deg * Math.PI) / 180;
    }

    function isLight(color: string) {
        if (color.length === 7) {
            const rgb = [
                parseInt(color.substring(1, 3), 16),
                parseInt(color.substring(3, 5), 16),
                parseInt(color.substring(5, 7), 16),
            ];
            const luminance =
                (0.2126 * rgb[0]) / 255 +
                (0.7152 * rgb[1]) / 255 +
                (0.0722 * rgb[2]) / 255;
            return luminance > 0.5;
        }
        return false;
    }

    // Segment angles
    $: start = offsetAngle - 90;
    $: end = start + angle;
    $: midAngle = start + angle / 2;

    $: useLargeArc = angle > 180 ? 1 : 0;
    $: startX = cx + r * Math.cos(toRadians(start));
    $: startY = cy + r * Math.sin(toRadians(start));
    $: endX = cx + r * Math.cos(toRadians(end));
    $: endY = cy + r * Math.sin(toRadians(end));

    $: path =
        angle >= 360
            ? `
                M ${cx} ${cy - r}
                A ${r} ${r} 0 1 1 ${cx} ${cy + r}
                A ${r} ${r} 0 1 1 ${cx} ${cy - r}
                Z
            `
            : `
                M ${cx} ${cy}
                L ${startX} ${startY}
                A ${r} ${r} 0 ${useLargeArc} 1 ${endX} ${endY}
                Z
        `;

    $: textRadius = r * (0.5 + 0.75 * Math.pow(angle / 360, 0.5));
    $: textX = cx + textRadius * Math.cos(toRadians(midAngle));
    $: textY = cy + textRadius * Math.sin(toRadians(midAngle));

    // font size
    $: maxWidth = textRadius * Math.sin(toRadians(angle / 2)) * 0.5;
    $: fontSize = Math.min(maxWidth / (level.name.length / 13), r);
</script>

<path d={path} {fill} stroke="none" />

<text
    x={textX}
    y={textY}
    fill={isLight(fill) ? "black" : "white"}
    dominant-baseline="middle"
    text-anchor="middle"
    transform={`rotate(${midAngle}, ${textX}, ${textY})`}
    style="font-weight: bold; font-family: sans-serif; font-size: {fontSize}px;"
>
    {level.name}
</text>
