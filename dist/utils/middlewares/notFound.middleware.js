"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
function notFound(req, res, next) {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        code: http_status_codes_1.StatusCodes.NOT_FOUND,
        error: http_status_codes_1.ReasonPhrases.NOT_FOUND,
        result: "ERROR",
    });
}
exports.default = notFound;
//# sourceMappingURL=notFound.middleware.js.map