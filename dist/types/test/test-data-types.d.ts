/// <reference types="react" />
import { ParserOptions } from "../src/parser";
import { FilteringOptions } from "../src/filtering";
export interface TestDataTest {
    name: string;
}
export interface TestDataFiltering extends TestDataTest {
    schema: TestDataSchema;
    checked: TestDataGroups;
    filteredItems?: string[];
    possibleItems?: TestDataPossibleItems;
    allItems?: string[];
    options?: FilteringOptions;
}
export interface TestDataParserWithHtml extends TestDataTest {
    html: JSX.Element;
    schema: TestDataSchema;
    options?: ParserOptions;
}
export interface TestDataSchema {
    groups?: TestDataGroups;
    items?: TestDataItem[];
}
export interface TestDataGroups {
    [group: string]: TestDataFilters;
}
export type TestDataFilters = string[];
export interface TestDataItem {
    name: string;
    groups: TestDataGroups;
}
export interface TestDataPossibleItems {
    [group: string]: {
        [filter: string]: string[];
    };
}
