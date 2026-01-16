<script lang="ts">
    import ListCard from "./ListCard.svelte";
    import { currentList } from "../../../helpers/statusStore";
    import { fetchList } from "../../../helpers/api";

    let listsLoading: boolean = false;
    let listId: number;
    let currentPage: number = 0;

    async function getLists() {
        if (listId != null) {
            listsLoading = true;
            let lists = await fetchList(listId, currentPage);
            if (lists) {
                currentList.set(lists);
                listsLoading = false;
            }
        } else {
            console.log("no thing in the there");
        }
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
        {:else}
            {#each $currentList as list}
                <ListCard {list} />
            {/each}
        {/if}
    </div>

    <div class="mt-4 flex items-center justify-between w-80">
        <button
            onclick={() => {
                currentPage--;
            }}
            aria-label="Previous page"
            class="px-3 py-1 rounded-md
            h-8
           bg-slate-700 text-slate-200
           hover:bg-slate-600 transition-all
           border border-slate-600
           disabled:opacity-40
           flex items-center justify-center"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                class="w-4 h-4 fill-current"
            >
                <path
                    d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"
                />
            </svg>
        </button>

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

        <button
            onclick={() => {
                currentPage++;
            }}
            aria-label="Next page"
            class="px-3 py-1 rounded-md
            h-8
           bg-slate-700 text-slate-200
           hover:bg-slate-600 transition-all
           border border-slate-600
           disabled:opacity-40
           flex items-center justify-center"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                class="w-4 h-4 fill-current"
            >
                <path
                    d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"
                />
            </svg>
        </button>
    </div>
</div>
