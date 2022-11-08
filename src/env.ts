import * as dotenv from "dotenv";
import NodeEnvEnum from "./resources/enums/nodeEnv.enum";
import LoggingLevelEnum from "./resources/enums/loggingLevels.enum";
dotenv.config();

import { z } from "zod";

const envSchema = z.object({
  // DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  DEV_PORT: z.string().transform(Number),
  APP_PORT: z.string().transform(Number),
  SECRET_KEY: z.string().min(20),
  LOGGING_DIR: z.string(),
  LOGGING_LEVEL: z.enum(["combined", "common", "dev", "short", "tiny"]),
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