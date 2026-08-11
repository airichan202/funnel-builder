import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string; pageId: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, pageId } = await params;
  const body = await request.json();

  const [page] = await db
    .update(pages)
    .set({ title: body.title, jsonBlocks: body.jsonBlocks, settings: body.settings })
    .where(and(eq(pages.id, pageId), eq(pages.funnelId, id)))
    .returning();

  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(page);
}
