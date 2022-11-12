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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSuccessAuthAttempt = exports.insertLastFailedAuthAttempt = exports.getUserByEmail = exports.createNewUser = void 0;
const prisma_db_1 = require("../../db/prisma.db");
const client_1 = require("@prisma/client");
const excludeFieldsFromPrismaReturn_1 = require("../../utils/db/excludeFieldsFromPrismaReturn");
const bcrypt = __importStar(require("bcrypt"));
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt.hash(user.password, 10);
    const userDataToCreate = Object.assign(Object.assign({}, user), { role: client_1.Role.USER, password: hashedPassword });
    const createdUser = yield prisma_db_1.db.user.create({ data: userDataToCreate });
    const createdUserWithoutPassword = (0, excludeFieldsFromPrismaReturn_1.excludeFields)(createdUser, [
        "password",
        "isSuspended",
        "lastFailedLoggedDate",
        "lastSuccessfulLoggedDate",
        "role",
    ]);
    return createdUserWithoutPassword;
});
exports.createNewUser = createNewUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_db_1.db.user.findUnique({
        where: { email },
        select: { password: true, role: true },
    });
    return result;
});
exports.getUserByEmail = getUserByEmail;
const insertLastFailedAuthAttempt = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_db_1.db.user.update({
        where: { email: userEmail },
        data: { lastFailedLoggedDate: new Date() },
    });
});
exports.insertLastFailedAuthAttempt = insertLastFailedAuthAttempt;
const insertSuccessAuthAttempt = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_db_1.db.user.update({
        where: { email: userEmail },
        data: { lastSuccessfulLoggedDate: new Date() },
    });
});
exports.insertSuccessAuthAttempt = insertSuccessAuthAttempt;
//# sourceMappingURL=user.service.js.map