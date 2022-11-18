import { env } from "../env";

export default {
  name: "rpa-demo-api",
  host: env.APP_HOST || "http://localhost",
  version: "1.0",
  environment: env.NODE_ENV || "development",
  port: env.NODE_ENV === "development" ? env.DEV_PORT : env.APP_PORT,
  auth: {
    privateKeyPath: env.PRIVATE_KEY_PATH,
    publicKeyPath: env.PUBLIC_KEY_PATH,
    accessTokenExpiresIn: "15m",
    refreshTokenExpiresIn: 7,
  },
  logging: {
    dir: env.LOGGING_DIR || "logs",
    level: env.LOGGING_LEVEL || "common",
  },
  mainApiRoute: "/api",
};
