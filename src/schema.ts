import {Pojo} from './utils';

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

    getGroup(name: string): Group {
        return this.#groups.get(name);
    }

    addGroup(group: Group) {
        if (this.#groups.has(group.name)) {
            throw new Error(`Group with name ${group.name} already added to schema. Group names have to be unique.`);
        }
        this.#groups.set(group.name, group);
        group.schema = this;
    }

    get items(): Item[] {
        return this.#items;
    }

    addItem(item: Item) {
        this.#items.push(item);
    }

    addItems(items: Iterable<Item>) {
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
    #schema: Schema;
    #filters: Map<string, Filter> = new Map();
    #data?: Pojo;

    constructor(name: string, data?: Pojo) {
        this.#name = name;
        this.#data = data;
    }

    get name(): string {
        return this.#name;
    }

    get schema(): Schema {
        return this.#schema;
    }

    set schema(schema) {
        this.#schema = schema;
    }

    get filters(): Filter[] {
        return [...this.#filters.values()];
    }

    getFilter(name: string) {
        return this.#filters.get(name);
    }

    addFilter(filter: Filter) {
        if (this.#filters.has(filter.name)) {
            throw new Error(`Filter with name ${filter.name} already in group ${this.name}. Filter names have to be unique in a Group.`);
        }
        this.#filters.set(filter.name, filter);
        filter.group = this;
    }

    getFilterNames(): string[] {
        return [...this.#filters.keys()];
    }

    get data(): Pojo {
        return this.#data;
    }
}

export class Filter {
    #name: string;
    #group: Group;
    #data?: Pojo;

    constructor(name: string, data?: Pojo) {
        this.#name = name;
        this.#data = data;
    }


    get name(): string {
        return this.#name;
    }

    get group(): Group {
        return this.#group;
    }

    set group(group) {
        this.#group = group;
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

    addFilter(filter: Filter): void;
    addFilter(groupName: string | Filter, filterName: string): void;

    addFilter(groupName: unknown, filterName?: unknown) {
        if (groupName instanceof Filter) {
            const filters = this.#getFiltersFromGroup(groupName.group.name);
            filters.add(groupName.name);
        } else if (typeof groupName === 'string' && typeof filterName === 'string') {
            const filters = this.#getFiltersFromGroup(groupName);
            filters.add(filterName);
        }
    }

    #getFiltersFromGroup(groupName: string) {
        if (!this.#groups.has(groupName)) {
            this.#groups.set(groupName, new Set());
        }
        return this.#groups.get(groupName);
    }

    getFilterNames(groupName: string): Set<string> {
        if (this.#groups.has(groupName)) {
            return this.#groups.get(groupName);
        } else {
            return new Set();
        }
    }
}

