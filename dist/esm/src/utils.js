export function findOne(haystack, values) {
    for (const v of values) {
        if (haystack.has(v)) {
            return true;
        }
    }
    return false;
}
export function getTagName(element) {
    return element.tagName.toLowerCase();
}
export function reorder(items, orderBy) {
    const intersection = [];
    for (const item of orderBy) {
        if (items.has(item)) {
            intersection.push(item);
        }
    }
    return intersection;
}
