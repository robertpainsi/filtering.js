export interface TestDataTest {
    name: string,
}

export interface TestDataFiltering extends TestDataTest {
    schema: TestDataSchema,
    checked: TestDataGroups,
    filteredItems?: string[],
    possibleItems?: string[],
}

export interface TestDataParserWithHtml extends TestDataTest {
    html: JSX.Element,
    schema: TestDataSchema,
}

export interface TestDataSchema {
    groups: TestDataGroups,
    items: TestDataItem[],
}

export interface TestDataGroups {
    [key: string]: TestDataFilters;
}

export type TestDataFilters = string[];

export interface TestDataItem {
    name: string,
    groups: TestDataGroups,
}
