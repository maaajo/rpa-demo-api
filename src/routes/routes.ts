import { Router } from "express";

const router: Router = Router();

router.route("/testing").get((req, res, next) => {
  return res.json({ message: "testing" });
});

export default router;
