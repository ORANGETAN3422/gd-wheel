<script lang="ts">
    import { onMount } from "svelte";
    import { levelObjects } from "../../helpers/statusStore";
    import { isLight, toRadians } from "../../helpers/help";

    export let rotation = 0; // deg
    let r = 300; // deg

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    let offCanvas: HTMLCanvasElement;
    let offCtx: CanvasRenderingContext2D;
    let cached = false;
    let lastLevelCount = 0;

    const colors = ["#3E6FB0", "#D17F2E", "#519E3D", "#7B47A0"];

    onMount(() => {
        ctx = canvas.getContext("2d")!;
        offCanvas = document.createElement("canvas");
        offCanvas.width = canvas.width;
        offCanvas.height = canvas.height;
        offCtx = offCanvas.getContext("2d")!;
    });

    $: if (ctx && $levelObjects?.length) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const levels = $levelObjects;
        const segmentAngle = (2 * Math.PI) / levels.length;

        // Reset cache if number of levels changed
        if (!cached || levels.length !== lastLevelCount) {
            cached = false;
        }
        lastLevelCount = levels.length;

        if (!cached) {
            offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);

            levels.forEach((segment, index) => {
                const startAngle = index * segmentAngle;
                const endAngle = startAngle + segmentAngle;

                // sector drawing
                offCtx.beginPath();
                offCtx.moveTo(centerX, centerY);
                offCtx.arc(centerX, centerY, r, startAngle, endAngle);
                offCtx.closePath();
                offCtx.fillStyle = colors[index % colors.length];
                offCtx.fill();
                offCtx.strokeStyle = colors[index % colors.length];
                offCtx.stroke();

                // text drawing
                offCtx.save();
                offCtx.translate(centerX, centerY);
                const angle = startAngle + segmentAngle / 2;
                offCtx.rotate(angle);
                offCtx.textAlign = "right";
                offCtx.fillStyle = isLight(colors[index % colors.length])
                    ? "#000"
                    : "#fff";
                offCtx.font = "16px system-ui";
                offCtx.fillText(segment.name, r - 10, 5);
                offCtx.restore();
            });

            // middle circle
            offCtx.save();
            offCtx.shadowColor = "rgba(0,0,0,0.3)";
            offCtx.shadowBlur = 20;
            offCtx.shadowOffsetX = 0;
            offCtx.shadowOffsetY = 0;

            offCtx.beginPath();
            offCtx.arc(centerX, centerY, r * 0.2, 0, 2 * Math.PI);
            offCtx.fillStyle = "#fff";
            offCtx.fill();
            offCtx.strokeStyle = "rgba(0,0,0,0.2)";
            offCtx.stroke();
            offCtx.restore();

            cached = true;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(toRadians(rotation));
        ctx.drawImage(offCanvas, -centerX, -centerY);
        ctx.restore();
    }
</script>

<canvas bind:this={canvas} width={2 * r} height={2 * r}></canvas>
