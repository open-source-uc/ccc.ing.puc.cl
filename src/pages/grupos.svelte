<script lang="ts">
	import { pb } from "~/lib/pb";

	type Group = {
		invitation_url: string;
		image: string;
		description: string;
		name: string;
	};

	const groups_promise = pb.collection("groups").getFullList();
</script>

{#await groups_promise}
	<div class="text-center h-screen">Cargando...</div>
{:then groups}
	<ul class="group-grid grip-tem mx-auto flex max-w-4xl flex-col p-4 sm:grid">
		{#each groups as group}
			{@const { invitation_url, image, description, name } = group}
			<li
				class="relative flex flex-row items-center gap-4 rounded-md bg-white p-4 shadow transition-shadow hover:shadow-lg active:shadow-sm sm:flex-col sm:text-center"
			>
				<div
					class="aspect-square max-h-24 flex-shrink-0 overflow-clip rounded-lg border-2 border-stone-700 sm:max-h-48"
				>
					<img src={pb.getFileUrl(group, image, { thumb: "192x192" })} alt={name} />
				</div>
				<div class="flex flex-grow flex-col">
					<div class="mb-2 font-bold text-stone-900">{name}</div>
					<div class="flex-grow leading-tight text-stone-700">{description}</div>
					<a href={invitation_url} class="mt-2 text-blue-500 hover:underline">
						<span aria-hidden="true" class="absolute inset-0" />
						Telegram
					</a>
				</div>
			</li>
		{/each}
	</ul>
{/await}

<style>
	ul {
		gap: 15px;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-auto-rows: 1fr;
	}
</style>
