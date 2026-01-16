<script lang="ts">
    import { currentList } from "../../../helpers/statusStore";
</script>

<div class="flex flex-col ml-14">
    <div
        class="w-80 h-[500px] flex flex-col rounded-lg bg-slate-800/70 border border-slate-700 p-2 pb-0 overflow-y-auto shadow-inner"
    >
        {#each $currentList?.levelIDs as level}
            <ListLevel />
        {/each}
    </div>
</div>
