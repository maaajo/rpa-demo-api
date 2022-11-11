"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email("Invalid email"),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .regex(new RegExp(".*[A-Z].*"), "Password must contain at least one uppercase character")
            .regex(new RegExp(".*[a-z].*"), "Password must contain at least one lowercase character")
            .regex(new RegExp(".*\\d.*"), "Password must contain at least one number")
            .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "Password must contain at least one special character")
            .min(8, "Password must be at least 8 characters in length"),
    })
        .strict(),
});
exports.registerSchema = registerSchema;
//# sourceMappingURL=auth.schema.js.map