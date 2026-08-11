import { db } from "@/lib/db";
import { funnels } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { EditorClient } from "@/components/editor/EditorClient";

export default async function EditFunnelPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [funnel] = await db
    .select()
    .from(funnels)
    .where(eq(funnels.id, params.id))
    .limit(1);

  if (!funnel || funnel.userId !== session.user.id) redirect("/dashboard");

  return <EditorClient funnelId={funnel.id} funnelName={funnel.name} />;
}
