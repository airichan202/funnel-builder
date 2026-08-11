import { db } from "@/lib/db";
import { funnels } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const [funnel] = await db.select().from(funnels).where(eq(funnels.id, id)).limit(1);
  if (!funnel || funnel.userId !== session.user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(funnel);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const [funnel] = await db
    .update(funnels)
    .set({ name: body.name, status: body.status })
    .where(eq(funnels.id, id))
    .returning();
  if (!funnel || funnel.userId !== session.user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(funnel);
}
