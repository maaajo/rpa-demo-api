"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
function notFound(req, res, next) {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        error: {
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: http_status_codes_1.ReasonPhrases.NOT_FOUND,
        },
    });
}
exports.default = notFound;
//# sourceMappingURL=notFound.middleware.js.map