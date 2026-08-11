import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import Link from "next/link";

const SALT = bcrypt.genSaltSync(10);

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hash = await bcrypt.hash(password, SALT);

    await db.insert(users).values({ email, passwordHash: hash, id: crypto.randomUUID() });

    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Daftar Akun</h1>
        <form action={register} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
            Daftar
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}