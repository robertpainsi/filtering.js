import {FilterType, GroupType, Item} from "./schema";

export class Result {
    #groups = new Map<string, GroupResult>();

    #filteredItems = new Set<Item>();
    #allItems = new Set<Item>();


    get groups(): GroupResult[] {
        return [...this.#groups.values()];
    }

    get groupNames(): string[] {
        return [...this.#groups.keys()];
    }

    addGroup(groupResult: GroupResult) {
        this.#groups.set(groupResult.name, groupResult);
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
    readonly #name: string;
    readonly #type: GroupType;

    #filters = new Map<string, FilterResult>();

    #filteredItems = new Set<Item>();
    #allItems = new Set<Item>();

    constructor(name: string, type: GroupType) {
        this.#name = name;
        this.#type = type;
    }

    get name(): string {
        return this.#name;
    }

    get type(): GroupType {
        return this.#type;
    }

    get filters(): FilterResult[] {
        return [...this.#filters.values()];
    }

    addFilter(filterResult: FilterResult) {
        this.#filters.set(filterResult.name, filterResult);
    }

    getFilter(filterName: string) {
        return this.#filters.get(filterName);
    }

    addFilteredItem(item: Item) {
        this.#filteredItems.add(item);
        for (const filterName of item.getFilterNames(this.#name)) {
            const filterResult = this.#filters.get(filterName);
            filterResult.addFilteredItem(item);
        }
    }

    addAllItem(item: Item) {
        this.#allItems.add(item);
        for (const filterName of item.getFilterNames(this.#name)) {
            const filterResult = this.#filters.get(filterName);
            filterResult.addAllItem(item);
        }
    }
}

export class FilterResult {
    readonly #name: string;
    readonly #type: FilterType;

    #filteredItems = new Set<Item>();
    #possibleItems = new Set<Item>();
    #allItems = new Set<Item>();

    constructor(name: string, type: FilterType) {
        this.#name = name;
        this.#type = type;
    }

    get name(): string {
        return this.#name;
    }

    get type(): FilterType {
        return this.#type;
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
