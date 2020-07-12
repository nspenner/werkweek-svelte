<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import Swatch from "./Swatch.svelte";
  export let defaultColors = ["#ff0000", "#0000ff", "#008000"];
  export let selectedColor = "";

  let setColor = color => {
    selectedColor = color;
  };

  const handleKeyDown = e => {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      dispatch("close");
    }
  };
</script>

<style>
  .container {
    display: flex;
    position: absolute;
    z-index: 2;
    right: -9px;
    top: 13px;
    width: 276px;
    background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    border: 0px solid rgba(0, 0, 0, 0.25);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 4px;
    border-radius: 4px;
    padding: 1rem 1rem calc(1rem - 6px) 1rem;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  input {
    width: 90px;
    height: 30px;
  }
</style>

<div class="container">
  <div class="row">
    {#each defaultColors as color}
      <Swatch
        {color}
        on:click={() => {
          setColor(color);
        }} />
    {/each}
    <div>
      <input
        type="text"
        name=""
        id=""
        bind:value={selectedColor}
        on:keydown={handleKeyDown} />
    </div>
  </div>

</div>
