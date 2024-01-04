"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorder = exports.getTagName = exports.findOne = void 0;
function findOne(haystack, values) {
    const [smallerSet, largerSet] = haystack.size <= values.size ? [haystack, values] : [values, haystack];
    for (const v of smallerSet) {
        if (largerSet.has(v)) {
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
    return orderBy.filter((by) => items.has(by));
}
exports.reorder = reorder;
