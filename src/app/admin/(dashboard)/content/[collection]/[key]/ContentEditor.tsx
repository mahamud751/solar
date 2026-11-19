"use client";

import { useId, useState } from "react";
import type { CollectionName, JsonValue } from "@/data/catalog";
import { emptyField, fieldChoices, isSharedField, variableList } from "@/data/content-fields";
import { ActionForm } from "../../../../ActionForm";
import { saveContent } from "../../../../actions";

function fieldLabel(field: string) {
  const labels: Record<string, string> = {
    en: "English", bn: "Bangla", h: "Heading", t: "Title", d: "Description", p: "Paragraphs",
    q: "Quote", n: "Name", img: "Image path", h1a: "Heading, first part", h1b: "Heading, highlighted part",
    cta: "Button label", ctaHref: "Button link", alt: "Image description", to: "Link",
  };
  return labels[field] ?? field.replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ").replace(/^./, (letter) => letter.toUpperCase());
}

function Fields({ value, template, onChange, collection, field, language, root = false }: {
  value: JsonValue;
  template: JsonValue;
  onChange: (value: JsonValue) => void;
  collection: CollectionName;
  field: string;
  language: string;
  root?: boolean;
}) {
  const id = useId();
  const label = fieldLabel(field);
  if ((field === "slug" || field === "id") && ["services", "articles", "cities", "faqs", "aerial", "utilities"].includes(collection)) return null;
  if (isSharedField(collection, language, field)) return null;

  if (Array.isArray(value)) {
    const samples = Array.isArray(template) ? template : [];
    const canResize = variableList(collection, field);
    return (
      <fieldset className="grid gap-3 rounded-lg border border-[#d6e3dd] px-3 pb-3">
        <legend className="px-1 text-sm font-bold">{label || "Items"}</legend>
        {value.map((item, index) => (
          <div key={index} className="grid gap-2 rounded-lg bg-[#f4f8f5] p-3">
            <Fields
              value={item} template={(canResize ? samples[0] : samples[index]) ?? item}
              onChange={(next) => onChange(value.map((old, i) => i === index ? next : old))}
              collection={collection} field={`Item ${index + 1}`} language={language}
            />
            {canResize && <div>
              <button type="button" className="admin-button admin-button-danger" onClick={() => onChange(value.filter((_, i) => i !== index))}>
                Remove item {index + 1}
              </button>
            </div>}
          </div>
        ))}
        {canResize && <div>
          <button type="button" className="admin-button" onClick={() => onChange([...value, emptyField(samples[0] ?? "")])}>
            Add {field === "sections" ? "section" : "item"}
          </button>
        </div>}
      </fieldset>
    );
  }

  if (value && typeof value === "object") {
    const defaults = template && typeof template === "object" && !Array.isArray(template) ? template : value;
    const fields = (
      <div className="grid gap-3">
        {Object.entries(value).map(([key, item]) => (
          <Fields key={key} value={item} template={defaults[key] ?? item}
            onChange={(next) => onChange({ ...value, [key]: next })}
            collection={collection} field={key} language={root ? key : language}
          />
        ))}
      </div>
    );
    if (root) return fields;
    return <details className="rounded-lg border border-[#d6e3dd] p-3" open={field === "en" || field === "bn"}>
      <summary className="cursor-pointer text-sm font-extrabold">{label}</summary>
      <div className="mt-3">{fields}</div>
    </details>;
  }
  if (typeof value === "boolean") {
    return <label className="flex items-center gap-2 text-sm font-bold">
      <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>;
  }
  if (typeof value === "number") {
    return <label className="admin-field">{label}
      <input className="admin-input" type="number" min="0" step="any" value={value}
        onChange={(event) => onChange(event.target.valueAsNumber || 0)} />
    </label>;
  }

  const choices = fieldChoices(collection, field);
  const text = typeof value === "string" ? value : "";
  return <div className="admin-field">
    <label htmlFor={id}>{label}</label>
    {choices ? (
      <select id={id} className="admin-input" value={text} onChange={(event) => onChange(event.target.value)}>
        <option value="" disabled>Select an option</option>
        {choices.map((choice) => <option key={choice}>{choice}</option>)}
      </select>
    ) : text.length > 85 || ["answer", "description", "detail", "quote", "excerpt"].includes(field) || collection === "copy" ? (
      <textarea id={id} className="admin-input" rows={text.length > 180 ? 4 : 2} maxLength={6000} value={text}
        onChange={(event) => onChange(event.target.value)} />
    ) : (
      <input id={id} className="admin-input" value={text} maxLength={6000} onChange={(event) => onChange(event.target.value)} />
    )}
  </div>;
}

export function ContentEditor({ collection, entryKey, initial, template, position, published, version, fixed }: {
  collection: CollectionName;
  entryKey: string | null;
  initial: JsonValue;
  template: JsonValue;
  position: number;
  published: boolean;
  version: string;
  fixed: boolean;
}) {
  const [value, setValue] = useState(initial);
  const [key, setKey] = useState(entryKey ?? "");
  const [order, setOrder] = useState(String(position));
  const [live, setLive] = useState(published);
  return (
    <ActionForm action={saveContent.bind(null, collection, entryKey)} submit={fixed ? "Save changes" : live ? "Save and publish" : "Save draft"}>
      <input type="hidden" name="data" value={JSON.stringify(value)} />
      <input type="hidden" name="version" value={version} />
      {!fixed && <div className="grid gap-4 rounded-lg bg-[#f4f8f5] p-4 sm:grid-cols-3">
        <label className="admin-field">Slug
          <input className="admin-input" name="key" value={key} readOnly={Boolean(entryKey)} onChange={(event) => setKey(event.target.value)}
            pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={90} required />
        </label>
        <label className="admin-field">Sort position
          <input className="admin-input" type="number" name="position" min={0} max={9999} required value={order} onChange={(event) => setOrder(event.target.value)} />
        </label>
        <label className="flex items-center gap-2 self-end py-2 text-sm font-bold">
          <input type="checkbox" name="published" checked={live} onChange={(event) => setLive(event.target.checked)} />
          Published
        </label>
      </div>}
      <Fields value={value} template={template} onChange={setValue} collection={collection} field="" language="" root />
    </ActionForm>
  );
}
