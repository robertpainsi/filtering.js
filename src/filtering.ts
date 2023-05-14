import {ENABLE_ALL_FILTER, FilterData, Item, Schema} from "./schema";
import {FilterResult, GroupResult, Result} from "./result";
import {findOne} from "./utils";

export class Filtering {

    private readonly schema: Schema;
    private readonly options: FilteringOptions;

    constructor(data: Schema, options = {}) {
        this.schema = data;
        this.options = options;
    }

    filter(filterData: FilterData): Promise<Result> {
        return new Promise((resolve, reject) => {
            const result = this.createEmptyResult(this.schema);

            for (const item of this.schema.items) {
                result.addAllItem(item);
            }
            for (const item of this.getFilterItems(this.schema.items, filterData)) {
                result.addFilteredItem(item);
            }
            this.calculatePossibleItems(result, this.schema.items, filterData);

            resolve(result);
        });
    }

    private createEmptyResult(schema: Schema) {
        const result = new Result();
        for (const group of schema.groups) {
            const groupResult = new GroupResult(group.name, group.type);
            for (const filter of group.filters) {
                const filterResult = new FilterResult(filter.name, filter.type);
                groupResult.addFilter(filterResult);
            }
            result.addGroup(groupResult);
        }
        return result;
    }

    private calculatePossibleItems(result: Result, items: Item[], filterData: FilterData) {
        for (const groupName of result.groupNames) {
            const possibleFilterData = filterData.clone();
            possibleFilterData.disableGroup(groupName);

            const filteredItems = this.getFilterItems(items, possibleFilterData);
            for (const filteredItem of filteredItems) {
                for (const filteredItemFilterName of filteredItem.getFilterNames(groupName)) {
                    result.getGroup(groupName).getFilter(filteredItemFilterName).addPossibleItem(filteredItem);
                }
            }
        }
    }

    private getFilterItems(items: Item[], filterData: FilterData) {
        const result = new Set<Item>();

        for (const item of items) {
            let filtered = true;

            for (const [groupName, checkedFilters] of filterData.enabledFilters) {
                if (!checkedFilters.has(ENABLE_ALL_FILTER)) {
                    if (checkedFilters.size > 0 && !findOne(item.getFilterNames(groupName), checkedFilters)) {
                        filtered = false;
                        break;
                    }
                }
            }

            if (filtered) {
                result.add(item);
            }
        }

        return result;
    }
}

interface FilteringOptions {
}
