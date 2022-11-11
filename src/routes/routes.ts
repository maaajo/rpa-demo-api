import { Router } from "express";
import { authRouter } from "../resources/auth/auth.router";

const router: Router = Router();

router.use("/auth", authRouter);

router.route("/testing").get((req, res, next) => {
  return res.json({ message: "testing" });
});

export default router;
