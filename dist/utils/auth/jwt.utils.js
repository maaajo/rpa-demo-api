"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../../config/config"));
const { auth: { accessTokenSecretKey, accessTokenExpiresIn, refreshTokenSecretKey, refreshTokenExpiresIn, }, } = config_1.default;
const createAccessToken = (accessPayload) => {
    const token = (0, jsonwebtoken_1.sign)(accessPayload, accessTokenSecretKey, {
        expiresIn: accessTokenExpiresIn,
    });
    return token;
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (refreshPayload) => {
    const token = (0, jsonwebtoken_1.sign)(refreshPayload, refreshTokenSecretKey, {
        expiresIn: `${refreshTokenExpiresIn}d`,
    });
    return token;
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=jwt.utils.js.map