import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  // TODO: fetch funnels from DB
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="space-y-4">
        <p>Welcome, {session.user.email}</p>
        <Link href="/funnels/new" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md">Create New Funnel</Link>
      </div>
    </div>
  );
}