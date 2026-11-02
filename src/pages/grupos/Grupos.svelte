<script lang="ts">
	import { pb, type Record } from "~/lib/pb";
	import {
		getInviteUrl,
		getInviteAvailability
	} from "~/lib/invites";

	interface Group extends Record {
		image: string;
		description: string;
		name: string;
		sortValue: number;
	}

	async function getGroups() {
		const [groups, availability] = await Promise.all([
		pb.collection("groups").getFullList<Group>(),
		getInviteAvailability("groups")
		]);

		groups.sort((a, b) => a.sortValue - b.sortValue);

		return { groups, availability };
	}

	let groups_promise = getGroups();
</script>

{#await groups_promise}
	<div class="text-center h-screen">Cargando...</div>
{:then data}
	<ul class="group-grid grip-tem mx-auto flex max-w-5xl flex-col p-4 sm:grid">
		{#each data.groups as group}
			<li
				class="relative flex flex-row items-center gap-4 rounded-md bg-white p-4 shadow transition-shadow hover:shadow-lg active:shadow-sm sm:flex-col sm:text-center"
			>
				<div
					class="aspect-square max-h-24 flex-shrink-0 overflow-clip rounded-lg border-2 border-stone-700 sm:max-h-32"
				>
					<img src={pb.getFileUrl(group, group.image, { thumb: "192x192" })} alt={group.name} />
				</div>

				<div class="flex flex-grow flex-col">
					<div class="mb-2 text-lg leading-none font-bold text-stone-900">
						{group.name}
					</div>

					<div class="flex-grow leading-tight text-stone-700">
						{group.description}
					</div>

					{#if data.availability[group.id]?.telegram}
						<a
							href={getInviteUrl("groups", group.id, "telegram")}
							class="mt-2 text-blue-500 hover:underline px-1 py-2"
						>
							Telegram
						</a>
					{/if}

					{#if data.availability[group.id]?.whatsapp}
						<a
							href={getInviteUrl("groups", group.id, "whatsapp")}
							class="mt-2 text-teal-700 hover:underline px-1 py-2"
						>
							WhatsApp
						</a>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	ul {
		gap: 15px;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		grid-auto-rows: 1fr;
	}
</style>
