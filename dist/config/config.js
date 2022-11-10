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
        secretKey: env_1.env.SECRET_KEY || "7DF79E7479B67BDB7CF83BBFE275A",
    },
    logging: {
        dir: env_1.env.LOGGING_DIR || "logs",
        level: env_1.env.LOGGING_LEVEL || "common",
    },
    mainApiRoute: "/api",
};
//# sourceMappingURL=config.js.map