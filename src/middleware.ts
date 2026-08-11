import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

const authEdgeConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async () => null,
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

const { auth } = NextAuth(authEdgeConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const protectedRoutes = ["/dashboard", "/funnels", "/editor", "/analytics", "/templates"];
  const isProtected = protectedRoutes.some((r) => nextUrl.pathname.startsWith(r));

  if (isProtected && !isLoggedIn) {
    const url = new URL("/login", nextUrl);
    url.searchParams.set("callbackUrl", nextUrl.toString());
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|f/).*)"],
};
