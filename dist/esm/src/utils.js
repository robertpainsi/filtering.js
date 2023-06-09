export function findOne(haystack, values) {
    for (const v of values) {
        if (haystack.has(v)) {
            return true;
        }
    }
    return false;
}
export function getProperty(object, propertyName) {
    const parts = propertyName.split('.');
    let result = object;
    for (const part of parts) {
        if (result === undefined) {
            return undefined;
        }
        result = result[part];
    }
    return result;
}
