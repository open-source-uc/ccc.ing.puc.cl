<script lang="ts">
	import { pb, type Record } from "~/lib/pb";

	interface Lab extends Record {
		image: string;
		description: string;
		name: string;
	}

	const labs_promise = pb.collection("labs").getFullList<Lab>();
</script>


{#await labs_promise}
	<div class="text-center h-screen">Cargando...</div>
{:then labs}
	<ul class="max-w-6xl px-4 py-4 gap-4 mx-auto">
		{#each labs as lab}
			{@const { image, description, name } = lab}
			<li class="max-w-xl mx-auto w-full">
				<article class="bg-stone-100 p-3 xs:p-4 rounded-xl h-full">
					{#if image}
						<div class="bg-white p-2 h-48 rounded-lg border-2 border-stone-700 mb-2">
							<img src={pb.getFileUrl(lab, image, { thumb: "192x192" })} alt={name} class="object-contain mx-auto h-full"  />
						</div>
					{/if}
					<h1 class="font-title text-xl sm:text-2xl mb-2">{name}</h1>
					<p>{description}</p>
				</article>
			</li>
		{/each}
	</ul>
{/await}

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
	}
</style>