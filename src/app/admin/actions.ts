"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { contentTemplate, isCollection, isFixed } from "@/data/catalog";
import { Prisma } from "@/generated/prisma/client";
import { InquiryStatus } from "@/generated/prisma/enums";
import { requireAdmin, signIn, signOut } from "@/server/admin";
import { database } from "@/server/db";
import { prepareContent } from "@/server/validate-content";

export type FormState = { error?: string; success?: string };

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const result = z.object({ email: z.email().max(254), password: z.string().min(1).max(128) })
    .safeParse({ email: String(form.get("email") ?? "").trim().toLowerCase(), password: form.get("password") });
  if (!result.success) return { error: "The email or password is incorrect." };
  const error = await signIn(result.data.email, result.data.password);
  if (error) return { error };
  redirect("/admin");
}

export async function logout() {
  await signOut();
  redirect("/admin/login");
}

const keyPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function saveContent(collection: string, existingKey: string | null, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  if (!isCollection(collection)) return { error: "Unknown collection." };
  const fixed = isFixed(collection);
  const key = existingKey ?? String(form.get("key") ?? "").trim().toLowerCase();
  if ((!fixed && (!keyPattern.test(key) || key.length > 90 || (!existingKey && key === "new"))) || !contentTemplate(collection, key)) {
    return { error: "Use up to 90 lowercase letters, numbers and hyphens for the slug." };
  }
  const position = fixed ? 0 : Number(form.get("position"));
  if (!Number.isInteger(position) || position < 0 || position > 9999) return { error: "Enter a sort position between 0 and 9999." };
  const published = fixed || form.get("published") === "on";

  let data: Prisma.InputJsonValue;
  try {
    data = prepareContent(collection, key, JSON.parse(String(form.get("data") ?? "")), published) as Prisma.InputJsonValue;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Check the supplied values." };
  }

  const db = database();
  try {
    const version = String(form.get("version") ?? "");
    if (existingKey && (!fixed || version)) {
      const updatedAt = new Date(version);
      if (Number.isNaN(updatedAt.getTime())) return { error: "Reload the editor and try again." };
      const { count } = await db.contentEntry.updateMany({
        where: { collection, key, updatedAt },
        data: fixed ? { data, published } : { data, position, published },
      });
      if (!count) return { error: "This entry changed in another session. Reload it before saving." };
    } else {
      await db.contentEntry.create({ data: { collection, key, data, position, published } });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "This slug already exists in the collection." };
    }
    console.error("Unable to save a content entry.", error instanceof Error ? error.name : "");
    return { error: "Could not save the content. Try again shortly." };
  }

  revalidatePath("/", "layout");
  redirect(`/admin/content/${collection}/${key}?saved=1`);
}

export async function deleteContent(collection: string, key: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  if (!isCollection(collection) || isFixed(collection)) return { error: "This entry cannot be deleted." };
  if (form.get("confirm") !== "on") return { error: "Confirm deletion first." };
  const updatedAt = new Date(String(form.get("version") ?? ""));
  if (Number.isNaN(updatedAt.getTime())) return { error: "Reload the editor and try again." };
  const { count } = await database().contentEntry.deleteMany({ where: { collection, key, updatedAt } });
  if (!count) return { error: "This entry changed in another session. Reload it before deleting." };
  revalidatePath("/", "layout");
  redirect(`/admin/content/${collection}`);
}

export async function saveInquiry(id: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const values = z.object({ id: z.uuid(), status: z.enum(InquiryStatus), notes: z.string().trim().max(6000), updatedAt: z.iso.datetime() })
    .safeParse({ id, status: form.get("status"), notes: form.get("notes"), updatedAt: form.get("version") });
  if (!values.success) return { error: "Choose a status and keep notes under 6,000 characters." };
  const { status, notes, updatedAt } = values.data;
  const { count } = await database().inquiry.updateMany({ where: { id, updatedAt }, data: { status, notes } });
  if (!count) return { error: "Another session changed this inquiry. Reload it before saving." };
  revalidatePath("/admin");
  redirect(`/admin/inquiries/${id}?saved=1`);
}

export async function deleteInquiry(id: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const values = z.object({ id: z.uuid(), updatedAt: z.iso.datetime(), confirm: z.literal("on") })
    .safeParse({ id, updatedAt: form.get("version"), confirm: form.get("confirm") });
  if (!values.success) return { error: "Confirm deletion before continuing." };
  const { count } = await database().inquiry.deleteMany({ where: { id, updatedAt: values.data.updatedAt } });
  if (!count) return { error: "Another session changed this inquiry. Reload it before deleting." };
  revalidatePath("/admin");
  redirect("/admin/inquiries");
}
