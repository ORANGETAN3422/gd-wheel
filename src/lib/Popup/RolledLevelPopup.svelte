<script lang="ts">
    import type { Level } from "../../helpers/api";
    import { fly } from "svelte/transition";
    import { levelObjects } from "../../helpers/statusStore";

    export let rolledLevel: Level;
    export let popupVisible: boolean;

    function removeLevel() {
        levelObjects.update((current) =>
            current!.filter((l) => l.id !== rolledLevel.id),
        );
        popupVisible = false;
    }
</script>

<div class="fixed inset-0 bg-black/20 z-40"></div>

<div
    transition:fly={{ y: 40, duration: 100 }}
    class="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 min-w-[300px]"
>
    <p>you rolled...</p>
    <h2 class="text-3xl font-semibold mb-2">{rolledLevel.name}!</h2>
    <div class="flex justify-between gap-2 mt-4">
        <button
            class="rounded-md bg-slate-700/60 text-slate-100 border border-slate-600 hover:bg-slate-700 transition-colors px-4 py-2"
            onclick={() => (popupVisible = false)}
        >
            Close
        </button>

        <button
            class="rounded-md bg-slate-700/60 text-slate-100 border border-slate-600 hover:bg-slate-700 transition-colors px-4 py-2"
            onclick={removeLevel}
        >
            Remove
        </button>
    </div>
</div>
