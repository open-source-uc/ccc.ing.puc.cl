<script lang="ts">
	import { pb } from "~/lib/pb";

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
	<div class="text-center m-4 text-stone-700">Cargando...</div>
{:then ayudantias}
	<ul class="flex flex-col gap-6 mx-auto max-w-2xl p-4">
		{#each ayudantias as { course, url }}
			<li class="flex flex-col rounded bg-white py-6 px-4">
				<h2 class="font-bold text-xl text-stone-900 px-2">{course}</h2>
				<div class="flex flex-col gap-1">
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-stone-800 hover:bg-stone-50 border-stone-800 border-2 font-bold py-0.5 px-4 text-center rounded"
					>
						Ir al sitio
					</a>
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
