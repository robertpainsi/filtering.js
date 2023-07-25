import {expect} from "@jest/globals";
import {ReactElement} from "react";

import './initialize-test-utils';

import {Filter, Group, Item, Schema} from "../src/schema";
import {FilterData, Filtering} from "../src/filtering";
import {JSDOM} from "jsdom";
import {renderToStaticMarkup} from "react-dom/server";
import {TestDataFiltering, TestDataGroups, TestDataItem, TestDataPossibleItems, TestDataSchema} from "./test-data-types";
import {Result} from "../src/result";
import {orderBy} from 'natural-orderby';

export function testFiltering(schema: Schema, test: TestDataFiltering) {
    const filterData = createFilterData(test.checked);
    const result = new Filtering(schema, test.options).filter(filterData);

    if (test.filteredItems) {
        expect(getSortedNames(result.filteredItems, 'data.name')).toEqual(orderBy(test.filteredItems));
    }
    if (test.allItems) {
        expect(getSortedNames(result.allItems, 'data.name')).toEqual(orderBy(test.allItems));
    }

    if (test.possibleItems) {
        expect(createTestDataPossibleItems(result))
            .toEqual(createExpectedPossibleItems(test.possibleItems));
    }
}

export function createExpectedPossibleItems(o: any): any {
    if (Array.isArray(o)) {
        return orderBy(o.map(createExpectedPossibleItems));
    }
    if (typeof o === 'object') {
        const result: any = {};
        for (const [key, value] of Object.entries(o)) {
            result[key] = createExpectedPossibleItems(value);
        }
        return result;
    }
    return o;
}

export function createFilterData(checked: TestDataGroups): FilterData {
    const filterData = new FilterData();
    checkFilters(filterData, checked);
    return filterData;
}

export function checkFilters(filterData: FilterData, checked: TestDataGroups): void {
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
    expect(getSortedNames(schemaGroups)).toEqual(orderBy(Object.keys(expectedGroups)));
    for (const group of schemaGroups) {
        testSchemaFilters(group.filters, expectedGroups[group.name]);
    }
}

export function testSchemaFilters(schemaFilters: Filter[], expectedFilters: string[]) {
    expect(getSortedNames(schemaFilters)).toEqual(orderBy(expectedFilters));
}

export function testSchemaItems(schemaItems: Item[], expectedItems: TestDataItem[]) {
    const sortedSchemaItems = orderBy([...schemaItems], (item) => getItemName(item));
    const sortedExpectedItems = orderBy([...expectedItems], (item) => item.name);

    expect(sortedSchemaItems.length).toEqual(sortedExpectedItems.length);
    for (let i = 0; i < sortedSchemaItems.length; i++) {
        const schemaItem = sortedSchemaItems[i];
        const expectedItem = sortedExpectedItems[i];

        expect(getItemName(schemaItem)).toEqual(expectedItem.name);
        expect(orderBy([...schemaItem.getGroupNames()])).toEqual(orderBy(Object.keys(expectedItem.groups)));
        for (const groupName of schemaItem.getGroupNames()) {
            const schemaFilters = orderBy([...schemaItem.getFilterNames(groupName)]);
            const expectedFilters = orderBy(expectedItem.groups[groupName]);

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
    const filterDataGroups = orderBy([...filterData.checkedFilters.keys()]);
    const expectedCheckedGroups = orderBy(Object.keys(expectedChecked.groups));

    expect(filterDataGroups).toEqual(expectedCheckedGroups);
    for (const groupName of filterDataGroups) {
        const filterDataFilters = orderBy([...filterData.checkedFilters.get(groupName)]);
        const expectedCheckedFilters = orderBy(expectedChecked.groups[groupName]);

        expect(filterDataFilters).toEqual(expectedCheckedFilters);
    }
}

export function getProperty(object: any, propertyName: string): any {
    const parts = propertyName.split('.');
    let result = object;
    for (const part of parts) {
        if (result === undefined) {
            return undefined;
        }
        result = result[part];
    }
    return result;
}

export function getNames(items: any[], propertyName: string = 'name'): string[] {
    return items.map((item) => getProperty(item, propertyName));
}

export function getSortedNames(items: any[], propertyName: string = 'name'): string[] {
    return orderBy(items.map((item) => getProperty(item, propertyName)));
}

export function createTestDataPossibleItems(result: Result): TestDataPossibleItems {
    const possibleItems: TestDataPossibleItems = {};
    for (const groupResult of result.groups) {
        possibleItems[groupResult.schemaGroup.name] = {};
        for (const filterResult of groupResult.filters) {
            possibleItems[groupResult.schemaGroup.name][filterResult.schemaFilter.name] = getSortedNames(filterResult.possibleItems, 'data.name');
        }
    }
    return possibleItems;
}
