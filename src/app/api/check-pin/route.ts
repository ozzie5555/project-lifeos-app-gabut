import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();
  const { pin } = body;

  // Ambil PIN dari Database
  const result = await db.select().from(settings).where(eq(settings.key, "pin"));
  
  // Default PIN '123456' jika database kosong
  const correctPin = result[0]?.value || "123456";

  if (pin === correctPin) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}