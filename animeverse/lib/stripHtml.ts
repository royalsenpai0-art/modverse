/**
 * Strips HTML tags & entities from a string so excerpts can be shown
 * as clean plain text (used on game/blog cards).
 * Safe on server + client (pure string ops, no DOM needed).
 */
export function stripHtml(
    html: string | null | undefined,
    maxLength = 110
): string {
    if (!html) return "";

    const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#0?39;|&apos;/gi, "'")
        .replace(/\s+/g, " ")
        .trim();

    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "…";
}
