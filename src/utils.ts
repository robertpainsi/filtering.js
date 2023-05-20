export interface Pojo {
    [key: string]: any;
}

export function findOne<Type>(haystack: Set<Type>, values: Set<Type>) {
    for (const v of values) {
        if (haystack.has(v)) {
            return true;
        }
    }
    return false;
}

export function mapProperty(object: any, propertyName: string): any {
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
