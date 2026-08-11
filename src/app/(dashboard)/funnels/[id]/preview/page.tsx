import { db } from "@/lib/db";
import { funnels } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Placeholder preview page

export default async function PreviewFunnelPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [funnel] = await db
    .select()
    .from(funnels)
    .where(eq(funnels.id, params.id))
    .limit(1);

  if (!funnel || funnel.userId !== session.user.id) redirect("/dashboard");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Preview Funnel: {funnel.name}</h1>
      <div className="space-y-4">
        <p>Use this URL to share your funnel publicly:</p>
        <code className="bg-gray-100 p-2 rounded block">/f/{funnel.slug}</code>
      </div>
    </div>
  );
}