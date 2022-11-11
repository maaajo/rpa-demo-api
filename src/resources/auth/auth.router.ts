import { Router } from "express";
import { registerSchema } from "./auth.schema";
import { validateContentType } from "../../utils/middlewares/validateContentType.middleware";
import { validateRequestBody } from "../../utils/middlewares/validateRequestBody.middleware";
import { registerController } from "./auth.controller";

const authRouter: Router = Router();

authRouter
  .route("/register")
  .post([
    validateContentType(["application/json"]),
    validateRequestBody(registerSchema),
    registerController,
  ]);

export { authRouter };
