<script lang="ts">
  import type { Level } from "./helpers/api";
  import { currentList } from "./helpers/statusStore";
  import {
    calculateWheelRotation,
    chooseLevel,
    createTween,
  } from "./helpers/spinning";
  import ListSection from "./lib/Search/ListSection.svelte";
  import SelectedSection from "./lib/Selected/LevelSection.svelte";
  import Wheel from "./lib/LevelWheel/Wheel.svelte";
  import WheelArrow from "./lib/Svgs/WheelArrow.svelte";
  import RolledLevelPopup from "./lib/Popup/RolledLevelPopup.svelte";

  const tweenRotation = createTween();
  let level: Level;
  let rotation = 0;
  let popupVisible = false;
  let isRolling = false;

  const wheelEasing = (t: number) => {
    // cubic
    if (t < 0.3) {
      const u = t / 0.2;
      return u * u * u * 0.1;
    }

    // expo
    const u = (t - 0.3) / 0.8;
    return 0.1 + (1 - Math.exp(-10 * u)) * 0.9;
  };

  function spinWheel() {
    if (isRolling) return;
    isRolling = true;

    level = chooseLevel()!;
    const delta = calculateWheelRotation(level);

    const from = rotation;
    const to = rotation + delta;

    tweenRotation({
      from,
      to,
      duration: 1000,
      easing: (t) => wheelEasing(t),
      update: (v) => (rotation = v),
      onComplete: () => {
        popupVisible = true;
        isRolling = false;
      },
    });
  }
</script>

<div class="flex flex-row items-start">
  <div class="relative w-[600px] h-[600px] flex-none">
    <button
      on:click={spinWheel}
      class="w-full h-full rounded-full p-0 bg-none cursor-pointer flex items-center justify-center"
    >
      <Wheel {rotation} />
    </button>
    <WheelArrow />
  </div>

  {#if $currentList === null}
    <ListSection />
  {:else}
    <SelectedSection />
  {/if}

  {#if popupVisible}
    <RolledLevelPopup rolledLevel={level} bind:popupVisible />
  {/if}
</div>
