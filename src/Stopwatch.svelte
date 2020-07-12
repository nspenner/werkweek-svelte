<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import ColorPicker from "./ColorPicker.svelte";

  export let id;

  let timerOn = false;
  let timerStart = 0;
  let timerTime = 0;
  let timer;
  let showColorPicker = false;
  let backgroundColor = "#EA4440";
  let colors = [
    "#EA4440",
    "#33055d",
    "#40b8bb",
    "#0F9563",
    "#f77474",
    "#3041AF"
  ];
  let name = "Stopwatch";

  const startTimer = () => {
    timerOn = true;
    timerStart = Date.now() - timerTime;

    timer = setInterval(() => {
      timerTime = Date.now() - timerStart;
    }, 10);
  };

  const stopTimer = () => {
    timerOn = false;
    clearInterval(timer);
  };

  const resetTimer = () => {
    timerStart = 0;
    timerTime = 0;
  };

  const deleteWatch = id => {
    dispatch("delete", {
      id
    });
  };

  const handleKeyDown = e => {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      e.target.blur();
    }
  };

  $: centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
  $: seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
  $: minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  $: hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
</script>

<style>
  .row {
    display: flex;
  }

  .stopwatch-container {
    --background-color: #ea4440;
    background: var(--background-color);
    color: white;
    border-radius: 6px;
    padding: 1rem;
  }

  .time-container {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .button-group {
    display: flex;
  }

  .button-group > button {
    font-family: "Poppins";
    background: white;
    border: none;
    border-radius: 8px;
    padding: 4px 8px;
    font-size: 14px;
    cursor: pointer;
    margin-right: 16px;
  }

  .button-group > button:focus,
  .button-group > button:hover {
    background: #e6e6e6;
  }

  .color-picker-button-container {
    margin-left: auto;
    background-color: white;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.5);
    position: relative;
    align-self: center;
  }

  .color-picker-button-container > button {
    width: 16px;
    height: 16px;
    border-radius: 16px;
    margin: 0;
    border: none;
    cursor: pointer;
    background-color: var(--background-color);
  }

  .color-picker-button-container > button:focus,
  .color-picker-button-container > button:hover {
    opacity: 0.75;
  }

  .cover {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }

  .textarea-container {
    flex: 1;
    padding-right: 1rem;
  }

  textarea {
    resize: none;
    border: none;
    background-color: transparent;
    color: white;
    font-family: "Poppins", sans-serif;
    width: 100%;
    text-align: start;
    padding: 8px;
    margin: 0;
  }

  textarea:focus {
    background: white;
    color: hsl(1, 20%, 20%);
  }

  textarea:hover:not(:focus) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .close-button {
    background: none;
    border: none;
    margin-left: auto;
    padding: 0;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .close-button:hover,
  .close-button:focus {
    background: rgba(0, 0, 0, 0.1);
  }
</style>

<div class="stopwatch-container" style="--background-color: {backgroundColor}">
  <div class="row">
    <div class="time-container">
      {hours} : {minutes} : {seconds} : {centiseconds}
    </div>
    <button
      class="close-button"
      on:click={() => {
        deleteWatch(id);
      }}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-x"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5
          0 0 1 .708 0z" />
        <path
          fill-rule="evenodd"
          d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0
          0 0-.708 0z" />
      </svg>
    </button>
  </div>

  <div class="button-group">
    {#if !timerOn && timerTime === 0}
      <button on:click={startTimer}>Start</button>
    {:else if !timerOn && timerTime > 0}
      <button on:click={startTimer}>Resume</button>
      <button on:click={resetTimer}>Reset</button>
    {:else}
      <button on:click={stopTimer}>Stop</button>
    {/if}
  </div>
  <div class="row">
    <div class="textarea-container">
      <textarea rows="1" value="Stopwatch" on:keydown={handleKeyDown} />
    </div>
    <div class="color-picker-button-container">
      <button
        on:click={() => {
          showColorPicker = true;
        }} />
      {#if showColorPicker}
        <ColorPicker
          bind:selectedColor={backgroundColor}
          defaultColors={colors}
          on:close={() => (showColorPicker = false)} />
        <div class="cover" on:click={() => (showColorPicker = false)} />
      {/if}
    </div>
  </div>
</div>
