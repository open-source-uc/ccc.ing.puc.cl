<script lang="ts">
	import { isNavBarOpen } from "~/lib/stores";
	import Hambuerger from "~/components/Hambuerger.svelte";
</script>

<nav class:open={$isNavBarOpen}>
	<!-- Parte superior / de la izquierda del navbar -->
	<div class="flex w-full items-center justify-between gap-8 md:w-auto">
		<a class="flex items-center gap-4" href="/">
			<img src="/ccc.svg" height="50px" width="46px" alt="CCC logo" />
			<h1 class="hidden max-w-[10em] font-title text-xl font-extrabold leading-none lg:block">
				Capítulo de Ciencia de la Computación
			</h1>
		</a>
		<Hambuerger
			label="open navbar"
			class="flex md:hidden"
			on:click={() => isNavBarOpen.set(!$isNavBarOpen)}
			isOpen={$isNavBarOpen}
		/>
	</div>
	<!-- Separador -->
	<div class="hidden h-6 w-1 rounded-full bg-black md:block" />
	<!-- Parte inferior / de la derecha del navbar -->
	<div id="nav-content" class="hidden w-full flex-col items-center gap-2 md:flex md:w-auto md:flex-row md:gap-8">
		<a class="nav-item" href="/cursos">Cursos</a>
		<a class="nav-item" href="/representantes">Representantes</a>
		<a class="nav-item" href="/grupos">Grupos</a>
		<a class="nav-item" href="/iniciativas">Iniciativas</a>
		<a class="nav-item" href="/guias">Guías</a>
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply sticky top-0 z-30 flex w-full flex-wrap items-center justify-between gap-8 bg-white p-4 shadow-md md:flex-nowrap md:justify-center;
	}
	.nav-item {
		@apply px-1 py-2 text-center font-bold text-gray-600 decoration-purple-800 hover:text-purple-800;
	}
	nav.open #nav-content {
		@apply flex items-stretch;
	}
</style>
