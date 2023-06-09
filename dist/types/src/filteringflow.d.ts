import { Schema } from './schema';
import { Parser, ParserOptions } from './parser';
import { Filtering } from './filtering';
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
    initializeParser(parserOptions?: ParserOptions): Parser;
    initializeSchema(): Schema;
    initializeFiltering(): Filtering;
    initializeFilterListener(): void;
    beforeFilter(filterElement: HTMLElement): boolean;
    filter(): void;
    handleFilterResult(result: Result): void;
}
interface FilteringFlowOptions {
    disabledFilterClass?: string;
    filteredItemClass?: string;
    triggerFilterAfterInitializing?: boolean;
}
export {};
