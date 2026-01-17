<script lang="ts">
  import type { Level } from "./helpers/api";
  import { currentList } from "./helpers/statusStore";
  import { calculateWheelRotation, chooseLevel } from "./helpers/spinning";
  import { rotation } from "./helpers/spinning";
  import ListSection from "./lib/Search/ListSection.svelte";
  import SelectedSection from "./lib/Selected/LevelSection.svelte";
  import Wheel from "./lib/LevelWheel/Wheel.svelte";

  function spinWheel() {
    const level: Level = chooseLevel()!;
    rotation.target += calculateWheelRotation(level);
  }
</script>

<div class="flex flex-row items-start">
  <div class="relative w-[600px] h-[600px] flex-none">
    <button
      on:click={spinWheel}
      class="w-full h-full rounded-full p-0 bg-none cursor-pointer flex items-center justify-center"
    >
      <Wheel rotation={rotation.current} />
    </button>
  </div>

  {#if $currentList === null}
    <ListSection />
  {:else}
    <SelectedSection />
  {/if}
</div>
