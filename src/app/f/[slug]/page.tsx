import { db } from "@/lib/db";
import { funnels } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

// Public funnel page

export default async function PublicFunnelPage({ params }: { params: { slug: string } }) {
  const [funnel] = await db
    .select()
    .from(funnels)
    .where(eq(funnels.slug, params.slug))
    .limit(1);

  if (!funnel) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <h1 className="font-bold text-lg">{funnel.name}</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Funnel: {funnel.name}</p>
        {/* TODO: render actual pages from funnel */}
      </main>
    </div>
  );
}