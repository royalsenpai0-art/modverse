const CATEGORY_LABELS: Record<string, string> = {
  "3d": "3D",
  apk: "APK",
  fps: "FPS",
  mmo: "MMO",
  mod: "MOD",
  rpg: "RPG",
};

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&apos;": "'",
  "&#39;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&nbsp;": " ",
  "&quot;": '"',
};

function toTitleCase(value: string) {
  return value
    .split("-")
    .map((part) => {
      const normalized = part.toLowerCase();
      return (
        CATEGORY_LABELS[normalized] ||
        `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`
      );
    })
    .join("-");
}

/** Returns one canonical display label for a category value. */
export function normalizeCategory(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map(toTitleCase)
    .join(" ");
}

/** Splits legacy comma- and slash-separated category values into canonical labels. */
export function getGameCategories(value?: string | null) {
  if (!value) return [];

  return [
    ...new Set(value.split(/[,/]/).map(normalizeCategory).filter(Boolean)),
  ];
}

export function getCategoryKey(value: string) {
  return normalizeCategory(value).toLocaleLowerCase();
}

/** Provides a user-friendly version without rendering duplicate `v` prefixes. */
export function displayVersion(value?: string | number | null) {
  const version = String(value ?? "").trim();

  if (!version) return "Latest";
  if (/^v/i.test(version) || !/^\d/.test(version)) return version;

  return `v${version}`;
}

/** Removes saved rich-text markup before it is shown in a compact game card. */
export function plainText(value?: string | null) {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(
      /&(amp|apos|#39|gt|lt|nbsp|quot);/gi,
      (entity) => HTML_ENTITIES[entity.toLowerCase()] || " ",
    )
    .replace(/\s+/g, " ")
    .trim();
}

export function getGameSummary({
  description,
  shortDescription,
}: {
  description?: string | null;
  shortDescription?: string | null;
}) {
  return plainText(shortDescription) || plainText(description);
}
