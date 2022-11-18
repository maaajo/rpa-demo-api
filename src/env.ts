import * as dotenv from "dotenv";

dotenv.config();

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  DEV_PORT: z.string().transform(Number),
  APP_PORT: z.string().transform(Number),
  PRIVATE_KEY_PATH: z.string(),
  PUBLIC_KEY_PATH: z.string(),
  LOGGING_DIR: z.string(),
  LOGGING_LEVEL: z.enum(["combined", "common", "dev", "short", "tiny"]),
  APP_HOST: z.string().url(),
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
