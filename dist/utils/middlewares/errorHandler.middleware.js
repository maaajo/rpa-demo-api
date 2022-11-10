"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
function errorHandler(err, req, res, next) {
    const status = err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR;
    return res.status(status).json({
        result: "ERROR",
        code: status,
        error: errorMessage,
    });
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map