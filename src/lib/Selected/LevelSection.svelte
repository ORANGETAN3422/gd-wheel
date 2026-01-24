<script lang="ts">
    import { onMount } from "svelte";

    import ListLevel from "./LevelCard.svelte";
    import { currentList, levelObjects } from "../../helpers/statusStore";
    import { type List, type Level, searchList } from "../../helpers/api";

    let originalList: List;
    let originalObjects: Level[];
    let loading = false;

    function returnToSearch() {
        currentList.set(null);
        levelObjects.set(null);
    }

    async function restoreList() {
        currentList.set(originalList);
        levelObjects.set(originalObjects);
    }

    onMount(async () => {
        if ($currentList) {
            loading = true;

            const searchThing = await searchList(
                $currentList.levelIDs,
                parseInt($currentList.id),
                100,
            );

            if (searchThing) {
                levelObjects.set(searchThing);
                originalObjects = structuredClone(searchThing);
                originalList = structuredClone($currentList);
            }

            loading = false;
        }
    });
</script>

<div class="flex flex-col ml-14">
    <div
        class="mb-4 p-2 rounded flex-1 bg-slate-800/70 border border-slate-700"
    >
        <p>
            <b>{$currentList?.name}</b> by {$currentList?.author}
        </p>
        <p>{$currentList?.id}</p>
    </div>

    <div
        class="w-80 h-[500px] flex flex-col rounded-lg bg-slate-800/70 border border-slate-700 p-2 pb-0 overflow-y-auto shadow-inner"
    >
        {#if !loading}
            {#each $levelObjects as level}
                <ListLevel {level} />
            {/each}
        {:else}
            <div
                class="flex flex-col justify-between
               px-3 py-2
               w-[100%]
               rounded-md
               bg-slate-700/60
               text-slate-100
               border border-slate-600
               text-center"
            >
                <p>Loading...</p>
            </div>
        {/if}
    </div>

    <div class="mb-4 flex gap-x-2 text-sm">
        <button
            onclick={returnToSearch}
            class="mt-4 p-2 flex-1 rounded bg-slate-800/70 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-colors"
        >
            Return to search
        </button>
        <button
            onclick={restoreList}
            class="mt-4 p-2 flex-1 rounded bg-slate-800/70 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-colors"
        >
            Restore Original List
        </button>
    </div>
</div>
