<script lang="ts">
	import { pb } from "~/lib/pb";
	import { compareStringDates, formatDateTime, formatDateTimeDelta, markdownToHTML } from "~/lib/utils";

	type Ayudantia = {
		course: string;
		description: string;
		closes_at: string;
		url?: string;
		created: string;
		message_url: string;
	};

	const promise = pb.collection("assistantships").getFullList<Ayudantia>();
</script>

{#await promise}
	<div class="text-center m-4 text-stone-700">Cangando...</div>
{:then ayudantias}
	<ul class="flex flex-col gap-6 mx-auto max-w-2xl p-4">
		{#each ayudantias.sort(compareStringDates((e) => e.closes_at)) as { closes_at, course, description, url, message_url }}
			{@const cerrado_en = formatDateTimeDelta(closes_at)}
			<li class="flex flex-col rounded bg-white py-6 px-4">
				<h2 class="font-bold text-xl text-stone-900 px-2">{course}</h2>
				<div class="text-stone-500 mb-2 px-2">
					{#if cerrado_en}
						Cierra
						<span class="text-stone-700">{cerrado_en} </span>
						(<time datetime={closes_at}>{formatDateTime(closes_at, { isAware: false })}</time>)
					{:else}
						Cerrado
					{/if}
				</div>
				<details class="border-2 border-stone-500 my-3 rounded">
					<summary
						class="px-4 py-2 cursor-pointer bg-stone-100 hover:bg-stone-200 transition-all text-stone-800 list-none flex items-center"
					>
						<span class="flex-grow">Ver el mensaje</span>
						<svg class="fill-stone-800 w-4 h-4 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg
						>
					</summary>
					<div class="prose prose-p:my-2 leading-tight p-2">
						{@html markdownToHTML(description)}
					</div>
				</details>
				<div class="flex flex-col gap-1">
					<a
						href={message_url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-stone-800 hover:bg-stone-50 border-stone-800 border-2 font-bold py-0.5 px-4 text-center rounded"
						>Ir al mensaje
					</a>
					{#if url}
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							class="text-stone-800 hover:bg-stone-50 border-stone-800 border-2 font-bold py-0.5 px-4 text-center rounded"
						>
							Postular
						</a>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{/await}

<style>
	details > summary > svg {
		transform: rotate(90deg);
	}
	details[open] > summary > svg {
		transform: rotate(-90deg);
	}
</style>
