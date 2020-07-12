<script>
  export let color;
</script>

<style>
  div {
    background-color: var(--color);
    color: var(--color);
    height: 30px;
    width: 30px;
    cursor: pointer;
    position: relative;
    outline: currentcolor none medium;
    float: left;
    border-radius: 4px;
    margin: 0px 6px 6px 0px;
  }
</style>

<div on:click style="--color:{color}" />
