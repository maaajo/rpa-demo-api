import * as dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

const envSchema = z.object({
  // DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.string().transform(Number),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    "❌ Invalid environment variables: ",
    JSON.stringify(result.error.format(), null, 4)
  );
  process.exit(1);
}

const env = result.data;

export { env };
