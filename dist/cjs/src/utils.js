"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = void 0;
function findOne(haystack, values) {
    for (const v of values) {
        if (haystack.has(v)) {
            return true;
        }
    }
    return false;
}
exports.findOne = findOne;
