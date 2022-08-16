<script lang="ts">
  import { action } from "nanostores";

  import { classNames } from "~/lib/utils";

  interface $$Props {
    class?: string;
    href?: string;
    action: string;
  }
  const { href, class: klass, action } = $$props as $$Props;
</script>

<a class={classNames("flex items-center gap-1 px-1 text-right leading-none hover:underline", klass)} {href}>
  {action}
  <svg class="flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 7H12M12 7L7 2M12 7L7 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</a>

<style lang="scss">
  svg {
    transition: transform 0.2s ease-in-out;
  }

  a:hover svg {
    transform: translateX(calc(-1 * theme("spacing.1")));
  }

  a:active svg {
    transform: translateX(theme("spacing.1"));
  }
</style>
