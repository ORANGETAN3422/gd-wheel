<script lang="ts">
    import { onMount } from "svelte";
    import { levelObjects } from "../../helpers/statusStore";

    export let rotation = 0; // de
    let r = 300; // deg

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    const colors = ["#3E6FB0", "#D17F2E", "#519E3D", "#7B47A0"];

    onMount(() => {
        ctx = canvas.getContext("2d");
    });

    $: if (ctx && $levelObjects?.length) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const levels = $levelObjects;
        const segmentAngle = (2 * Math.PI) / levels.length;
        const rotationRad = (rotation * Math.PI) / 180;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        levels.forEach((segment, index) => {
            const startAngle = index * segmentAngle + rotationRad;
            const endAngle = startAngle + segmentAngle;

            // sector drawing
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, r, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.stroke();

            // name drawing
            ctx.save();
            ctx.translate(centerX, centerY);
            const angle = startAngle + segmentAngle / 2;
            ctx.rotate(angle);
            ctx.textAlign = "right";
            ctx.fillStyle = "#000";
            ctx.font = "16px system-ui";
            ctx.fillText(segment.name, r - 10, 5);
            ctx.restore();
        });

        // the circle thin gin the middle hting
        ctx.beginPath();
        ctx.arc(centerX, centerY, r * 0.2, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.stroke();
    }
</script>

<canvas bind:this={canvas} width={2 * r} height={2 * r}></canvas>
