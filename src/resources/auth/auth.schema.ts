import { z } from "zod";

const registerSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email"),
      password: z
        .string({ required_error: "Password is required" })
        .regex(
          new RegExp(".*[A-Z].*"),
          "Password must contain at least one uppercase character"
        )
        .regex(
          new RegExp(".*[a-z].*"),
          "Password must contain at least one lowercase character"
        )
        .regex(
          new RegExp(".*\\d.*"),
          "Password must contain at least one number"
        )
        .regex(
          new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
          "Password must contain at least one special character"
        )
        .min(8, "Password must be at least 8 characters in length"),
    })
    .strict(),
});

const loginSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email"),
      password: z.string({ required_error: "Password is required" }),
    })
    .strict(),
});

const refreshTokenSchema = z.object({
  body: z
    .object({
      refreshToken: z
        .string({ required_error: "Refresh token is required" })
        .min(20, "Refresh token is too short"),
    })
    .strict(),
});

export { registerSchema, loginSchema, refreshTokenSchema };
