import { db } from "@/lib/db";
import { funnels } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

function randomSlug() {
  return "funnel-" + Math.random().toString(36).slice(2, 8);
}

export default async function NewFunnelPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [funnel] = await db
    .insert(funnels)
    .values({
      id: crypto.randomUUID(),
      userId: session.user.id!,
      name: "My Funnel",
      slug: randomSlug(),
      status: "draft",
    })
    .returning();

  redirect(`/funnels/${funnel.id}/edit`);
}
