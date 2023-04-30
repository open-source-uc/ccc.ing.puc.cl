<script lang="ts">
	import { pb } from "~/lib/pb";

	type Team = {
		name: string;
		telegram?: string;
		role?: string;
	};
	const representatives_promise = pb.collection("representatives").getFullList<Team>();
</script>

{#await representatives_promise}
	<div class="text-center h-screen">Cargando...</div>
{:then representatives}
	<ul class="repr-grid grip-tem mx-auto grid max-w-4xl p-4">
		{#each representatives as { name, role, telegram }}
			<li class="rounded bg-white py-4 px-2">
				<div>
					<div>{name}</div>
					{#if role}
						<div>{role}</div>
					{/if}
				</div>
				{#if telegram}
					Telegram:
					<a href={`https://t.me/${telegram}`} class="text-blue-500 hover:underline">
						@{telegram}
					</a>
				{/if}
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
