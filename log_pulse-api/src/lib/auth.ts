import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer } from "better-auth/plugins";
import { prisma } from "./prisma";

export const auth = betterAuth({
  baseURL: process.env["BETTER_AUTH_URL"],
  basePath: "/api/auth",
  secret: process.env["BETTER_AUTH_SECRET"],
  trustedOrigins: ["http://localhost:3000", "http://localhost:4000"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [bearer()],
});
