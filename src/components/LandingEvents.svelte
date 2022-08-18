<script lang="ts">
	import { onMount } from "svelte";
	import { formatDateTime } from "~/lib/utils";
	import ArrowLink from "~/components/ArrowLink.svelte";
	import { getNextEventsCalendar } from "~/lib/calendar";

	export let calendarData: GoogleCalendarResponse;

	onMount(async () => {
		calendarData = await getNextEventsCalendar();
	});
</script>

<div class="py-8 text-center ">
	<h2 class="font-title text-xl">{calendarData.summary}</h2>
	{#if calendarData.description}
		<div>
			{@html calendarData.description}
		</div>
	{/if}
</div>
<div class="flex flex-col items-center justify-center gap-4 md:flex-row md:items-stretch">
	{#each calendarData.items.slice(0, 3) as { summary, description, start, htmlLink: href, location }}
		{@const date = new Date(start?.dateTime || start?.date)}
		<div class="card w-full md:w-auto">
			<div class="mb-2">
				<div class="font-title text-xl leading-tight">
					{summary}
				</div>
				{#if start}
					<time datetime={date.toISOString()} class="leading-tight text-gray-500">
						{formatDateTime(date)}
					</time>
				{/if}
			</div>
			{#if description}
				<div class="text-ellipsis leading-tight line-clamp-3">
					{@html description}
				</div>
			{/if}
			<ArrowLink {href} class="justify-end pt-4" action="ver evento" />
		</div>
	{/each}
</div>

<style>
	.card {
		@apply flex max-w-md flex-1 flex-col justify-between rounded border-4 border-black stroke-black py-4 px-3 text-black shadow;
	}
</style>
