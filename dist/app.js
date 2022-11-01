"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const start = () => {
    try {
        app.listen(3000, () => {
            console.log(`App listening on port ${3000}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=app.js.map