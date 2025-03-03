<script lang="ts">
	import { pb, type Record } from "~/lib/pb";

	interface Course extends Record {
		code: string;
		abbr?: string;
		name: string;
		links: { [name: string]: string };
	}

	let _finally = false;

	async function getCourses() {
		_finally = false;
		try {
			const res = await pb.collection("courses").getFullList<Course>();
			if (res) {
				return res;
			} else {
				console.log(res);
				throw new Error(res);
			}
		} finally {
			_finally = true;
		}
	}

	let courses_promise = getCourses();
</script>

{#await courses_promise}
	<div class="text-center h-screen">Cargando...</div>
{:then courses}
	<ul class="course-grid mx-auto grid max-w-4xl p-4">
		{#each courses as course}
			{@const { abbr, code, name, invitation_url } = course}
			<li class="flex flex-col rounded bg-white py-3 px-2">
				<div class="flex-grow">
					<span>
						{#if abbr}
							{abbr} - {" "}
						{/if}
					</span>
					<span>{name}</span>
					({code})
				</div>
				<a href={invitation_url} class="text-blue-500 hover:underline p-1"> Telegram </a>
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
