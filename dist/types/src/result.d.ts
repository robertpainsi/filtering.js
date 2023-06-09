import { Filter, Group, Item, Schema } from './schema';
export declare class Result {
    #private;
    constructor(schema: Schema);
    get schema(): Schema;
    get groups(): GroupResult[];
    get groupNames(): string[];
    getGroup(groupName: string): GroupResult;
    get filteredItems(): Item[];
    addFilteredItem(item: Item): void;
    get allItems(): Item[];
    addAllItem(item: Item): void;
}
export declare class GroupResult {
    #private;
    constructor(schemaGroup: Group);
    get schemaGroup(): Group;
    get filters(): FilterResult[];
    addFilter(filterResult: FilterResult): void;
    getFilter(filterName: string): FilterResult;
    get filteredItems(): Item[];
    addFilteredItem(item: Item): void;
    get allItems(): Item[];
    addAllItem(item: Item): void;
}
export declare class FilterResult {
    #private;
    constructor(schemaFilter: Filter);
    get schemaFilter(): Filter;
    get filteredItems(): Item[];
    addFilteredItem(item: Item): void;
    get possibleItems(): Item[];
    addPossibleItem(item: Item): void;
    get allItems(): Item[];
    addAllItem(item: Item): void;
}
