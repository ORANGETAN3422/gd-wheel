<script lang="ts">
    import { onMount } from "svelte";
    import { fetchLevel, type Level } from "../../../helpers/api";

    export let levelStr: string;
    let level: Level;

    onMount(async () => {
        const id = parseInt(levelStr);
        if (!isNaN(id)) {
            level = await fetchLevel(id);
        }
    });
</script>

<button
    class="w-full px-3 py-2 mb-2
           rounded-md
           bg-slate-700/60
           text-slate-100
           border border-slate-600
           transition-colors hover:bg-slate-600
           "
>
    {#if level}
        <div class="flex items-center justify-between">
            <p class="text-lg font-semibold">{level.name}</p>
            <p class="text-sm text-slate-400">Level ID: {level.id}</p>
        </div>

        <p class="text-xs text-slate-400 mt-0.5 text-left">
            by {level.author}
        </p>
    {:else if !level}
        <p class="text-sm text-slate-400">Loading level…</p>
    {/if}
</button>
