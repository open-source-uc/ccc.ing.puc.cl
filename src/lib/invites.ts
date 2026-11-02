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