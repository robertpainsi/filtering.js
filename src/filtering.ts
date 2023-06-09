import {Item, Schema} from './schema';
import {Result} from './result';
import {findOne} from './utils';

export class Filtering {

    readonly #schema: Schema;
    readonly #options: FilteringOptions;

    constructor(data: Schema, options: FilteringOptions = {}) {
        this.#schema = data;
        this.#options = options;
    }

    get schema(): Schema {
        return this.#schema;
    }

    get options(): FilteringOptions {
        return this.#options;
    }

    filter(filterData: FilterData): Result {
        const result = new Result(this.#schema);

        let relevantItems: Item[] = [];
        if (this.#options.filterItem) {
            for (const item of this.#schema.items) {
                if (this.#options.filterItem(item, this.#schema, filterData)) {
                    relevantItems.push(item);
                }
            }
        } else {
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

    #calculatePossibleItems(result: Result, items: Item[], filterData: FilterData) {
        for (const groupName of result.groupNames) {
            const possibleFilterData = filterData.clone();
            possibleFilterData.disableGroup(groupName);

            const filteredItems = this.#getFilterItems(items, possibleFilterData);
            for (const filteredItem of filteredItems) {
                for (const filteredItemFilterName of filteredItem.getFilterNames(groupName)) {
                    result.getGroup(groupName).getFilter(filteredItemFilterName).addPossibleItem(filteredItem);
                }
            }
        }
    }

    #getFilterItems(items: Item[], filterData: FilterData) {
        const result = new Set<Item>();

        for (const item of items) {
            let filtered = true;

            for (const [groupName, checkedFilters] of filterData.checkedFilters) {
                if (checkedFilters.size > 0 && !findOne(item.getFilterNames(groupName), checkedFilters)) {
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

export interface FilteringOptions {
    filterItem?(item: Item, schema: Schema, filterData: FilterData): boolean,
}

export class FilterData {
    #checkedFilters: Map<string, Set<string>> = new Map();
    #disabledGroups: Set<string> = new Set();

    get checkedFilters() {
        return this.#checkedFilters;
    }

    checkFilter(groupName: string, filterName: string): void {
        if (this.#disabledGroups.has(groupName)) {
            return;
        }
        const filters = this.#getFiltersFromGroup(groupName);
        filters.add(filterName);
    }

    #getFiltersFromGroup(groupName: string): Set<string> {
        if (!this.#checkedFilters.has(groupName)) {
            this.#checkedFilters.set(groupName, new Set());
        }
        return this.#checkedFilters.get(groupName);
    }

    disableGroup(groupName: string): void {
        this.#disabledGroups.add(groupName);
        this.#checkedFilters.delete(groupName);
    }

    clone(): FilterData {
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
