<script lang="ts">
  interface $$Props {
    class?: string;
    label: string;
    isOpen?: boolean;
  }

  export let label: string;
  export let isOpen = false;
</script>

<button aria-label={label} type="button" on:click class={$$props.class} class:open={isOpen}>
  <div class="up" />
  <div class="center" />
  <div class="down" />
</button>

<style lang="scss">
  button {
    width: 32px;
    height: 32px;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  button > div {
    width: 100%;
    height: 4px;
    background: black;
    border-radius: 4px;
    transition: transform 0.15s ease-in-out;
  }
  .open {
    .up {
      transform-origin: center;
      transform: translateY(14px) rotate(-45deg);
    }
    .center {
      opacity: 0;
    }
    .down {
      transform: translateY(-14px) rotate(45deg);
    }
  }
</style>
