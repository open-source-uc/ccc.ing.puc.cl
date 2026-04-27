<script lang="ts">
	import Instagram from "./svgs/icons/Instagram.svelte";
	import LinkedIn from "./svgs/icons/LinkedIn.svelte";
	import Web from "./svgs/icons/Web.svelte";
	import Telegram from "./svgs/icons/Telegram.svelte";
	import GitHub from "./svgs/icons/GitHub.svelte";
    import WhatsApp from "./svgs/icons/WhatsApp.svelte";

	export let name: string;
	export let logoSrc: string;
	export let social: { name: string; url: string }[] = [];

	const socialIcons = {
		instagram: Instagram,
		linkedin: LinkedIn,
		web: Web,
		telegram: Telegram,
		github: GitHub,
        whatsapp: WhatsApp,
	};
</script>

<li class="max-w-xl mx-auto w-full list-none">
	<article class="flex gap-2 xs:gap-4 bg-stone-100 p-3 xs:p-4 rounded-xl h-full">
		<img
			src={logoSrc}
			alt={name}
			class="object-cover h-16 w-16 xs:h-24 xs:w-24 sm:h-32 sm:w-32 rounded-lg border-2 border-stone-700"
		/>
		<div class="flex flex-col w-full flex-grow md:h-full text-left">
			<div class="flex-grow">
				<h1 class="font-title text-xl sm:text-2xl text-stone-900">{name}</h1>
				<div class="leading-tight text-stone-700">
					<slot />
				</div>
			</div>

			{#if social && social.length > 0}
				<ul class="flex flex-wrap justify-end mt-2 gap-2">
					{#each social as { name, url }}
						<a href={url} target="_blank" rel="noopener noreferrer">
							<svelte:component 
								this={socialIcons[name]} 
								class="w-7 h-7 xs:w-8 xs:h-8 text-stone-800" 
							/>
							<span class="sr-only">{name}</span>
						</a>
					{/each}
				</ul>
			{/if}
		</div>
	</article>
</li>