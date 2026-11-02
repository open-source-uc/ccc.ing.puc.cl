<script lang="ts">
	import { pb, type Record } from "~/lib/pb";

	interface Course extends Record {
		code: string;
		abbr?: string;
		name: string;
	}

	async function getCourses() {
		const res: Course[] = await pb.collection("courses").getFullList<Course>();
		res.sort((a, b) => a.code.localeCompare(b.code));
		return res;
	}

	let courses_promise = getCourses();
</script>

{#await courses_promise}
	<div class="text-center h-screen">Cargando...</div>
{:then courses}
	<ul class="course-grid mx-auto grid max-w-4xl p-4">
		{#each courses as course}
			<li class="flex flex-col rounded bg-white py-3 px-2">
				<div class="flex-grow">
					{#if course.abbr}
						{course.abbr} - {" "}
					{/if}
					{course.name} ({course.code})
				</div>

				<a
					href={`https://ccc-invite-verifier.osuc.workers.dev/?source=courses&id=${course.id}&platform=telegram`}
					class="text-blue-500 hover:underline p-1"
				>
					Telegram
				</a>
			</li>
		{/each}
	</ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	.course-grid {
		gap: 15px;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-auto-rows: 1fr;
	}
</style>
