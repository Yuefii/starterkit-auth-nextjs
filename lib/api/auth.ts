import { v4 as uuid } from "uuid";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { signInValidate } from "@/lib/validation/auth-validation";
import { encode as defaultEncode } from "next-auth/jwt";

import bcrypt from "bcrypt"
import prisma from "@/lib/prisma/config";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = signInValidate.parse(credentials);

        const user = await prisma.user.findFirst({
          where: {
            email: validatedCredentials.email,
          },
        });

        if (!user) {
          throw new Error("invalid credentials.");
        }

        const isPasswordValid = user.password && await bcrypt.compare(validatedCredentials.password, user.password);

        if (!isPasswordValid || !user.password) {
          throw new Error("invalid credentials.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("no user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});
