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

export function emptyFn() {
}

export function trueFn() {
    return true;
}
