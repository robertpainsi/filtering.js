import {Pojo} from "./utils";

export class Schema {
    #groups: Map<string, Group> = new Map();
    #items: Item[] = [];
    #data?: Pojo;

    constructor(data?: Pojo) {
        this.#data = data;
    }

    get groups(): Group[] {
        return [...this.#groups.values()];
    }

    get items(): Item[] {
        return this.#items;
    }

    addGroup(group: Group) {
        if (this.#groups.has(group.name)) {
            throw new Error(`Group with name ${group.name} already added to schema. Group names have to be unique.`);
        }
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

    get data(): Pojo {
        return this.#data;
    }
}

export class Group {
    #name: string;
    #filters: Map<string, Filter> = new Map();
    #data?: Pojo;

    constructor(name: string, data?: Pojo) {
        this.#name = name;
        this.#data = data;
    }

    get name(): string {
        return this.#name;
    }

    get filters(): Filter[] {
        return [...this.#filters.values()];
    }

    addFilter(filter: Filter) {
        if (this.#filters.has(filter.name)) {
            throw new Error(`Filter with name ${filter.name} already in group ${this.name}. Filter names have to be unique in a Group.`);
        }
        this.#filters.set(filter.name, filter);
    }

    getFilterNames() {
        return new Set(this.#filters.keys());
    }

    get data(): Pojo {
        return this.#data;
    }
}

export class Filter {
    #name: string;
    #data?: Pojo;

    constructor(name: string, data?: Pojo) {
        this.#name = name;
        this.#data = data;
    }


    get name(): string {
        return this.#name;
    }

    get data(): Pojo {
        return this.#data;
    }
}

export class Item {
    #data?: Pojo;
    #groups = new Map<string, Set<string>>();

    constructor(data?: Pojo) {
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
    #checkedFilters: Map<string, Set<string | Symbol>> = new Map();

    get checkedFilters() {
        return this.#checkedFilters;
    }

    checkFilter(groupName: string, filterName: string | Symbol) {
        const filters = this.#getFiltersFromGroup(groupName);
        filters.add(filterName);
    }

    checkAllFilters(groupName: string) {
        const filters = this.#getFiltersFromGroup(groupName);
        filters.clear();
    }

    #getFiltersFromGroup(groupName: string) {
        if (!this.#checkedFilters.has(groupName)) {
            this.#checkedFilters.set(groupName, new Set());
        }
        return this.#checkedFilters.get(groupName);
    }

    disableGroup(groupName: string) {
        this.#checkedFilters.delete(groupName);
    }

    clone() {
        const filterData = new FilterData();
        for (const [groupName, filterNames] of this.#checkedFilters.entries()) {
            for (const filterName of filterNames) {
                filterData.checkFilter(groupName, filterName);
            }
        }
        return filterData;
    }
}
