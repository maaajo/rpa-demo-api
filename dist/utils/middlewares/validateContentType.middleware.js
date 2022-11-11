"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContentType = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_exception_1 = require("../exceptions/http.exception");
function asyncCheckContentType(req, allowedContentTypes) {
    const asyncResult = new Promise((resolve, reject) => {
        if (req.is(allowedContentTypes)) {
            resolve();
        }
        else {
            const usedContentType = req.get("Content-Type");
            const errorMessage = `Unsupported Content-Type. You used: ${usedContentType} but only the following are allowed: ${allowedContentTypes.join(", ")}.`;
            reject(errorMessage);
        }
    });
    return asyncResult;
}
const validateContentType = (allowedContentTypes) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield asyncCheckContentType(req, allowedContentTypes);
        next();
    }
    catch (error) {
        const customError = new http_exception_1.CustomException(http_status_codes_1.StatusCodes.UNSUPPORTED_MEDIA_TYPE, error);
        next(customError);
    }
});
exports.validateContentType = validateContentType;
//# sourceMappingURL=validateContentType.middleware.js.map