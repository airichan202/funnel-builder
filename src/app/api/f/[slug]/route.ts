import { db } from "@/lib/db";
import { funnels } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [funnel] = await db.select().from(funnels).where(eq(funnels.slug, slug)).limit(1);
  if (!funnel) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ funnel });
}
