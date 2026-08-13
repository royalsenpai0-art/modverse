import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "a",
  "blockquote",
  "br",
  "code",
  "em",
  "h2",
  "h3",
  "h4",
  "hr",
  "li",
  "ol",
  "p",
  "pre",
  "strong",
  "u",
  "ul",
];

/**
 * Sanitizes rich text saved by the CMS before it is rendered on a public page.
 * Deliberately keeps the allowed format small: no scripts, styles, embeds, or event handlers.
 */
export function sanitizeRichContent(content?: string | null) {
  return sanitizeHtml(content || "", {
    allowedTags,
    allowedAttributes: {
      a: ["href", "rel", "target"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (_tagName, attributes) => ({
        tagName: "a",
        attribs: {
          href: attributes.href || "#",
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
    },
  });
}

/** Prevents user-provided JSON-LD values from prematurely closing a script tag. */
export function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
