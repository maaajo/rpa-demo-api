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
exports.validateRequestBody = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_exception_1 = require("../exceptions/http.exception");
const getErrorMessage = (zodError) => {
    const messages = zodError.issues.map((issue) => issue.message);
    return `Failed validating request body. Issues: [${messages.join(", ")}]`;
};
const validateRequestBody = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const zodParseResult = yield schema.safeParseAsync({
        body: req.body,
    });
    if (zodParseResult.success) {
        return next();
    }
    else {
        const customException = new http_exception_1.CustomException(http_status_codes_1.StatusCodes.BAD_REQUEST, getErrorMessage(zodParseResult.error));
        return next(customException);
    }
});
exports.validateRequestBody = validateRequestBody;
//# sourceMappingURL=validateRequestBody.middleware.js.map