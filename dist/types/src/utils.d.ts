export interface Pojo {
    [key: string]: any;
}
export declare function findOne<Type>(haystack: Set<Type>, values: Set<Type>): boolean;
export declare function getTagName(element: HTMLElement): string;
export declare function reorder<T>(items: Set<T>, orderBy: T[]): T[];
