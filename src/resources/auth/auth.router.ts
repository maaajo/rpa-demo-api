import { Router } from "express";
import { registerSchema, loginSchema, refreshTokenSchema } from "./auth.schema";
import { validateContentType } from "../../utils/middlewares/validateContentType.middleware";
import { validateRequestBody } from "../../utils/middlewares/validateRequestBody.middleware";
import {
  registerController,
  loginController,
  refreshTokenController,
} from "./auth.controller";

const authRouter: Router = Router();

authRouter
  .route("/register")
  .post([
    validateContentType(["application/json"]),
    validateRequestBody(registerSchema),
    registerController,
  ]);

authRouter
  .route("/login")
  .post([
    validateContentType(["application/json"]),
    validateRequestBody(loginSchema),
    loginController,
  ]);

authRouter
  .route("/refreshToken")
  .post([
    validateContentType(["application/json"]),
    validateRequestBody(refreshTokenSchema),
    refreshTokenController,
  ]);

export { authRouter };
