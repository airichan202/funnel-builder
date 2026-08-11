import { db } from "@/lib/db";
import { funnels } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AnalyticsChart } from "@/components/charts/AnalyticsChart";

export default async function FunnelAnalyticsPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [funnel] = await db
    .select()
    .from(funnels)
    .where(eq(funnels.id, params.id))
    .limit(1);

  if (!funnel || funnel.userId !== session.user.id) redirect("/dashboard");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics: {funnel.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-3xl font-bold text-blue-600">1,240</p>
          <p className="text-sm text-gray-500">Total Views</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-3xl font-bold text-green-600">124</p>
          <p className="text-sm text-gray-500">Conversions</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-3xl font-bold text-purple-600">10.0%</p>
          <p className="text-sm text-gray-500">Conversion Rate</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-medium mb-2">Daily Views & Conversions</h3>
        <AnalyticsChart />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-medium mb-2">Leads</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Step</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[0, 1, 2, 3, 4].map((i) => (
              <tr key={i}>
                <td className="px-4 py-2 text-sm text-gray-500">lead{i}@example.com</td>
                <td className="px-4 py-2 text-sm text-gray-500">2026-08-11 {10 + i}:00</td>
                <td className="px-4 py-2 text-sm text-gray-500">Step {i + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
