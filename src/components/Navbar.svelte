<script lang="ts">
  import { isNavBarOpen } from "~/lib/stores";
  import Hambuerger from "~/components/Hambuerger.svelte";
  import cccIcon from "$/ccc.svg";
</script>

<nav class:open={$isNavBarOpen}>
  <!-- Parte superior / de la izquierda del navbar -->
  <div class="flex gap-8 items-center justify-between w-full md:w-auto">
    <div class="flex items-center gap-4">
      <img src={cccIcon} height="50px" width="46px" alt="CCC logo" />
      <h1 class="hidden lg:block font-title font-extrabold text-xl max-w-[10em] leading-none">
        Capítulo de Ciencias de la Computación
      </h1>
    </div>
    <Hambuerger class="md:hidden flex" on:click={() => isNavBarOpen.set(!$isNavBarOpen)} isOpen={$isNavBarOpen} />
  </div>
  <!-- Separador -->
  <div class="w-1 bg-black h-6 rounded-full hidden md:block" />
  <!-- Parte inferior / de la derecha del navbar -->
  <div id="nav-content" class="hidden items-center gap-2 md:gap-8 md:flex w-full md:w-auto flex-col md:flex-row">
    <a class="nav-item" href="/cursos">Cursos</a>
    <a class="nav-item" href="/representantes">Representantes</a>
    <a class="nav-item" href="/grupos">Grupos</a>
    <a class="nav-item" href="/actividades">Actividades</a>
    <a class="nav-item" href="/guias">Guias</a>
    <a class="nav-item" href="/merch">Merch</a>
  </div>
</nav>

<style>
  nav {
    @apply flex gap-8 items-center justify-between md:justify-center shadow-md p-4 flex-wrap md:flex-nowrap sticky w-full bg-white top-0;
  }
  .nav-item {
    @apply px-1 py-2 text-gray-600 hover:underline decoration-purple-800 text-center;
  }
  nav.open #nav-content {
    @apply flex items-stretch;
  }
</style>
