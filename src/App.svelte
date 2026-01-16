<script lang="ts">
  import { Tween } from "svelte/motion";
  import { expoOut } from "svelte/easing";
  import Wheel from "./lib/wheel/Wheel.svelte";

  let rotation = new Tween(0, {
    duration: 3000,
    easing: expoOut,
  });

  function spinWheel() {
    console.log("Wheel clicked!");
    rotation.target += 720;
  }
</script>

<button
  onclick={spinWheel}
  class="rounded-full p-0 bg-none cursor-pointer w-[600px] h-[600px] flex items-center justify-center"
>
  <Wheel rotation={rotation.current} />
</button>
