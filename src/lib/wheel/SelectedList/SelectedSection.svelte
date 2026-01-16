<script lang="ts">
    import ListLevel from "./SelectedLevelCard.svelte";
    import {
        currentList,
        startedFetchingLevels,
    } from "../../../helpers/statusStore";

    function returnToSearch() {
        currentList.set(null);
        startedFetchingLevels.set(false);
    }
</script>

<div class="flex flex-col ml-14">
    <div
        class="mb-4 p-2 rounded flex-1 bg-slate-800/70 border border-slate-700"
    >
        <p class="">
            <b>{$currentList?.name}</b> by {$currentList?.author}
        </p>
        <p>{$currentList?.id}</p>
    </div>

    <div
        class="w-80 h-[500px] flex flex-col rounded-lg bg-slate-800/70 border border-slate-700 p-2 pb-0 overflow-y-auto shadow-inner"
    >
        {#each $currentList?.levelIDs as level}
            <ListLevel levelStr={level} />
        {/each}
    </div>

    <div class="mb-4 flex">
        <button
            on:click={returnToSearch}
            class="mt-4 p-2 flex-1 rounded bg-slate-800/70 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-colors"
        >
            Return to search
        </button>
    </div>
</div>
