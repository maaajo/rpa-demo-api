"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/testing").get((req, res, next) => {
    return res.json({ message: "testing" });
});
exports.default = router;
//# sourceMappingURL=routes.js.map