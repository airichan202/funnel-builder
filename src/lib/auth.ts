import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as { email: string; password: string };
        if (!email || !password) return null;

        const { db } = await import("./db");
        const { users } = await import("./db/schema");
        const { eq } = await import("drizzle-orm");
        const bcrypt = await import("bcryptjs");

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id && session.user) session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export default authConfig;
