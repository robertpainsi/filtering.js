import {ParserOptions} from "../src/parser";
import {EventCallback} from '../src/eventemitter';

export interface TestDataTest {
    name: string,
}

export interface TestDataFiltering extends TestDataTest {
    schema: TestDataSchema,
    checked: TestDataGroups,
    filteredItems?: string[],
    possibleItems?: TestDataPossibleItems,
    allItems?: string[],
    eventListeners?: {eventName: string, callback: EventCallback}[],
}

export interface TestDataParserWithHtml extends TestDataTest {
    html: JSX.Element,
    schema: TestDataSchema,
    options?: ParserOptions,
}

export interface TestDataSchema {
    groups?: TestDataGroups,
    items?: TestDataItem[],
}

export interface TestDataGroups {
    [group: string]: TestDataFilters;
}

export type TestDataFilters = string[];

export interface TestDataItem {
    name: string,
    groups: TestDataGroups,
}

export interface TestDataPossibleItems {
    [group: string]: {
        [filter: string]: string[],
    }
}
