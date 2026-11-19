import { contentTemplate, type CollectionName, type JsonValue } from "@/data/catalog";
import { fieldChoices, isSharedField, variableList } from "@/data/content-fields";

const identityFields = {
  services: "slug",
  articles: "slug",
  faqs: "id",
  aerial: "id",
  utilities: "id",
  cities: "slug",
} as const;

export function prepareContent(collection: CollectionName, key: string, data: unknown, published: boolean) {
  const template = contentTemplate(collection, key);
  if (template === undefined) throw new Error("This entry does not exist.");
  const label = (path: string[]) => path.join(" / ");

  function validate(value: unknown, shape: JsonValue, path: string[]): JsonValue {
    const field = path.at(-1) ?? "";
    if (Array.isArray(shape)) {
      const canResize = variableList(collection, field);
      if (!Array.isArray(value) || value.length > 60 || (!canResize && value.length !== shape.length)) {
        throw new Error(`Check the number of items in ${label(path)}.`);
      }
      return value.map((item, index) =>
        validate(item, canResize ? shape[0] ?? "" : shape[index], [...path, String(index + 1)]));
    }

    if (shape && typeof shape === "object") {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error(`Check the fields in ${label(path)}.`);
      }
      const source = value as Record<string, unknown>;
      return Object.fromEntries(Object.entries(shape).map(([name, example]) =>
        [name, validate(source[name], example, [...path, name])]));
    }

    if (typeof value !== typeof shape) throw new Error(`Enter a valid value for ${label(path)}.`);
    if (typeof value === "string") {
      const text = value.trim();
      if (text.length > 6000) throw new Error(`${label(path)} is too long.`);
      const shared = isSharedField(collection, path[0], field);
      if (shared) return text;
      const choices = fieldChoices(collection, field);
      if (choices && !choices.includes(text)) throw new Error(`Select an option for ${label(path)}.`);
      const image = ["image", "img"].includes(field) || field.endsWith("Image");
      const link = /(?:Href|Url)$/.test(field) || path.includes("socials") || field === "to";
      if (image && (text || published) && !/^\/(?:images|media)\/[a-zA-Z0-9/_\.%-]+$/.test(text)) {
        throw new Error(`${label(path)} must use a local /images/ or /media/ path.`);
      }
      if (link && text && !/^(?:\/(?![/\\])[^\\\s]*|https:\/\/[^\\\s]+)$/i.test(text)) {
        throw new Error(`${label(path)} must be a site path or an HTTPS URL.`);
      }
      if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        throw new Error("Enter a valid company email address.");
      }
      if (field === "phoneDial" && !/^\+?[0-9]{8,15}$/.test(text)) {
        throw new Error("Enter the dialable company number using digits and an optional leading +.");
      }
      return text;
    }
    if (typeof value === "number" && (!Number.isFinite(value) || value < 0 || value > 1_000_000_000 ||
      (["ratePerUnit", "sunHours", "capacityKw", "tariff", "billPerKw", "annualUnitsPerKw", "costPerKw", "tariffMultiplier", "step"].includes(field) && value === 0))) {
      throw new Error(`Enter a valid number for ${label(path)}.`);
    }
    return value as JsonValue;
  }

  const result = validate(data, template, []);
  if (!result || typeof result !== "object" || Array.isArray(result)) return result;

  if (collection === "blocks" && key === "CALCULATOR_SEGMENTS") {
    for (const value of Object.values(result)) {
      const segment = value as { minBill: number; maxBill: number; defaultBill: number; step: number };
      if (segment.minBill >= segment.maxBill || segment.defaultBill < segment.minBill ||
          segment.defaultBill > segment.maxBill || segment.step > segment.maxBill - segment.minBill) {
        throw new Error("For each segment, set a valid bill range, default and step size.");
      }
    }
  }

  const en = result.en as Record<string, JsonValue> | undefined;
  const bn = result.bn as Record<string, JsonValue> | undefined;
  const identity = identityFields[collection as keyof typeof identityFields];
  if (identity) (collection === "cities" ? result : en!)[identity] = key;

  if (en && bn && typeof en === "object" && typeof bn === "object") {
    for (const field of Object.keys(bn)) {
      if (isSharedField(collection, "bn", field)) bn[field] = en[field];
    }
  }
  if (published && identity && collection !== "aerial" && collection !== "utilities") {
    const entry = collection === "cities" ? result : en!;
    const title = entry.title || entry.question || entry.name;
    if (!title) throw new Error("Enter the English title or name before publishing.");
  }
  if (published && collection === "articles" && (!Array.isArray(en?.sections) || !en.sections.length)) {
    throw new Error("Add at least one English article section before publishing.");
  }

  // Align the shared step numbers with their position, including newly added steps.
  if (collection === "services") {
    for (const record of [en, bn]) {
      if (Array.isArray(record?.process)) {
        record.process.forEach((step, index) => {
          if (step && typeof step === "object" && !Array.isArray(step)) {
            step.step = String(index + 1).padStart(2, "0");
          }
        });
      }
    }
  }
  return result;
}
