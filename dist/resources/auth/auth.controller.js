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
exports.loginController = exports.registerController = void 0;
const http_status_codes_1 = require("http-status-codes");
const prismaErrorHandler_1 = require("../../utils/db/prismaErrorHandler");
const http_exception_1 = require("../../utils/exceptions/http.exception");
const user_service_1 = require("../user/user.service");
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createNewUser)(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            code: http_status_codes_1.StatusCodes.OK,
            result: "SUCCESS",
            data: user,
        });
    }
    catch (error) {
        const prismaErrorMessage = (0, prismaErrorHandler_1.getPrismaErrorMessage)(error);
        const customException = new http_exception_1.CustomException(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, prismaErrorMessage || error);
        return next(customException);
    }
});
exports.registerController = registerController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email: providedEmail, password: providedPassword } = req.body;
        const getHashedPasswordResult = yield (0, user_service_1.getUserPasswordByEmail)(providedEmail);
        if (!getHashedPasswordResult) {
            const customException = new http_exception_1.CustomException(http_status_codes_1.StatusCodes.NOT_FOUND, "Email not found");
            return next(customException);
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            code: http_status_codes_1.StatusCodes.OK,
            result: "SUCCESS",
            data: getHashedPasswordResult.password,
        });
    }
    catch (error) {
        const customException = new http_exception_1.CustomException(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error);
        return next(customException);
    }
});
exports.loginController = loginController;
//# sourceMappingURL=auth.controller.js.map