import { Pojo } from './utils';
export declare class Schema {
    #private;
    constructor(data?: Pojo);
    get groups(): Group[];
    getGroup(name: string): Group;
    addGroup(group: Group): void;
    get items(): Item[];
    addItem(item: Item): void;
    addItems(items: Iterable<Item>): void;
    get data(): Pojo;
}
export declare class Group {
    #private;
    constructor(name: string, data?: Pojo);
    get name(): string;
    get schema(): Schema;
    set schema(schema: Schema);
    get filters(): Filter[];
    getFilter(name: string): Filter;
    addFilter(filter: Filter): void;
    getFilterNames(): string[];
    get data(): Pojo;
}
export declare class Filter {
    #private;
    constructor(name: string, data?: Pojo);
    get name(): string;
    get group(): Group;
    set group(group: Group);
    get data(): Pojo;
}
export declare class Item {
    #private;
    constructor(data?: Pojo);
    get data(): Pojo;
    getGroupNames(): Set<string>;
    addFilter(filter: Filter): void;
    addFilter(groupName: string | Filter, filterName: string): void;
    getFilterNames(groupName: string): Set<string>;
}
