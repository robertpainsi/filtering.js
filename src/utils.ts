export interface Pojo {
    [key: string]: any;
}

export function findOne<Type>(haystack: Set<Type>, values: Set<Type>) {
    const [smallerSet, largerSet] = haystack.size <= values.size ? [haystack, values] : [values, haystack];
    for (const v of smallerSet) {
        if (largerSet.has(v)) {
            return true;
        }
    }
    return false;
}

export function getTagName(element: HTMLElement): string {
    return element.tagName.toLowerCase();
}

export function reorder<T>(items: Set<T>, orderBy: T[]): T[] {
    return orderBy.filter((by) => items.has(by));
}
