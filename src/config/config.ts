import { env } from "../env";

export default {
  name: "rpa-demo-api",
  host: env.APP_HOST || "http://localhost",
  version: "1.0",
  environment: env.NODE_ENV || "development",
  port: env.NODE_ENV === "development" ? env.DEV_PORT : env.APP_PORT,
  auth: {
    secretKey: env.SECRET_KEY || "7DF79E7479B67BDB7CF83BBFE275A",
  },
  logging: {
    dir: env.LOGGING_DIR || "logs",
    level: env.LOGGING_LEVEL || "common",
  },
};
