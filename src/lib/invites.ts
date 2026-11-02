const INVITE_VERIFIER_URL =
    import.meta.env.PUBLIC_INVITE_VERIFIER_URL ||
    "https://ccc-invite-verifier.osuc.dev";

export function getInviteUrl(
    source: "groups" | "courses",
    id: string,
    platform: "telegram" | "whatsapp"
) {
    const url = new URL("/", INVITE_VERIFIER_URL);

    url.searchParams.set("source", source);
    url.searchParams.set("id", id);
    url.searchParams.set("platform", platform);

    return url.toString();
}

export async function getInviteAvailability(
    source: "groups" | "courses"
): Promise<Record<string, {
    telegram: boolean;
    whatsapp: boolean;
}>> {
    const url = new URL("/availability", INVITE_VERIFIER_URL);
    url.searchParams.set("source", source);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("No se pudo consultar la disponibilidad");
    }

    return response.json();
}