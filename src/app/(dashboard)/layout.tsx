import type { ReactNode } from "react";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/dashboard" className="font-bold text-lg">Funnel Builder</Link>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit" className="text-sm text-gray-600 hover:text-red-600">Logout</button>
              </form>
            ) : null}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}