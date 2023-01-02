<script lang="ts">
	import { onMount } from "svelte";
	import { classNames, formatDateTime } from "~/lib/utils";
	import ArrowLink from "~/components/ArrowLink.svelte";
	import { getNextEventsCalendar } from "~/lib/calendar";

	export let initialCalendarData: GoogleCalendarResponse;

	let calendarData: GoogleCalendarResponse = initialCalendarData;
	let loading = true;

	onMount(async () => {
		calendarData = await getNextEventsCalendar();
		loading = false;
	});
</script>

<div class="py-8 text-center">
	<h2 class="font-title text-xl">{calendarData.summary}</h2>
	{#if calendarData.description}
		<div>
			{@html calendarData.description}
		</div>
	{/if}
</div>
<div class="flex flex-col items-center justify-center gap-4 md:flex-row md:items-stretch" class:animate-pulse={loading}>
	{#each calendarData.items.slice(0, 3) as { summary, description, start, htmlLink: href }}
		{@const date = new Date(start?.dateTime || start?.date)}
		<div class="card w-full md:w-auto relative">
			<div class="mb-2">
				<div
					class={classNames("font-title text-xl leading-tight", loading ? "text-transparent bg-gray-300 rounded" : "")}
				>
					{summary}
				</div>
				{#if start}
					<time
						datetime={date.toISOString()}
						class={classNames("leading-tight", loading ? "text-transparent bg-gray-200 rounded" : "text-gray-500")}
					>
						{formatDateTime(start?.dateTime || start?.date)}
					</time>
				{/if}
			</div>
			{#if description}
				<div class="text-ellipsis leading-tight line-clamp-3">
					{@html description}
				</div>
			{/if}
			<ArrowLink href={loading ? "#" : href} disabled={loading} class="justify-end pt-4" action="ver evento" cover />
		</div>
	{:else}
		<div>Ahora no hay eventos programados!</div>
	{/each}
</div>

<style>
	.card {
		@apply flex max-w-md flex-1 flex-col justify-between rounded border-4 border-black stroke-black py-4 px-3 text-black shadow;
	}
</style>
