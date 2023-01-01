<script lang="ts">
	import { classNames } from "~/lib/utils";

	interface $$Props {
		action: string;
		class?: string;
		href?: string;
		disabled?: boolean;
		cover?: boolean;
	}

	const { class: klass, action } = $$props as $$Props;
	export let href: string = "#";
	export let disabled: boolean = false;
	export let cover: boolean = false;
</script>

<a
	class={classNames("flex items-center gap-1 px-1 text-right leading-none hover:underline", klass)}
	{href}
	aria-disabled={disabled}
>
	{#if cover}
		<span class="absolute inset-0" aria-hidden="true" />
	{/if}
	{action}
	<svg class="flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2.5 7H12M12 7L7 2M12 7L7 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</a>

<style lang="scss">
	svg {
		transition: transform 0.2s ease-in-out;
	}

	a[aria-disabled="true"] {
		pointer-events: none;
		opacity: 0.5;
	}

	a[aria-disabled="false"] {
		&:hover svg {
			transform: translateX(calc(-1 * theme("spacing.1")));
		}
		&:active svg {
			transform: translateX(theme("spacing.1"));
		}
	}
</style>
