"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterData = exports.Filtering = void 0;
const schema_1 = require("./schema");
const result_1 = require("./result");
const utils_1 = require("./utils");
const eventemitter_1 = require("./eventemitter");
class Filtering {
    #schema;
    #eventEmitter = new eventemitter_1.EventEmitter();
    constructor(data) {
        this.#schema = data;
    }
    get schema() {
        return this.#schema;
    }
    filter(filterData) {
        const result = new result_1.Result(this.#schema);
        const relevantItems = this.#schema.items.filter((item) => {
            const results = this.#eventEmitter.emit('filter-item', { source: this, data: { item, filterData, schema: this.#schema } });
            return results.length === 0 || results.every(utils_1.toBooly);
        });
        for (const item of relevantItems) {
            result.addAllItem(item);
        }
        for (const item of this.#getFilterItems(relevantItems, filterData)) {
            result.addFilteredItem(item);
        }
        this.#calculatePossibleItems(result, relevantItems, filterData);
        return result;
    }
    #calculatePossibleItems(result, items, filterData) {
        for (const groupName of result.groupNames) {
            const possibleFilterData = filterData.clone();
            possibleFilterData.disableGroup(groupName);
            const filteredItems = this.#getFilterItems(items, possibleFilterData);
            for (const filteredItem of filteredItems) {
                for (const filteredItemFilterName of filteredItem.getFilterNames(groupName)) {
                    result.getGroup(groupName)?.getFilter(filteredItemFilterName)?.addPossibleItem(filteredItem);
                }
            }
        }
    }
    #getFilterItems(items, filterData) {
        const result = new Set();
        for (const item of items) {
            let filtered = true;
            for (const [groupName, checkedFilters] of filterData.checkedFilters) {
                if (checkedFilters.size > 0 && !(0, utils_1.findOne)(item.getFilterNames(groupName), checkedFilters)) {
                    filtered = false;
                    break;
                }
            }
            if (filtered) {
                result.add(item);
            }
        }
        return result;
    }
    addEventListener(eventName, callback, priority) {
        return this.#eventEmitter.addEventListener(eventName, callback, priority);
    }
}
exports.Filtering = Filtering;
class FilterData {
    #checkedFilters = new Map();
    #disabledGroups = new Set();
    get checkedFilters() {
        return this.#checkedFilters;
    }
    checkFilter(groupName, filterName) {
        if (groupName instanceof schema_1.Filter) {
            if (this.#disabledGroups.has(groupName.group.name)) {
                return;
            }
            const filters = this.#getFiltersFromGroup(groupName.group.name);
            filters.add(groupName.name);
        }
        else if (typeof groupName === 'string' && typeof filterName === 'string') {
            if (this.#disabledGroups.has(groupName)) {
                return;
            }
            const filters = this.#getFiltersFromGroup(groupName);
            filters.add(filterName);
        }
    }
    #getFiltersFromGroup(groupName) {
        if (!this.#checkedFilters.has(groupName)) {
            this.#checkedFilters.set(groupName, new Set());
        }
        return this.#checkedFilters.get(groupName);
    }
    disableGroup(groupName) {
        this.#disabledGroups.add(groupName);
        this.#checkedFilters.delete(groupName);
    }
    clone() {
        const filterData = new FilterData();
        for (const [groupName, filterNames] of this.#checkedFilters.entries()) {
            for (const filterName of filterNames) {
                filterData.checkFilter(groupName, filterName);
            }
        }
        for (const groupName of this.#disabledGroups) {
            filterData.disableGroup(groupName);
        }
        return filterData;
    }
}
exports.FilterData = FilterData;
