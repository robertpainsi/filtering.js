import {Filter, Group, Item, Schema} from "./schema";

export class Result {
    readonly #schema: Schema;
    readonly #groups = new Map<string, GroupResult>();

    #filteredItems = new Set<Item>();
    #allItems = new Set<Item>();

    constructor(schema: Schema) {
        this.#schema = schema;
    }

    get schema(): Schema {
        return this.#schema;
    }

    get groups(): GroupResult[] {
        return [...this.#groups.values()];
    }

    get groupNames(): string[] {
        return [...this.#groups.keys()];
    }

    addGroup(groupResult: GroupResult) {
        this.#groups.set(groupResult.schemaGroup.name, groupResult);
    }

    getGroup(groupName: string) {
        return this.#groups.get(groupName);
    }

    get filteredItems() {
        return [...this.#filteredItems];
    }

    addFilteredItem(item: Item) {
        this.#filteredItems.add(item);
        for (const groupName of item.getGroupNames()) {
            const groupResult = this.#groups.get(groupName);
            groupResult.addFilteredItem(item);
        }
    }

    get allItems() {
        return [...this.#allItems];
    }

    addAllItem(item: Item) {
        this.#allItems.add(item);
        for (const groupName of item.getGroupNames()) {
            const groupResult = this.#groups.get(groupName);
            groupResult.addAllItem(item);
        }
    }
}

export class GroupResult {
    readonly #schemaGroup: Group;

    #filters = new Map<string, FilterResult>();

    #filteredItems = new Set<Item>();
    #allItems = new Set<Item>();

    constructor(schemaGroup: Group) {
        this.#schemaGroup = schemaGroup;
    }

    get schemaGroup(): Group {
        return this.#schemaGroup;
    }

    get filters(): FilterResult[] {
        return [...this.#filters.values()];
    }

    addFilter(filterResult: FilterResult) {
        this.#filters.set(filterResult.schemaFilter.name, filterResult);
    }

    getFilter(filterName: string) {
        return this.#filters.get(filterName);
    }

    addFilteredItem(item: Item) {
        this.#filteredItems.add(item);
        for (const filterName of item.getFilterNames(this.schemaGroup.name)) {
            const filterResult = this.#filters.get(filterName);
            filterResult.addFilteredItem(item);
        }
    }

    addAllItem(item: Item) {
        this.#allItems.add(item);
        for (const filterName of item.getFilterNames(this.schemaGroup.name)) {
            const filterResult = this.#filters.get(filterName);
            filterResult.addAllItem(item);
        }
    }
}

export class FilterResult {
    readonly #schemaFilter: Filter;

    #filteredItems = new Set<Item>();
    #possibleItems = new Set<Item>();
    #allItems = new Set<Item>();

    constructor(schemaFilter: Filter) {
        this.#schemaFilter = schemaFilter;
    }

    get schemaFilter() {
        return this.#schemaFilter;
    }

    get filteredItems() {
        return [...this.#filteredItems];
    }

    addFilteredItem(item: Item) {
        this.#filteredItems.add(item);
    }

    get possibleItems() {
        return [...this.#possibleItems];
    }

    addPossibleItem(item: Item) {
        this.#possibleItems.add(item);
    }

    get allItems() {
        return [...this.#allItems];
    }

    addAllItem(item: Item) {
        this.#allItems.add(item);
    }
}
