"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_schema_1 = require("./auth.schema");
const validateContentType_middleware_1 = require("../../utils/middlewares/validateContentType.middleware");
const validateRequestBody_middleware_1 = require("../../utils/middlewares/validateRequestBody.middleware");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter
    .route("/register")
    .post([
    (0, validateContentType_middleware_1.validateContentType)(["application/json"]),
    (0, validateRequestBody_middleware_1.validateRequestBody)(auth_schema_1.registerSchema),
    auth_controller_1.registerController,
]);
//# sourceMappingURL=auth.router.js.map