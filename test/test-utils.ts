import {expect} from "@jest/globals";
import {ReactElement} from "react";

import './initialize-test-utils';

import {Filter, FilterData, Group, Item, Schema} from "../src/schema";
import {Filtering} from "../src/filtering";
import {JSDOM} from "jsdom";
import {renderToStaticMarkup} from "react-dom/server";
import {TestDataFiltering, TestDataGroups, TestDataItem, TestDataSchema} from "./test-data-types";
import {compareStrings, getProperty} from "../src/utils";

export function testFiltering(schema: Schema, test: TestDataFiltering) {
    const filterData = createFilterData(test.checked);
    const result = new Filtering(schema).filter(filterData);

    if (test.filteredItems) {
        expect(getSortedNames(result.filteredItems, 'data.name')).toEqual(test.filteredItems.sort());
    }
    if (test.possibleItems) {
        expect(getSortedNames(result.possibleItems, 'data.name')).toEqual(test.possibleItems.sort());
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
    if (expectedSchema.groups) {
        testSchemaGroups(schema.groups, expectedSchema.groups);
    }
    if (expectedSchema.items) {
        testSchemaItems(schema.items, expectedSchema.items);
    }
}

export function testSchemaGroups(schemaGroups: Group[], expectedGroups: TestDataGroups) {
    expect(getSortedNames(schemaGroups)).toEqual(Object.keys(expectedGroups).sort());
    for (const group of schemaGroups) {
        testSchemaFilters(group.filters, expectedGroups[group.name]);
    }
}

export function testSchemaFilters(schemaFilters: Filter[], expectedFilters: string[]) {
    expect(getSortedNames(schemaFilters)).toEqual(expectedFilters.sort());
}

export function testSchemaItems(schemaItems: Item[], expectedItems: TestDataItem[]) {
    const sortedSchemaItems = [...schemaItems].sort((a, b) => compareStrings(getItemName(a), getItemName(b)));
    const sortedExpectedItems = [...expectedItems].sort((a, b) => compareStrings(a.name, b.name));

    expect(sortedSchemaItems.length).toEqual(sortedExpectedItems.length);
    for (let i = 0; i < sortedSchemaItems.length; i++) {
        const schemaItem = sortedSchemaItems[i];
        const expectedItem = sortedExpectedItems[i];

        expect(getItemName(schemaItem)).toEqual(expectedItem.name);
        expect([...schemaItem.getGroupNames()]).toEqual(Object.keys(expectedItem.groups).sort());
        for (const groupName of schemaItem.getGroupNames()) {
            const schemaFilters = [...schemaItem.getFilterNames(groupName)].sort();
            const expectedFilters = expectedItem.groups[groupName].sort();

            expect(schemaFilters).toEqual(expectedFilters);
        }
    }
}

function getItemName(item: Item): string {
    return item.data.element.getAttribute('id');
}

export function jsxToHtml(jsx: ReactElement): HTMLElement {
    return new JSDOM(renderToStaticMarkup(jsx)).window.document.documentElement;
}

export function jsToSchema(o: TestDataSchema) {
    const schema = new Schema();

    if (o.groups) {
        for (const [groupName, filterNames] of Object.entries(o.groups)) {
            const group = new Group(groupName);
            for (const filterName of filterNames) {
                const filter = new Filter(filterName);
                group.addFilter(filter);
            }
            schema.addGroup(group);
        }
    }
    if (o.items) {
        for (const item of o.items) {
            const i = new Item({name: item.name});
            for (const [groupName, filterNames] of Object.entries(item.groups)) {
                for (const filterName of filterNames) {
                    i.addFilter(groupName, filterName);
                }
            }
            schema.addItem(i);
        }
    }
    return schema;
}

export function testFilterData(filterData: FilterData, expectedChecked: TestDataSchema) {
    const filterDataGroups = [...filterData.checkedFilters.keys()].sort();
    const expectedCheckedGroups = Object.keys(expectedChecked.groups).sort();

    expect(filterDataGroups).toEqual(expectedCheckedGroups);
    for (const groupName of filterDataGroups) {
        const filterDataFilters = [...filterData.checkedFilters.get(groupName)].sort();
        const expectedCheckedFilters = expectedChecked.groups[groupName].sort();

        expect(filterDataFilters).toEqual(expectedCheckedFilters);
    }
}

export function getSortedNames(items: any[], propertyName: string = 'name'): string[] {
    return items.map((item) => getProperty(item, propertyName)).sort();
}
