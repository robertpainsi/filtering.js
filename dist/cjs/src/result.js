"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterResult = exports.GroupResult = exports.Result = void 0;
class Result {
    #schema;
    #groups = new Map();
    constructor(schema) {
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
    get schema() {
        return this.#schema;
    }
    get groups() {
        return [...this.#groups.values()];
    }
    get groupNames() {
        return [...this.#groups.keys()];
    }
    #addGroup(groupResult) {
        this.#groups.set(groupResult.schemaGroup.name, groupResult);
    }
    getGroup(groupName) {
        return this.#groups.get(groupName);
    }
    get filteredItems() {
        const result = new Set();
        for (const groupResult of this.groups) {
            for (const item of groupResult.filteredItems) {
                result.add(item);
            }
        }
        return [...result];
    }
    addFilteredItem(item) {
        for (const groupName of item.getGroupNames()) {
            const groupResult = this.#groups.get(groupName);
            groupResult.addFilteredItem(item);
        }
    }
    get allItems() {
        const result = new Set();
        for (const groupResult of this.groups) {
            for (const item of groupResult.allItems) {
                result.add(item);
            }
        }
        return [...result];
    }
    addAllItem(item) {
        for (const groupName of item.getGroupNames()) {
            const groupResult = this.#groups.get(groupName);
            groupResult.addAllItem(item);
        }
    }
}
exports.Result = Result;
class GroupResult {
    #schemaGroup;
    #filters = new Map();
    constructor(schemaGroup) {
        this.#schemaGroup = schemaGroup;
    }
    get schemaGroup() {
        return this.#schemaGroup;
    }
    get filters() {
        return [...this.#filters.values()];
    }
    addFilter(filterResult) {
        this.#filters.set(filterResult.schemaFilter.name, filterResult);
    }
    getFilter(filterName) {
        return this.#filters.get(filterName);
    }
    get filteredItems() {
        const result = new Set();
        for (const filterResult of this.filters) {
            for (const item of filterResult.filteredItems) {
                result.add(item);
            }
        }
        return [...result];
    }
    addFilteredItem(item) {
        for (const filterName of item.getFilterNames(this.schemaGroup.name)) {
            this.#filters.get(filterName)?.addFilteredItem(item);
        }
    }
    get allItems() {
        const result = new Set();
        for (const filterResult of this.filters) {
            for (const item of filterResult.allItems) {
                result.add(item);
            }
        }
        return [...result];
    }
    addAllItem(item) {
        for (const filterName of item.getFilterNames(this.schemaGroup.name)) {
            this.#filters.get(filterName)?.addAllItem(item);
        }
    }
}
exports.GroupResult = GroupResult;
class FilterResult {
    #schemaFilter;
    #filteredItems = new Set();
    #possibleItems = new Set();
    #allItems = new Set();
    constructor(schemaFilter) {
        this.#schemaFilter = schemaFilter;
    }
    get schemaFilter() {
        return this.#schemaFilter;
    }
    get filteredItems() {
        return [...this.#filteredItems];
    }
    addFilteredItem(item) {
        this.#filteredItems.add(item);
        this.addPossibleItem(item);
        this.addAllItem(item);
    }
    get possibleItems() {
        return [...this.#possibleItems];
    }
    addPossibleItem(item) {
        this.#possibleItems.add(item);
        this.addAllItem(item);
    }
    get allItems() {
        return [...this.#allItems];
    }
    addAllItem(item) {
        this.#allItems.add(item);
    }
}
exports.FilterResult = FilterResult;
