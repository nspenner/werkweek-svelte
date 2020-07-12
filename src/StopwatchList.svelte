<script>
  import Stopwatch from "./Stopwatch.svelte";
  import AddButton from "./AddButton.svelte";
  export let idCounter = 0;
  export let stopwatches = [{ id: idCounter++ }];

  export const addWatch = () => {
    stopwatches = [...stopwatches, { id: ++idCounter }];
  };

  export const deleteWatch = event => {
    stopwatches = stopwatches.filter(
      stopwatch => stopwatch.id != event.detail.id
    );
  };
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1rem;
    margin: 0 auto;
  }
</style>

<ul>
  {#each stopwatches as { id } (id)}
    <li>
      <Stopwatch on:delete={deleteWatch} {id} />
    </li>
  {/each}
  <li>
    <AddButton on:click={addWatch} />
  </li>
</ul>
