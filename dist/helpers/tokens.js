"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const generateId = () => {
    return Date.now().toString(32) + Math.random().toString(36).substring(2);
};
exports.generateId = generateId;
//# sourceMappingURL=tokens.js.map