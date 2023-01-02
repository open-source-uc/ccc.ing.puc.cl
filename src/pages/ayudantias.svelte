<script lang="ts">
	import { pb } from "~/lib/pb";
	import { compareStringDates, formatDateTime, formatDateTimeDelta, markdownToHTML } from "~/lib/utils";

	type Ayudantia = {
		course: string;
		description: string;
		closes_at: string;
		url?: string;
		created: string;
	};

	const promise = pb.collection("ayudantias").getFullList<Ayudantia>();
</script>

{#await promise}
	<div class="text-center m-4 text-stone-700">Cangando...</div>
{:then ayudantias}
	<ul class="flex flex-col gap-6 mx-auto max-w-2xl p-4">
		{#each ayudantias.sort(compareStringDates((e) => e.closes_at)) as { closes_at, course, description, url, created }}
			{@const cerrado_en = formatDateTimeDelta(closes_at)}
			<li class="flex flex-col rounded bg-white py-6 px-4">
				<h2 class="font-bold text-xl text-stone-900">{course}</h2>
				<div class="text-stone-500 mb-2">
					{#if cerrado_en}
						Cierra
						<span class="text-stone-700">{cerrado_en} </span>
						(<time datetime={closes_at}>{formatDateTime(closes_at, { isAware: false })}</time>)
					{:else}
						Cerrado
					{/if}
				</div>
				<div class="prose prose-p:my-2 leading-tight">
					{@html markdownToHTML(description)}
				</div>
				{#if url}
					<a href={url} class="text-stone-800 mt-4 border-stone-800 border-2 font-bold py-0.5 px-4 text-center rounded">
						Postular
					</a>
				{/if}
			</li>
		{/each}
	</ul>
{/await}
