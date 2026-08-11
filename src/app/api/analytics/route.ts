import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const [event] = await db
    .insert(events)
    .values({
      id: crypto.randomUUID(),
      funnelId: body.funnelId,
      pageId: body.pageId ?? null,
      visitorId: body.visitorId ?? null,
      eventType: body.eventType,
      meta: body.meta ?? null,
    })
    .returning();

  return NextResponse.json(event);
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const funnelId = searchParams.get("funnelId");
  if (!funnelId) return NextResponse.json({ error: "Missing funnelId" }, { status: 400 });

  const [views] = await db
    .select({ total: count() })
    .from(events)
    .where(eq(events.funnelId, funnelId));

  return NextResponse.json({ totalViews: views.total });
}
