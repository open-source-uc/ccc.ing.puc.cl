<script lang="ts">
    import { pb, type Record } from "~/lib/pb";
    import InitiativeCard from "~/components/InitiativeCard.svelte";

    interface Initiative extends Record {
        name: string;
        description: string;
        image: string;
        telegram_url?: string;
        website_url?: string;
        instagram_url?: string;
        linkedin_url?: string;
        github_url?: string;
        whatsapp_url?: string;
    }

    const initiatives_promise = pb.collection("initiatives").getFullList<Initiative>();

    function getSocialLinks(item: Initiative) {
        const links = [];
        if (item.website_url) links.push({ name: 'web', url: item.website_url });
        if (item.telegram_url) links.push({ name: 'telegram', url: item.telegram_url });
        if (item.instagram_url) links.push({ name: 'instagram', url: item.instagram_url });
        if (item.linkedin_url) links.push({ name: 'linkedin', url: item.linkedin_url });
        if (item.github_url) links.push({ name: 'github', url: item.github_url });
        if (item.whatsapp_url) links.push({ name: 'whatsapp', url: item.whatsapp_url });
        return links;
    }
</script>

{#await initiatives_promise}
    <div class="text-center h-32">Cargando...</div>
{:then initiatives}
    <ul class="my-4 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {#each initiatives as item}
            <InitiativeCard 
                name={item.name}
                logoSrc={pb.getFileUrl(item, item.image)}
                social={getSocialLinks(item)}
            >
                {item.description}
            </InitiativeCard>
        {/each}
    </ul>
{/await}