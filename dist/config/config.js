"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
exports.default = {
    name: "rpa-demo-api",
    host: env_1.env.APP_HOST || "http://localhost",
    version: "1.0",
    environment: env_1.env.NODE_ENV || "development",
    port: env_1.env.NODE_ENV === "development" ? env_1.env.DEV_PORT : env_1.env.APP_PORT,
    auth: {
        privateKeyPassphrase: env_1.env.PRIVATE_KEY_PASSPHRASE,
        accessTokenSecretKey: env_1.env.ACCESS_TOKEN_SECRET_KEY,
        refreshTokenSecretKey: env_1.env.REFRESH_TOKEN_SECRET_KEY,
        accessTokenExpiresIn: "15m",
        refreshTokenExpiresIn: 7,
    },
    logging: {
        dir: env_1.env.LOGGING_DIR || "logs",
        level: env_1.env.LOGGING_LEVEL || "common",
    },
    mainApiRoute: "/api",
};
//# sourceMappingURL=config.js.map