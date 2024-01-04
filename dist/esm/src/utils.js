export function findOne(haystack, values) {
    const [smallerSet, largerSet] = haystack.size <= values.size ? [haystack, values] : [values, haystack];
    for (const v of smallerSet) {
        if (largerSet.has(v)) {
            return true;
        }
    }
    return false;
}
export function getTagName(element) {
    return element.tagName.toLowerCase();
}
export function reorder(items, orderBy) {
    return orderBy.filter((by) => items.has(by));
}
