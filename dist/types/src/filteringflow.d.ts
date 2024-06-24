import { Schema } from './schema';
import { Parser } from './parser';
import { FilterData, Filtering } from './filtering';
import { Result } from './result';
export declare class FilteringFlow {
    #private;
    static readonly defaultOptions: FilteringFlowOptions;
    constructor(root: HTMLElement, options?: FilteringFlowOptions);
    get options(): FilteringFlowOptions;
    get root(): HTMLElement;
    get schema(): Schema;
    get parser(): Parser;
    get filtering(): Filtering;
    beforeInitializing(): void;
    initializeParser(): Parser;
    get parserOptions(): any;
    initializeSchema(): Schema;
    initializeFiltering(): Filtering;
    get filteringOptions(): any;
    initializeFilterListener(): void;
    afterInitializing(): void;
    beforeFilter(filterElement: HTMLElement): boolean;
    filter(filterData?: FilterData): Result;
    handleFilterResult(result: Result, filterData?: FilterData): void;
    destroy(): void;
}
interface FilteringFlowOptions {
    disabledFilterClass?: string;
    filteredItemClass?: string;
    triggerFilterAfterInitializing?: boolean;
}
export {};
