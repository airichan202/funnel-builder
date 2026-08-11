import { getTemplateById } from "@/lib/templates";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { funnels } from "@/lib/db/schema";
import { auth } from "@/lib/auth";

function randomSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.random().toString(36).slice(2, 6);
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;
  const template = getTemplateById(id);
  if (!template) redirect("/templates");

  const [funnel] = await db
    .insert(funnels)
    .values({
      id: crypto.randomUUID(),
      userId: session.user.id!,
      name: template.name,
      slug: randomSlug(template.name),
      status: "draft",
    })
    .returning();

  redirect(`/funnels/${funnel.id}/edit`);
}
