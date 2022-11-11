"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeFields = void 0;
function excludeFields(type, ...keys) {
    for (let key of keys) {
        delete type[key];
    }
    return type;
}
exports.excludeFields = excludeFields;
//# sourceMappingURL=excludeFields.js.map