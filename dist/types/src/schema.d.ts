import { Pojo } from './utils';
export declare class Schema {
    #private;
    constructor(data?: Pojo);
    get groups(): Group[];
    get items(): Item[];
    addGroup(group: Group): void;
    addItem(item: Item): void;
    addItems(items: Iterable<Item>): void;
    get data(): Pojo;
}
export declare class Group {
    #private;
    constructor(name: string, data?: Pojo);
    get name(): string;
    get filters(): Filter[];
    addFilter(filter: Filter): void;
    getFilterNames(): string[];
    get data(): Pojo;
}
export declare class Filter {
    #private;
    constructor(name: string, data?: Pojo);
    get name(): string;
    get data(): Pojo;
}
export declare class Item {
    #private;
    constructor(data?: Pojo);
    get data(): Pojo;
    getGroupNames(): Set<string>;
    addFilter(groupName: string, filterName: string): void;
    getFilterNames(groupName: string): Set<string>;
}
