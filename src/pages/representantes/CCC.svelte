<script lang="ts">
	import { pb, type Record } from "~/lib/pb";

	interface Team extends Record {
		name: string;
		telegram?: string;
		role?: string;
		type: "ccc" | "delegado";
	}

	const representatives_promise = pb.collection("representatives").getFullList<Team>(undefined, {
		filter: 'type ~ "ccc"',
		sort: "sortValue",
		$cancelKey: "ccc",
	});
</script>

{#await representatives_promise}
	<div class="text-center h-32">Cargando...</div>
{:then representatives}
	<ol class="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2">
		{#each representatives as { name, role, telegram }}
			<li class="rounded bg-white py-4 px-2">
				<div class="font-bold">{name}</div>
				{#if role}
					<div class="text-stone-700">{role}</div>
				{/if}
				{#if telegram}
					<div class="mt-2">
						<a href={`https://t.me/${telegram}`} class="text-blue-500 hover:underline">Telegram </a>
					</div>
				{/if}
			</li>
		{/each}
	</ol>
{/await}
