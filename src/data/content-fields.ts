import { divisions } from "./cities";
import type { CollectionName, JsonValue } from "./catalog";

export function fieldChoices(collection: CollectionName, field: string): readonly string[] | undefined {
  if (collection === "services" && field === "category") return ["Installations", "Financing", "Operations"];
  if (collection === "brands" && field === "kind") return ["panel", "inverter", "battery"];
  if (collection === "testimonials" && field === "segment") return ["Residential", "Industrial"];
  if (collection === "cities" && field === "division") return divisions;
}

export function variableList(collection: CollectionName, field: string) {
  return (collection === "articles" && ["sections", "paragraphs", "bullets"].includes(field)) ||
    (collection === "services" && ["benefits", "idealFor", "deliverables", "process"].includes(field));
}

export function emptyField(template: JsonValue): JsonValue {
  if (Array.isArray(template)) return template.map(emptyField);
  if (template && typeof template === "object") {
    return Object.fromEntries(Object.entries(template).map(([key, value]) => [key, emptyField(value)]));
  }
  return typeof template === "string" ? "" : template;
}

export function isSharedField(collection: CollectionName, language: string, field: string) {
  if (language !== "bn" || ["settings", "blocks", "copy"].includes(collection)) return false;
  return ["slug", "id", "image", "category", "step", "segment", "ctaHref", "ratePerUnit", "sunHours"]
    .includes(field) && !(collection === "articles" && field === "category");
}
