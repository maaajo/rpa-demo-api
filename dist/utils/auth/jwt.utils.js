"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicKey = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../../config/config"));
const fs = __importStar(require("fs/promises"));
const { auth: { privateKeyPath, accessTokenExpiresIn, refreshTokenExpiresIn, publicKeyPath, }, } = config_1.default;
const getPublicKey = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield fs.readFile(publicKeyPath, "utf-8");
});
exports.getPublicKey = getPublicKey;
const getPrivateKey = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield fs.readFile(privateKeyPath, "utf-8");
});
const createAccessToken = (accessPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = yield getPrivateKey();
    const token = (0, jsonwebtoken_1.sign)(accessPayload, privateKey, {
        expiresIn: accessTokenExpiresIn,
        algorithm: "RS256",
    });
    return token;
});
exports.createAccessToken = createAccessToken;
const createRefreshToken = (refreshPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = yield getPrivateKey();
    const token = (0, jsonwebtoken_1.sign)(refreshPayload, privateKey, {
        expiresIn: `${refreshTokenExpiresIn}d`,
        algorithm: "RS256",
    });
    return token;
});
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=jwt.utils.js.map