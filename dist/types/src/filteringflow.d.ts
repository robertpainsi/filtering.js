import { EventCallback, EventSubscribable } from './eventemitter';
import { Schema } from './schema';
import { Parser } from './parser';
import { FilterData, Filtering } from './filtering';
import { Result } from './result';
export declare class FilteringFlow implements EventSubscribable {
    #private;
    static readonly defaultOptions: FilteringFlowOptions;
    constructor(root: HTMLElement, options?: FilteringFlowOptions);
    get options(): FilteringFlowOptions;
    get root(): HTMLElement;
    get schema(): Schema;
    get parser(): Parser;
    get filtering(): Filtering;
    initializeParser(): Parser;
    get parserOptions(): any;
    initializeSchema(): Schema;
    initializeFiltering(): Filtering;
    initializeFilterListener(): void;
    filter(filterData?: FilterData): Result;
    destroy(): void;
    addEventListener(eventName: string, callback: EventCallback, priority?: number): () => void;
}
interface FilteringFlowOptions {
    disabledFilterClass?: string;
    filteredItemClass?: string;
}
export {};
