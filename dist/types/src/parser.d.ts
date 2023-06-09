import { Group, Item, Schema } from './schema';
import { FilterData } from './filtering';
export interface ParserOptions {
    groupClass?: string;
    filterClass?: string;
    itemClass?: string;
    itemFilterNameAttributePrefix?: string;
    filterCheckedClass?: string;
}
export declare class Parser {
    #private;
    constructor(options?: ParserOptions);
    get options(): ParserOptions;
    parseSchemaFromHtml(root: HTMLElement, schema?: Schema): Schema;
    parseGroupsAndFiltersFromHtml(root: HTMLElement, schema?: Schema): Group[];
    parseItemsFromHtml(root: HTMLElement, schema?: Schema): Item[];
    parseCheckedFilterDataFromHtml(root: HTMLElement): FilterData;
}
