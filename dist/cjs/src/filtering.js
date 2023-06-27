"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterData = exports.Filtering = void 0;
const schema_1 = require("./schema");
const result_1 = require("./result");
const utils_1 = require("./utils");
class Filtering {
    #schema;
    #options;
    constructor(data, options = {}) {
        this.#schema = data;
        this.#options = options;
    }
    get schema() {
        return this.#schema;
    }
    get options() {
        return this.#options;
    }
    filter(filterData) {
        const result = new result_1.Result(this.#schema);
        let relevantItems = [];
        if (this.#options.filterItem) {
            for (const item of this.#schema.items) {
                if (this.#options.filterItem(item, this.#schema, filterData)) {
                    relevantItems.push(item);
                }
            }
        }
        else {
            relevantItems = [...this.#schema.items];
        }
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
