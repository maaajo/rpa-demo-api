"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.default = CustomException;
//# sourceMappingURL=http.exception.js.map