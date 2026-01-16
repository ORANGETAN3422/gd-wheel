<script lang="ts">
    export let offsetAngle: number = 90; // deg
    export let angle: number = 90; // deg
    export let r: number = 100; // pixels
    export let fill: string;
    let cx: number = r;
    let cy: number = r;

    function toRadians(deg: number) {
        return deg * (Math.PI / 180);
    }

    $: start = offsetAngle - 90;
    $: end = start + angle;
    $: x = cx + r * Math.cos(toRadians(end));
    $: y = cy + r * Math.sin(toRadians(end));

    $: useLargeArc = angle > 180 ? 1 : 0;
    $: startX = cx + r * Math.cos(toRadians(start));
    $: startY = cy + r * Math.sin(toRadians(start));

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
                A ${r} ${r} 0 ${useLargeArc} 1 ${x} ${y}
                Z
        `;
</script>

<path d={path} {fill} stroke="none" />
