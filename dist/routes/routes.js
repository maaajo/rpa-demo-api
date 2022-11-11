"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = require("../resources/auth/auth.router");
const router = (0, express_1.Router)();
router.use("/auth", auth_router_1.authRouter);
router.route("/testing").get((req, res, next) => {
    return res.json({ message: "testing" });
});
exports.default = router;
//# sourceMappingURL=routes.js.map