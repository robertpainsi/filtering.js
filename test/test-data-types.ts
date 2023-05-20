export interface TestData extends TestDataTest {
    schema: TestDataSchema,
}

export interface TestDataTest {
    name: string,
    checked: TestDataGroups,
    filteredItems?: string[],
    possibleItems?: string[],
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
