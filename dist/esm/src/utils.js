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
