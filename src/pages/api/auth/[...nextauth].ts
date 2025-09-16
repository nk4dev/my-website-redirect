import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userOperations } from "../../../lib/db";
import { compare } from "bcryptjs";

// Remove edge runtime for now to avoid compatibility issues
// export const runtime = 'edge';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const user = await userOperations.findUnique({
          email: credentials.email as string,
        });
        
        if (user && await compare(credentials.password as string, user.password)) {
          return { id: user.id, email: user.email };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/user/signin",
    signUp: "/user/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {},
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export default handler;