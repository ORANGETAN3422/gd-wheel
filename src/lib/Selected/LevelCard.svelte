<script lang="ts">
    import { type Level } from "../../helpers/api";
    import { levelObjects } from "../../helpers/statusStore";

    export let level: Level;

    function removeLevel() {
        levelObjects.update((current) =>
            current!.filter((l) => l.id !== level.id),
        );
    }
</script>

<div class="flex gap-2 w-full mb-2 h-[70px]">
    <!-- main card -->
    <div
        class="flex flex-col justify-between
               px-3 py-2
               w-[85%]
               rounded-md
               bg-slate-700/60
               text-slate-100
               border border-slate-600
               text-left"
    >
        {#if level}
            <p class="text-lg font-semibold truncate">{level.name}</p>

            <div class="flex justify-between">
                <p class="text-xs text-slate-400 truncate">
                    by {level.author}
                </p>
                <p class="text-sm text-slate-400 whitespace-nowrap">
                    {level.id}
                </p>
            </div>
        {:else}
            <p class="text-sm text-slate-400">Loading level…</p>
        {/if}
    </div>

    <!-- side button -->
    <button
        class="flex-1 w-[15%] rounded-md bg-red-700/60 text-slate-100 border border-red-600 hover:bg-red-600 flex items-center justify-center"
        onclick={removeLevel}
    >
        X
    </button>
</div>
