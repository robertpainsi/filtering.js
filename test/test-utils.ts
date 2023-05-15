import {expect} from "@jest/globals";
import {ReactElement} from "react";

import './initialize-test-utils';

import {Filter, FilterData, Group, Item, Schema} from "../src/schema";
import {Filtering} from "../src/filtering";
import {JSDOM} from "jsdom";
import {renderToStaticMarkup} from "react-dom/server";

export interface TestData extends TestDataSchema {
    name: string,
    expected: {
        groups: TestDataGroups,
        items: string[],
        possibleItems: string[],
    }
}

interface TestDataSchema {
    groups: TestDataGroups,
    items: TestDataItem[],
}

interface TestDataGroups {
    [key: string]: string[];
}

interface TestDataItem {
    name: string,
    groups: TestDataGroups,
}

export async function testFiltering(data: TestData) {
    const schema = new Schema();
    for (const [group, filters] of Object.entries(data.groups)) {
        const schemaGroup = new Group(group);
        for (const filter of filters) {
            const schemaFilter = new Filter(filter);
            schemaGroup.addFilter(schemaFilter);
        }
        schema.addGroup(schemaGroup);
    }
    for (const item of data.items) {
        const schemaItem = new Item({name: item.name});
        for (const [groupName, filterNames] of Object.entries(item.groups)) {
            for (const filterName of filterNames) {
                schemaItem.addFilter(groupName, filterName);
            }
        }
        schema.addItem(schemaItem);
    }
    const filtering = new Filtering(schema);
    const filterData = new FilterData();
    for (const [group, filters] of Object.entries(data.expected.groups)) {
        for (const filter of filters) {
            filterData.enableFilter(group, filter);
        }
    }

    const actual = filtering.filter(filterData);

    const {expected} = data;
    const testCombinations = [];
    if (expected.items) {
        testCombinations.push({
            actual: actual.filteredItems,
            expected: expected.items,
        });
    }
    return;

    // TODO: Reimplement
    /*
    if (expected.possibleItems) {
        testCombinations.push({
            actual: actual.possible,
            expected: expected.possibleItems,
        });
    }
    for (const {actual: actualItems, expected: expectedItems} of testCombinations) {
        const filteredItemsNames = actualItems.map(({data}) => data.name);
        expect(filteredItemsNames.sort()).toEqual(expectedItems.sort());
        expect(filteredItemsNames.length).toBe(expectedItems.length);
        expect(filteredItemsNames.length).toBe(new Set(filteredItemsNames).size);
    }
     */
}

export function testSchema(schema: Schema, expectedSchema: TestDataSchema) {
    // TODO
    testSchemaGroups(schema.groups, expectedSchema.groups);
    testSchemaItems(schema.items, expectedSchema.items);
}

export function testSchemaGroups(schemaGroups: Group[], expectedGroups: TestDataGroups) {
    // TODO
    expect(schemaGroups.length).toBe(Object.keys(expectedGroups).length);
    for (const group of schemaGroups) {
        // @ts-ignore
        const expectedFilters = expectedGroups[group.name] as string[];
        expect(group.filters.length).toBe(expectedFilters.length);
        expect([...group.getFilterNames()].sort()).toEqual(expectedFilters.sort());
    }
}

export function testSchemaItems(schemaItems: Item[], expectedItems: TestDataItem[]) {
    // TODO
    expect(schemaItems.length).toBe(expectedItems.length);
}

export function jsxToHtml(jsx: ReactElement): HTMLElement {
    return new JSDOM(renderToStaticMarkup(jsx)).window.document.documentElement;
}
