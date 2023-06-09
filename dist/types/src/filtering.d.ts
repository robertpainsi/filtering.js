import { Item, Schema } from './schema';
import { Result } from './result';
export declare class Filtering {
    #private;
    constructor(data: Schema, options?: FilteringOptions);
    get schema(): Schema;
    get options(): FilteringOptions;
    filter(filterData: FilterData): Result;
}
export interface FilteringOptions {
    filterItem?(item: Item, schema: Schema, filterData: FilterData): boolean;
}
export declare class FilterData {
    #private;
    get checkedFilters(): Map<string, Set<string>>;
    checkFilter(groupName: string, filterName: string): void;
    disableGroup(groupName: string): void;
    clone(): FilterData;
}
