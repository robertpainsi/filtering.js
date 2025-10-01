import { Filter, Schema } from './schema';
import { Result } from './result';
import { EventCallback, EventSubscribable } from './eventemitter';
export declare class Filtering implements EventSubscribable {
    #private;
    constructor(data: Schema);
    get schema(): Schema;
    filter(filterData: FilterData): Result;
    addEventListener(eventName: string, callback: EventCallback, priority?: number): () => void;
}
export declare class FilterData {
    #private;
    get checkedFilters(): Map<string, Set<string>>;
    checkFilter(filter: Filter): void;
    checkFilter(groupName: string, filterName?: string): void;
    disableGroup(groupName: string): void;
    clone(): FilterData;
}
