"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestDataPossibleItems = exports.getSortedNames = exports.getNames = exports.getProperty = exports.testFilterData = exports.jsToSchema = exports.jsxToHtml = exports.testSchemaItems = exports.testSchemaFilters = exports.testSchemaGroups = exports.testSchema = exports.checkFilters = exports.createFilterData = exports.createExpectedPossibleItems = exports.testFiltering = void 0;
const globals_1 = require("@jest/globals");
require("./initialize-test-utils");
const schema_1 = require("../src/schema");
const filtering_1 = require("../src/filtering");
const jsdom_1 = require("jsdom");
const server_1 = require("react-dom/server");
const natural_orderby_1 = require("natural-orderby");
function testFiltering(schema, test) {
    const filterData = createFilterData(test.checked);
    const result = new filtering_1.Filtering(schema, test.options).filter(filterData);
    if (test.filteredItems) {
        (0, globals_1.expect)(getSortedNames(result.filteredItems, 'data.name')).toEqual((0, natural_orderby_1.orderBy)(test.filteredItems));
    }
    if (test.allItems) {
        (0, globals_1.expect)(getSortedNames(result.allItems, 'data.name')).toEqual((0, natural_orderby_1.orderBy)(test.allItems));
    }
    if (test.possibleItems) {
        (0, globals_1.expect)(createTestDataPossibleItems(result))
            .toEqual(createExpectedPossibleItems(test.possibleItems));
    }
}
exports.testFiltering = testFiltering;
function createExpectedPossibleItems(o) {
    if (Array.isArray(o)) {
        return (0, natural_orderby_1.orderBy)(o.map(createExpectedPossibleItems));
    }
    if (typeof o === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(o)) {
            result[key] = createExpectedPossibleItems(value);
        }
        return result;
    }
    return o;
}
exports.createExpectedPossibleItems = createExpectedPossibleItems;
function createFilterData(checked) {
    const filterData = new filtering_1.FilterData();
    checkFilters(filterData, checked);
    return filterData;
}
exports.createFilterData = createFilterData;
function checkFilters(filterData, checked) {
    for (const [group, filters] of Object.entries(checked)) {
        for (const filter of filters) {
            filterData.checkFilter(group, filter);
        }
    }
}
exports.checkFilters = checkFilters;
function testSchema(schema, expectedSchema) {
    if (expectedSchema.groups) {
        testSchemaGroups(schema.groups, expectedSchema.groups);
    }
    if (expectedSchema.items) {
        testSchemaItems(schema.items, expectedSchema.items);
    }
}
exports.testSchema = testSchema;
function testSchemaGroups(schemaGroups, expectedGroups) {
    (0, globals_1.expect)(getSortedNames(schemaGroups)).toEqual((0, natural_orderby_1.orderBy)(Object.keys(expectedGroups)));
    for (const group of schemaGroups) {
        testSchemaFilters(group.filters, expectedGroups[group.name]);
    }
}
exports.testSchemaGroups = testSchemaGroups;
function testSchemaFilters(schemaFilters, expectedFilters) {
    (0, globals_1.expect)(getSortedNames(schemaFilters)).toEqual((0, natural_orderby_1.orderBy)(expectedFilters));
}
exports.testSchemaFilters = testSchemaFilters;
function testSchemaItems(schemaItems, expectedItems) {
    const sortedSchemaItems = (0, natural_orderby_1.orderBy)([...schemaItems], (item) => getItemName(item));
    const sortedExpectedItems = (0, natural_orderby_1.orderBy)([...expectedItems], (item) => item.name);
    (0, globals_1.expect)(sortedSchemaItems.length).toEqual(sortedExpectedItems.length);
    for (let i = 0; i < sortedSchemaItems.length; i++) {
        const schemaItem = sortedSchemaItems[i];
        const expectedItem = sortedExpectedItems[i];
        (0, globals_1.expect)(getItemName(schemaItem)).toEqual(expectedItem.name);
        (0, globals_1.expect)((0, natural_orderby_1.orderBy)([...schemaItem.getGroupNames()])).toEqual((0, natural_orderby_1.orderBy)(Object.keys(expectedItem.groups)));
        for (const groupName of schemaItem.getGroupNames()) {
            const schemaFilters = (0, natural_orderby_1.orderBy)([...schemaItem.getFilterNames(groupName)]);
            const expectedFilters = (0, natural_orderby_1.orderBy)(expectedItem.groups[groupName]);
            (0, globals_1.expect)(schemaFilters).toEqual(expectedFilters);
        }
    }
}
exports.testSchemaItems = testSchemaItems;
function getItemName(item) {
    return item.data.element.getAttribute('id');
}
function jsxToHtml(jsx) {
    return new jsdom_1.JSDOM((0, server_1.renderToStaticMarkup)(jsx)).window.document.documentElement;
}
exports.jsxToHtml = jsxToHtml;
function jsToSchema(o) {
    const schema = new schema_1.Schema();
    if (o.groups) {
        for (const [groupName, filterNames] of Object.entries(o.groups)) {
            const group = new schema_1.Group(groupName);
            for (const filterName of filterNames) {
                const filter = new schema_1.Filter(filterName);
                group.addFilter(filter);
            }
            schema.addGroup(group);
        }
    }
    if (o.items) {
        for (const item of o.items) {
            const i = new schema_1.Item({ name: item.name });
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
exports.jsToSchema = jsToSchema;
function testFilterData(filterData, expectedChecked) {
    const filterDataGroups = (0, natural_orderby_1.orderBy)([...filterData.checkedFilters.keys()]);
    const expectedCheckedGroups = (0, natural_orderby_1.orderBy)(Object.keys(expectedChecked.groups));
    (0, globals_1.expect)(filterDataGroups).toEqual(expectedCheckedGroups);
    for (const groupName of filterDataGroups) {
        const filterDataFilters = (0, natural_orderby_1.orderBy)([...filterData.checkedFilters.get(groupName)]);
        const expectedCheckedFilters = (0, natural_orderby_1.orderBy)(expectedChecked.groups[groupName]);
        (0, globals_1.expect)(filterDataFilters).toEqual(expectedCheckedFilters);
    }
}
exports.testFilterData = testFilterData;
function getProperty(object, propertyName) {
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
exports.getProperty = getProperty;
function getNames(items, propertyName = 'name') {
    return items.map((item) => getProperty(item, propertyName));
}
exports.getNames = getNames;
function getSortedNames(items, propertyName = 'name') {
    return (0, natural_orderby_1.orderBy)(items.map((item) => getProperty(item, propertyName)));
}
exports.getSortedNames = getSortedNames;
function createTestDataPossibleItems(result) {
    const possibleItems = {};
    for (const groupResult of result.groups) {
        possibleItems[groupResult.schemaGroup.name] = {};
        for (const filterResult of groupResult.filters) {
            possibleItems[groupResult.schemaGroup.name][filterResult.schemaFilter.name] = getSortedNames(filterResult.possibleItems, 'data.name');
        }
    }
    return possibleItems;
}
exports.createTestDataPossibleItems = createTestDataPossibleItems;
