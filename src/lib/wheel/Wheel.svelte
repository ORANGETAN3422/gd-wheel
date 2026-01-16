<script lang="ts">
    import WheelSector from "./WheelSector.svelte";

    export let rotation: number;
    let count: number = 10;
    let r: number = 300;

    const colors = ["#3E6FB0", "#D17F2E", "#519E3D", "#7B47A0"];
    $: sectors = Array.from({ length: count }, (_, i) => i);
</script>

<svg viewBox={`0 0 ${r * 2} ${r * 2}`} class="w-full h-full block">
    {#each sectors as s, i}
        <WheelSector
            {r}
            angle={360 / count}
            offsetAngle={i * (360 / count) + rotation}
            fill={colors[i % colors.length]}
        />
    {/each}

    <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                flood-color="rgba(0,0,0,0.4)"
            />
        </filter>
    </defs>

    <circle cx={r} cy={r} r={r * 0.2} fill="white" filter="url(#shadow)" />
</svg>
