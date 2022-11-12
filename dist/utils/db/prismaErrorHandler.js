"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaErrorMessage = void 0;
const client_1 = require("@prisma/client");
const getPrismaErrorMessage = (error) => {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            const errorFields = error.meta.target;
            return `This ${errorFields[0]} address is already taken.`;
        }
    }
    if (error instanceof client_1.Prisma.PrismaClientInitializationError) {
        return "";
    }
    if (error instanceof client_1.Prisma.PrismaClientRustPanicError) {
        return "";
    }
    if (error instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        return "";
    }
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        return "";
    }
    return "";
};
exports.getPrismaErrorMessage = getPrismaErrorMessage;
//# sourceMappingURL=prismaErrorHandler.js.map