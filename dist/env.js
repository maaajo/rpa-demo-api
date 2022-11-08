"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    // DATABASE_URL: z.string().url(),
    NODE_ENV: zod_1.z.enum(["development", "test", "production"]),
    DEV_PORT: zod_1.z.string().transform(Number),
    APP_PORT: zod_1.z.string().transform(Number),
    SECRET_KEY: zod_1.z.string().min(20),
    LOGGING_DIR: zod_1.z.string(),
    LOGGING_LEVEL: zod_1.z.enum(["combined", "common", "dev", "short", "tiny"]),
});
const result = envSchema.safeParse(process.env);
if (!result.success) {
    console.error("❌ Invalid environment variables: ", JSON.stringify(result.error.format(), null, 4));
    process.exit(1);
}
const env = result.data;
exports.env = env;
//# sourceMappingURL=env.js.map