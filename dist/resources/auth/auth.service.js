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
exports.updateRefreshToken = exports.saveRefreshToken = void 0;
const prisma_db_1 = require("../../db/prisma.db");
const saveRefreshToken = (refreshTokenData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_db_1.db.refreshToken.create({ data: refreshTokenData });
});
exports.saveRefreshToken = saveRefreshToken;
const getRefreshTokenUser = (findValues) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_db_1.db.refreshToken.findUnique({
        where: findValues,
        select: { user: true },
    });
});
const updateRefreshToken = (findValues, dataToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_db_1.db.refreshToken.update({
        where: findValues,
        data: dataToUpdate,
    });
});
exports.updateRefreshToken = updateRefreshToken;
//# sourceMappingURL=auth.service.js.map