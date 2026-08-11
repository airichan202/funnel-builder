import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const list = await db.select().from(pages).where(eq(pages.funnelId, id)).orderBy(pages.stepOrder);
  return NextResponse.json(list);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const [page] = await db
    .insert(pages)
    .values({
      id: crypto.randomUUID(),
      funnelId: id,
      stepOrder: body.stepOrder ?? 1,
      title: body.title ?? "Page",
      jsonBlocks: body.jsonBlocks ?? [],
      settings: body.settings ?? null,
    })
    .returning();
  return NextResponse.json(page, { status: 201 });
}
