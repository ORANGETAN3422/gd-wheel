<script lang="ts">
    import ListCard from "./ListCard.svelte";
    import { currentSearch } from "../../helpers/statusStore";
    import { fetchLists } from "../../helpers/api";
    import LeftArrow from "../Svgs/LeftArrow.svelte";
    import RightArrow from "../Svgs/RightArrow.svelte";

    let listsLoading: boolean = false;
    let hasLoadedPage = false;
    let listId: number;
    let currentPage: number = 1;

    async function getLists() {
        checkPageNumber();
        if (listId != null) {
            listsLoading = true;
            let lists: any = await fetchLists(listId, currentPage - 1);
            if (lists) {
                if (lists === -1) {
                    currentSearch.set(null);
                    listsLoading = false;
                    return;
                }
                currentSearch.set(lists);
                listsLoading = false;
                hasLoadedPage = true;
                return;
            }
        } else {
            console.log("no thing in the there");
            return;
        }
    }

    function checkPageNumber() {
        if (currentPage < 1) currentPage = 1;
    }
</script>

<div class="flex flex-col ml-14">
    <div class="mb-4">
        <label for="listId" class="block mb-1 font-semibold">
            Search for List name or ID
        </label>

        <div class="flex">
            <input
                id="listId"
                type="text"
                placeholder="List ID or Name"
                maxlength="25"
                bind:value={listId}
                class="p-2 rounded flex-1 bg-slate-800/70 border border-slate-700"
            />
            <button
                onclick={getLists}
                class="ml-2 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-400 transition-colors"
            >
                Search
            </button>
        </div>
    </div>

    <div
        class="w-80 h-[500px] flex flex-col rounded-lg bg-slate-800/70 border border-slate-700 p-2 pb-0 overflow-y-auto shadow-inner"
    >
        {#if listsLoading}
            <p class="text-sm text-slate-400 text-center mt-4">
                loading lists…
            </p>
        {:else if !listsLoading && hasLoadedPage && $currentSearch === null}
            <p class="text-sm text-slate-400 text-center mt-4">
                No levels on page {currentPage}
            </p>
        {:else}
            {#each $currentSearch as list}
                <ListCard {list} />
            {/each}
        {/if}
    </div>

    <div class="mt-4 flex items-center justify-between w-80">
        <!-- prev -->
        <button
            onclick={() => {
                currentPage--;
                getLists();
            }}
            aria-label="Previous page"
            disabled={currentPage <= 1}
            class="px-3 py-1 rounded-md
               h-8
               bg-slate-700 text-slate-200
               hover:bg-slate-600 transition-all
               border border-slate-600
               disabled:opacity-40
               flex items-center justify-center"
        >
            <LeftArrow />
        </button>

        <!-- page input -->
        <div
            class="h-8 ml-2 mr-2 rounded
               flex items-center
               flex-1
               bg-slate-800/70
               border border-slate-700
               text-sm font-medium text-slate-300"
        >
            <span class="pl-2 pr-1 text-slate-400 select-none"> Page </span>

            <input
                type="number"
                class="ml-[-20px] w-full h-full bg-transparent outline-none
                   text-slate-300 text-center px-1"
                bind:value={currentPage}
            />
        </div>

        <!-- next -->
        <button
            onclick={() => {
                currentPage++;
                getLists();
            }}
            aria-label="Next page"
            disabled={$currentSearch === null && currentPage > 1}
            class="px-3 py-1 rounded-md
               h-8
               bg-slate-700 text-slate-200
               hover:bg-slate-600 transition-all
               border border-slate-600
               disabled:opacity-40
               flex items-center justify-center"
        >
            <RightArrow />
        </button>
    </div>
</div>
