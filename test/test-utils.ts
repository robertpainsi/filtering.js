import {expect} from "@jest/globals";
import {ReactElement} from "react";

import './initialize-test-utils';

import {Filter, FilterData, Group, Item, Schema} from "../src/schema";
import {Filtering} from "../src/filtering";
import {JSDOM} from "jsdom";
import {renderToStaticMarkup} from "react-dom/server";
import {TestDataGroups, TestDataItem, TestDataSchema, TestDataTest} from "./test-data-types";

export function testFiltering(schema: Schema, test: TestDataTest) {
    const filterData = createFilterData(test.checked);
    const result = new Filtering(schema).filter(filterData);

    if (test.filteredItems) {
        expect(result.filteredItems.map((item) => item.data.name).sort()).toEqual(test.filteredItems.sort());
    }
    if (test.possibleItems) {
        expect(result.possibleItems.map((item) => item.data.name).sort()).toEqual(test.possibleItems.sort());
    }
}

export function createFilterData(checked: TestDataGroups): FilterData {
    const filterData = new FilterData();
    enableFilters(filterData, checked);
    return filterData;
}

export function enableFilters(filterData: FilterData, checked: TestDataGroups): void {
    for (const [group, filters] of Object.entries(checked)) {
        for (const filter of filters) {
            filterData.checkFilter(group, filter);
        }
    }
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

export function jsToSchema(o: TestDataSchema) {
    const schema = new Schema();
    for (const [groupName, filterNames] of Object.entries(o.groups)) {
        const group = new Group(groupName);
        for (const filterName of filterNames) {
            const filter = new Filter(filterName);
            group.addFilter(filter);
        }
        schema.addGroup(group);
    }
    for (const item of o.items) {
        const i = new Item({name: item.name});
        for (const [groupName, filterNames] of Object.entries(item.groups)) {
            for (const filterName of filterNames) {
                i.addFilter(groupName, filterName);
            }
        }
        schema.addItem(i);
    }
    return schema;
}
