<script lang="ts">
	import { atom } from "nanostores";
	import { onMount } from "svelte";
	import { formatDateTime } from "~/lib/utils";
	import ArrowLink from "~/components/ArrowLink.svelte";

	export let googleCalendarId: string;
	export let googleAPIKey: string;

	const calendarData = atom<GoogleCalendarResponse | null>(null);

	onMount(async () => {
		const now = new Date().toISOString();
		const url = `https://www.googleapis.com/calendar/v3/calendars/${googleCalendarId}/events?timeMin=${now}&key=${googleAPIKey}`;
		const response = await fetch(url);
		const data = (await response.json()) as GoogleCalendarResponse;
		data.items.sort((a, b) => {
			const aDate = new Date(a.start.dateTime || a.start.date);
			const bDate = new Date(b.start.dateTime || b.start.date);
			return aDate.getTime() - bDate.getTime();
		});
		calendarData.set(data);
	});
</script>

<div>
	{#if $calendarData}
		<div class="py-8 text-center ">
			<h2 class="font-title text-xl">{$calendarData.summary}</h2>
			{#if $calendarData.description}
				<div>
					{@html $calendarData.description}
				</div>
			{/if}
		</div>
		<div class="flex flex-col items-center justify-center gap-4 md:flex-row md:items-stretch">
			{#each $calendarData.items.slice(0, 3) as { summary, description, start, htmlLink: href, location }}
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
	{:else}
		<div class="flex h-36 items-center justify-center">Cargando...</div>
	{/if}
</div>

<style>
	.card {
		@apply flex max-w-md flex-1 flex-col justify-between rounded border-4 border-black stroke-black py-4 px-3 text-black shadow;
	}
</style>
