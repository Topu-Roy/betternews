import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env["NODE_ENV"],
  DATABASE_URL: process.env["DATABASE_URL"],
  DIRECT_URL: process.env["DIRECT_URL"],
  GOOGLE_CLIENT_SECRET: process.env["GOOGLE_CLIENT_SECRET"],
  GOOGLE_CLIENT_ID: process.env["GOOGLE_CLIENT_ID"],
});
