"use server";

import { db } from "@/lib/db";
import { activityLogs, financeLogs, targets, settings } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

// 1. TAMBAH KEUANGAN
export async function addTransaction(formData: FormData) {
  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const type = formData.get("type") as string;
  const finalAmount = type === "expense" ? -Math.abs(amount) : Math.abs(amount);

  await db.insert(financeLogs).values({
    title,
    amount: finalAmount,
    category: type === "income" ? "Income" : "Expense",
  });

  await db.insert(activityLogs).values({
    action: `Input ${type}: ${title}`,
    tag: "Finance",
  });

  revalidatePath("/");
  revalidatePath("/finance");
  redirect("/");
}

// 2. TAMBAH LOG AKTIVITAS
export async function addActivity(formData: FormData) {
  const action = formData.get("action") as string;
  const tag = formData.get("tag") as string;

  await db.insert(activityLogs).values({ action, tag });

  revalidatePath("/");
  revalidatePath("/activity");
  redirect("/");
}

// 3. SET TARGET BARU
export async function addTarget(formData: FormData) {
  const title = formData.get("title") as string;
  const dueDate = formData.get("dueDate") as string;

  await db.insert(targets).values({ title, dueDate, isCompleted: false });

  revalidatePath("/");
  redirect("/");
}

// 4. HAPUS LOG AKTIVITAS (Clear Logs)
export async function clearActivityLogs() {
  await db.delete(activityLogs);
  revalidatePath("/");
  revalidatePath("/activity");
}

// 5. RESET DATA KEUANGAN
export async function resetFinance() {
  await db.delete(financeLogs);
  revalidatePath("/");
  revalidatePath("/finance");
}

// 6. HAPUS SEMUA GOALS (Clear Goals)
export async function clearGoals() {
  await db.delete(targets);
  revalidatePath("/");
}

// 7. UPDATE NAMA USER
export async function updateName(formData: FormData) {
  const name = formData.get("name") as string;
  
  // Cek apakah row sudah ada, kalau belum insert, kalau sudah update
  const existing = await db.select().from(settings).where(eq(settings.key, "username"));
  
  if (existing.length > 0) {
      await db.update(settings).set({ value: name }).where(eq(settings.key, "username"));
  } else {
      await db.insert(settings).values({ key: "username", value: name });
  }

  revalidatePath("/");
  revalidatePath("/settings");
}

// 8. UPDATE PIN KEAMANAN
export async function updatePin(formData: FormData) {
  const pin = formData.get("pin") as string;

  if (pin.length === 6 && !isNaN(Number(pin))) {
    const existing = await db.select().from(settings).where(eq(settings.key, "pin"));

    if (existing.length > 0) {
        await db.update(settings).set({ value: pin }).where(eq(settings.key, "pin"));
    } else {
        await db.insert(settings).values({ key: "pin", value: pin });
    }
  }
}