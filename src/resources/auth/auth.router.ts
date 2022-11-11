import { Router } from "express";

const authRouter: Router = Router();

authRouter.route("/register").get((req, res, next) => {
  return res.json({ status: "OK" });
});

export { authRouter };
