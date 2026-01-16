<script lang="ts">
    import type { List } from "../../../helpers/api";

    export let list: List;
</script>

<div
    class="w-full px-3 py-2 mb-2
           rounded-md
           bg-slate-700/60
           text-slate-100
           border border-slate-600
           transition-colors hover:bg-slate-600
           "
>
    <div class="flex items-center justify-between">
        <p class="text-base font-medium leading-tight truncate">
            {list.name}
        </p>

        <p class="text-sm text-slate-300 whitespace-nowrap">
            {list.levelIDs.length} levels
        </p>
    </div>

    <p class="text-xs text-slate-400 mt-0.5 text-left">
        by {list.author}
    </p>
</div>
