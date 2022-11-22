"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const consola_1 = __importDefault(require("consola"));
function errorHandler(err, req, res, next) {
    const status = err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR;
    consola_1.default.error(err);
    return res.status(status).json({
        result: "ERROR",
        code: status,
        error: errorMessage,
    });
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map