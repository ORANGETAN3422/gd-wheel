<script lang="ts">
  import { Tween } from "svelte/motion";
  import { expoOut } from "svelte/easing";

  import Wheel from "./lib/Wheel/Wheel.svelte";
  import ListSection from "./lib/Search/ListSection.svelte";
  import { currentList } from "./helpers/statusStore";
  import SelectedSection from "./lib//Selected/LevelSection.svelte";

  let rotation = new Tween(0, { duration: 3000, easing: expoOut });

  function spinWheel() {
    console.log("wheel spin");
    rotation.target += 720;
  }
</script>

<div class="flex flex-row items-start">
  <button
    on:click={spinWheel}
    class="w-[600px] h-[600px] flex-none rounded-full p-0 bg-none cursor-pointer flex items-center justify-center"
  >
    <Wheel rotation={rotation.current} />
  </button>
  {#if $currentList === null}
    <ListSection />
  {:else}
    <SelectedSection />
  {/if}
</div>
