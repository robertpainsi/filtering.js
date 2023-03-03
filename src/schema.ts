import {Pojo} from "./utils";

export class Schema {
    #groups: Map<string, Group> = new Map();
    #items: Item[] = [];

    get groups(): Group[] {
        return [...this.#groups.values()];
    }

    get items(): Item[] {
        return this.#items;
    }

    addGroup(group: Group) {
        this.#groups.set(group.name, group);
    }

    addItem(item: Item) {
        this.#items.push(item);
    }

    addItems(items: Item[]) {
        for (const item of items) {
            this.addItem(item);
        }
    }
}

export class Group {
    #name: string;
    #label: string;
    #type: GroupType;
    #filters: Map<string, Filter> = new Map();

    constructor(name: string, label?: string, type: GroupType = GroupType.singleSelect) {
        this.#name = name;
        this.#label = label;
        this.#type = type;
    }

    get name(): string {
        return this.#name;
    }

    get label(): string {
        return this.#label;
    }

    get type(): GroupType {
        return this.#type;
    }

    get filters(): Filter[] {
        return [...this.#filters.values()];
    }

    addFilter(filter: Filter) {
        this.#filters.set(filter.name, filter);
    }

    getFilterNames() {
        return new Set(this.#filters.keys());
    }
}

export enum GroupType {
    singleSelect = '',
    multiSelect = 'multiSelect',
}

export class Filter {
    #name: string;
    #label: string;
    #type: FilterType;

    constructor(name: string, label?: string, type: FilterType = FilterType.single) {
        this.#name = name;
        this.#label = label;
        this.#type = type;
    }


    get name(): string {
        return this.#name;
    }

    get label(): string {
        return this.#label;
    }

    get type(): FilterType {
        return this.#type;
    }
}

export enum FilterType {
    single = '',
    all = 'all',
}

export class Item {
    #data?: Pojo;
    #groups = new Map<string, Set<string>>();

    constructor(data: Pojo) {
        this.#data = data;
    }

    get data(): Pojo {
        return this.#data;
    }

    getGroupNames(): Set<string> {
        return new Set(this.#groups.keys());
    }

    addFilter(groupName: string, filterName: string) {
        const filters = this.#getFiltersFromGroup(groupName);
        filters.add(filterName);
    }

    #getFiltersFromGroup(groupName: string) {
        if (!this.#groups.has(groupName)) {
            this.#groups.set(groupName, new Set());
        }
        return this.#groups.get(groupName);
    }

    getFilterNames(groupName: string): Set<string> {
        if (this.#groups.has(groupName)) {
            return new Set(this.#groups.get(groupName));
        } else {
            return new Set();
        }
    }
}

export class FilterData {
    #enabledFilter: Map<string, Set<string | Symbol>> = new Map();

    get enabledGroups() {
        return this.#enabledFilter.keys();
    }

    get enabledFilters() {
        return this.#enabledFilter;
    }

    enableFilter(groupName: string, filterName: string | Symbol) {
        const filters = this.#getFiltersFromGroup(groupName);

        if (filters.has(ENABLE_ALL_FILTER)) {
            return;
        }

        if (filterName === ENABLE_ALL_FILTER) {
            this.enableAllFilter(groupName);
        } else {
            filters.add(filterName);
        }
    }

    enableAllFilter(groupName: string) {
        const filters = this.#getFiltersFromGroup(groupName);
        filters.clear();
        filters.add(ENABLE_ALL_FILTER);
    }

    #getFiltersFromGroup(groupName: string) {
        if (!this.#enabledFilter.has(groupName)) {
            this.#enabledFilter.set(groupName, new Set());
        }
        return this.#enabledFilter.get(groupName);
    }

    enableGroup(groupName: string) {
        this.#enabledFilter.delete(groupName);
        this.enableAllFilter(groupName);
    }

    disableGroup(groupName: string) {
        this.#enabledFilter.delete(groupName);
    }

    clone() {
        const filterData = new FilterData();
        for (const [groupName, filterNames] of this.#enabledFilter.entries()) {
            for (const filterName of filterNames) {
                filterData.enableFilter(groupName, filterName);
            }
        }
        return filterData;
    }
}

export const ENABLE_ALL_FILTER = Symbol('Enable all filter');