"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwtToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../../env");
const createJwtToken = (payload) => {
    const token = (0, jsonwebtoken_1.sign)(payload, env_1.env.SECRET_KEY, {
        expiresIn: "1d",
    });
    return token;
};
exports.createJwtToken = createJwtToken;
//# sourceMappingURL=jwt.utils.js.map