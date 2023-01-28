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

<a class={classNames("flex items-center gap-1 text-right leading-none", klass)} {href}>
  <span class="hover:underline">{action}</span> 
  <span class="arrow flex-shrink-0">&rarr;</span>
</a>

<style lang="scss">
  .arrow {
    transition: transform 0.2s ease-in-out;
    text-decoration: none;
  }

  a:hover .arrow {
    transform: translateX(calc(-1 * theme("spacing.1")));
  }

  a:active .arrow {
    transform: translateX(theme("spacing.1"));
  }
</style>
