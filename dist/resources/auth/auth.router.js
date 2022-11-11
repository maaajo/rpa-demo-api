"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.route("/register").get((req, res, next) => {
    return res.json({ status: "OK" });
});
//# sourceMappingURL=auth.router.js.map