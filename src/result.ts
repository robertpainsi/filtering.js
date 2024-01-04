import {Filter, Group, Item, Schema} from './schema';
import {reorder} from './utils';

export class Result {
    readonly #schema: Schema;
    readonly #groups = new Map<string, GroupResult>();

    readonly #filteredItems = new Set<Item>();
    readonly #allItems = new Set<Item>();

    constructor(schema: Schema) {
        this.#schema = schema;

        this.#initialize();
    }

    #initialize() {
        for (const group of this.schema.groups) {
            const groupResult = new GroupResult(group);
            for (const filter of group.filters) {
                const filterResult = new FilterResult(filter);
                groupResult.addFilter(filterResult);
            }
            this.#addGroup(groupResult);
        }
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

    #addGroup(groupResult: GroupResult) {
        this.#groups.set(groupResult.schemaGroup.name, groupResult);
    }

    getGroup(groupName: string) {
        return this.#groups.get(groupName);
    }

    get filteredItems(): Item[] {
        const result = new Set<Item>();
        for (const groupResult of this.groups) {
            for (const item of groupResult.filteredItems) {
                result.add(item);
            }
        }
        for (const item of this.#filteredItems) {
            result.add(item);
        }
        return reorder(result, this.schema.items);
    }

    addFilteredItem(item: Item) {
        this.#filteredItems.add(item);
        for (const groupName of item.getGroupNames()) {
            const groupResult = this.#groups.get(groupName);
            groupResult?.addFilteredItem(item);
        }
    }

    get allItems() {
        const result = new Set<Item>();
        for (const groupResult of this.groups) {
            for (const item of groupResult.allItems) {
                result.add(item);
            }
        }
        for (const item of this.#allItems) {
            result.add(item);
        }
        return reorder(result, this.schema.items);
    }

    addAllItem(item: Item) {
        this.#allItems.add(item);
        for (const groupName of item.getGroupNames()) {
            const groupResult = this.#groups.get(groupName);
            groupResult?.addAllItem(item);
        }
    }
}

export class GroupResult {
    readonly #schemaGroup: Group;

    readonly #filteredItems = new Set<Item>();
    readonly #allItems = new Set<Item>();

    readonly #filters = new Map<string, FilterResult>();

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

    get filteredItems(): Item[] {
        const result = new Set<Item>();
        for (const filterResult of this.filters) {
            for (const item of filterResult.filteredItems) {
                result.add(item);
            }
        }
        for (const item of this.#filteredItems) {
            result.add(item);
        }
        return reorder(result, this.schemaGroup.schema.items);
    }

    addFilteredItem(item: Item) {
        this.#filteredItems.add(item);
        for (const filterName of item.getFilterNames(this.schemaGroup.name)) {
            this.#filters.get(filterName)?.addFilteredItem(item);
        }
    }

    get allItems(): Item[] {
        const result = new Set<Item>();
        for (const filterResult of this.filters) {
            for (const item of filterResult.allItems) {
                result.add(item);
            }
        }
        for (const item of this.#allItems) {
            result.add(item);
        }
        return reorder(result, this.schemaGroup.schema.items);
    }

    addAllItem(item: Item) {
        this.#allItems.add(item);
        for (const filterName of item.getFilterNames(this.schemaGroup.name)) {
            this.#filters.get(filterName)?.addAllItem(item);
        }
    }
}

export class FilterResult {
    readonly #schemaFilter: Filter;

    readonly #filteredItems = new Set<Item>();
    readonly #possibleItems = new Set<Item>();
    readonly #allItems = new Set<Item>();

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
        this.addPossibleItem(item);
        this.addAllItem(item);
    }

    get possibleItems() {
        return [...this.#possibleItems];
    }

    addPossibleItem(item: Item) {
        this.#possibleItems.add(item);
        this.addAllItem(item);
    }

    get allItems() {
        return [...this.#allItems];
    }

    addAllItem(item: Item) {
        this.#allItems.add(item);
    }
}
