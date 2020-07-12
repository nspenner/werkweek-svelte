<script>
  import Stopwatch from "./Stopwatch.svelte";
  import StopwatchList from "./StopwatchList.svelte";
  import ColorPicker from "./ColorPicker.svelte";
  export let name;
</script>

<style>
  main {
	padding: 1em;
	max-width: 1000px;
	margin: 0 auto;
  }

  header {
	  display: flex;
  }

  h1 {
	font-family: "Poppins", sans-serif;
    color: #2b2b2b;
    margin: 0 auto;
  }
</style>

<main>
  <header>
    <h1>WerkWeek</h1>
  </header>
  <StopwatchList />
</main>
