import { db } from "@/lib/db";
import { funnels } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

function randomSlug() {
  return "funnel-" + Math.random().toString(36).slice(2, 8);
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const list = await db.select().from(funnels).where(eq(funnels.userId, session.user.id)).orderBy(funnels.createdAt);
  return NextResponse.json(list);
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [funnel] = await db
    .insert(funnels)
    .values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      name: "My Funnel",
      slug: randomSlug(),
      status: "draft",
    })
    .returning();
  return NextResponse.json(funnel);
}
