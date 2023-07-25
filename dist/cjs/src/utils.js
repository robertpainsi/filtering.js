"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorder = exports.getTagName = exports.findOne = void 0;
function findOne(haystack, values) {
    for (const v of values) {
        if (haystack.has(v)) {
            return true;
        }
    }
    return false;
}
exports.findOne = findOne;
function getTagName(element) {
    return element.tagName.toLowerCase();
}
exports.getTagName = getTagName;
function reorder(items, orderBy) {
    const intersection = [];
    for (const item of orderBy) {
        if (items.has(item)) {
            intersection.push(item);
        }
    }
    return intersection;
}
exports.reorder = reorder;
