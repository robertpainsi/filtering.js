"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const test_data_1 = require("../test/test-data");
const globals_1 = require("@jest/globals");
const test_utils_1 = require("../test/test-utils");
const simple_1 = require("../test/data/simple");
const medium_1 = require("../test/data/medium");
const schema_1 = require("./schema");
const filtering_1 = require("./filtering");
const parser_1 = require("./parser");
(0, globals_1.describe)('Test Tiltering', function () {
    const testData = [{
            name: 'Select one filter in one group',
            schema: simple_1.simpleTestSchema,
            checked: {
                color: [test_data_1.red],
            },
            filteredItems: ['item-1', 'item-2'],
            possibleItems: {
                color: {
                    red: ['item-1', 'item-2'],
                    blue: ['item-3'],
                },
                size: {
                    small: ['item-1'],
                    large: ['item-2'],
                },
            },
        }, {
            name: 'Select one filter in each group',
            schema: simple_1.simpleTestSchema,
            checked: {
                color: [test_data_1.red],
                size: [test_data_1.small],
            },
            filteredItems: ['item-1'],
            possibleItems: {
                color: {
                    red: ['item-1'],
                    blue: [],
                },
                size: {
                    small: ['item-1'],
                    large: ['item-2'],
                },
            },
        }, {
            name: 'Select no filters',
            schema: simple_1.simpleTestSchema,
            checked: {},
            filteredItems: ['item-1', 'item-2', 'item-3'],
            possibleItems: {
                color: {
                    red: ['item-1', 'item-2'],
                    blue: ['item-3'],
                },
                size: {
                    small: ['item-1'],
                    large: ['item-2', 'item-3'],
                },
            },
        }, {
            name: 'Select multiple filters in one group',
            schema: medium_1.mediumTestSchema,
            checked: {
                size: [test_data_1.medium, test_data_1.large],
            },
            filteredItems: ['item-1', 'item-2', 'item-4', 'item-5', 'item-6', 'item-7', 'item-9', 'item-10', 'item-11', 'item-12', 'item-14', 'item-15', 'item-16'],
            possibleItems: {
                color: {
                    red: ['item-5', 'item-12'],
                    blue: ['item-7', 'item-11', 'item-14'],
                    green: ['item-1', 'item-2', 'item-4', 'item-6', 'item-7', 'item-9', 'item-10', 'item-15', 'item-16'],
                },
                size: {
                    small: ['item-2', 'item-3', 'item-8', 'item-10', 'item-13'],
                    medium: ['item-1', 'item-2', 'item-4', 'item-6', 'item-9', 'item-10', 'item-11', 'item-14', 'item-16'],
                    large: ['item-5', 'item-7', 'item-9', 'item-10', 'item-12', 'item-15', 'item-16'],
                },
                price: {
                    cheap: ['item-1', 'item-6', 'item-11', 'item-14', 'item-15'],
                    expensive: ['item-2', 'item-4', 'item-5', 'item-7', 'item-9', 'item-10', 'item-12', 'item-16'],
                },
            },
        }, {
            name: 'Select multiple filters in multiple groups',
            schema: medium_1.mediumTestSchema,
            checked: {
                color: [test_data_1.red, test_data_1.blue],
                size: [test_data_1.small, test_data_1.large],
                price: [test_data_1.expensive],
            },
            filteredItems: ['item-5', 'item-7', 'item-8', 'item-12'],
            possibleItems: {
                color: {
                    red: ['item-5', 'item-8', 'item-12'],
                    blue: ['item-7', 'item-8'],
                    green: ['item-2', 'item-7', 'item-9', 'item-10', 'item-16'],
                },
                size: {
                    small: ['item-8'],
                    medium: [],
                    large: ['item-5', 'item-7', 'item-12'],
                },
                price: {
                    cheap: ['item-3', 'item-13'],
                    expensive: ['item-5', 'item-7', 'item-8', 'item-12'],
                },
            },
        }];
    for (const singleTest of testData) {
        const schema = (0, test_utils_1.jsToSchema)(singleTest.schema);
        (0, globals_1.test)(singleTest.name, () => (0, test_utils_1.testFiltering)(schema, singleTest));
    }
    (0, globals_1.test)('Test Filtering callback prefiltering items', () => {
        const testData = {
            name: 'Test Filtering callback prefiltering items',
            schema: simple_1.simpleTestSchema,
            options: {
                filterItem: (item, schema, filterData) => {
                    return item.getFilterNames('size').has('large'); // Only use large items
                },
            },
            checked: {
                color: [test_data_1.red],
            },
            filteredItems: ['item-2'],
            allItems: ['item-2', 'item-3'],
            possibleItems: {
                color: {
                    red: ['item-2'],
                    blue: ['item-3'],
                },
                size: {
                    small: [],
                    large: ['item-2'],
                },
            },
        };
        const schema = (0, test_utils_1.jsToSchema)(testData.schema);
        (0, test_utils_1.testFiltering)(schema, testData);
    });
    (0, globals_1.test)('FilterData checkFilter with object', () => {
        const filterData = new filtering_1.FilterData();
        const group = new schema_1.Group('group');
        const filter = new schema_1.Filter('filter');
        group.addFilter(filter);
        filterData.checkFilter(filter);
        expect(filterData.checkedFilters).toEqual(new Map([
            ['group', new Set(['filter'])],
        ]));
    });
    (0, globals_1.test)('FilterData checkFilter with string group and filter', () => {
        const filterData = new filtering_1.FilterData();
        filterData.checkFilter('group', 'filter');
        expect(filterData.checkedFilters).toEqual(new Map([
            ['group', new Set(['filter'])],
        ]));
    });
    (0, globals_1.test)('items in result should have same order as in schema.items', () => {
        const schema = (0, test_utils_1.jsToSchema)(medium_1.mediumTestSchema);
        const filtering = new filtering_1.Filtering(schema);
        const result = filtering.filter(new filtering_1.FilterData());
        expect((0, test_utils_1.getNames)(result.filteredItems, 'data.name')).toStrictEqual((0, test_utils_1.getNames)(schema.items, 'data.name'));
        expect((0, test_utils_1.getNames)(result.allItems, 'data.name')).toStrictEqual((0, test_utils_1.getNames)(schema.items, 'data.name'));
        const colorGroup = result.getGroup('color');
        expect((0, test_utils_1.getNames)(colorGroup.filteredItems, 'data.name')).toStrictEqual((0, test_utils_1.getNames)(schema.items, 'data.name'));
        expect((0, test_utils_1.getNames)(colorGroup.allItems, 'data.name')).toStrictEqual((0, test_utils_1.getNames)(schema.items, 'data.name'));
        const filterItemNames = ['item-5', 'item-8', 'item-12', 'item-13'];
        const redColorFilter = colorGroup.getFilter('red');
        expect((0, test_utils_1.getNames)(redColorFilter.filteredItems, 'data.name')).toStrictEqual(filterItemNames);
        expect((0, test_utils_1.getNames)(redColorFilter.possibleItems, 'data.name')).toStrictEqual(filterItemNames);
        expect((0, test_utils_1.getNames)(redColorFilter.allItems, 'data.name')).toStrictEqual(filterItemNames);
    });
    (0, globals_1.test)('Filtering with unavailable filter no checked', () => {
        const schema = new parser_1.Parser().parseSchemaFromHtml((0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "available", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "true", children: "Available?" }) }), (0, jsx_runtime_1.jsx)("div", { id: "item-1", className: "filtering-item", "data-filter-available": "true", children: "1" }), (0, jsx_runtime_1.jsx)("div", { id: "item-2", className: "filtering-item", "data-filter-available": "", children: "2" })] })));
        const filtering = new filtering_1.Filtering(schema);
        let result = filtering.filter(new filtering_1.FilterData());
        expect(result.filteredItems.map((item) => item.data.element.id)).toEqual(['item-1', 'item-2']);
    });
    (0, globals_1.test)('Filtering with missing filter no checked', () => {
        const filtering = new filtering_1.Filtering(new parser_1.Parser().parseSchemaFromHtml((0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "available", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "true", children: "Available?" }) }), (0, jsx_runtime_1.jsx)("div", { id: "item-1", className: "filtering-item", "data-filter-available": "true", children: "1" }), (0, jsx_runtime_1.jsx)("div", { id: "item-2", className: "filtering-item", children: "2" })] }))));
        let result = filtering.filter(new filtering_1.FilterData());
        expect(result.filteredItems.map((item) => item.data.element.id)).toEqual(['item-1', 'item-2']);
    });
    (0, globals_1.test)('Filtering with unavailable filter checked', () => {
        const filtering = new filtering_1.Filtering(new parser_1.Parser().parseSchemaFromHtml((0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "available", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "true", children: "Available?" }) }), (0, jsx_runtime_1.jsx)("div", { id: "item-1", className: "filtering-item", "data-filter-available": "true", children: "1" }), (0, jsx_runtime_1.jsx)("div", { id: "item-2", className: "filtering-item", "data-filter-available": "", children: "2" })] }))));
        let result = filtering.filter((0, test_utils_1.createFilterData)({
            'available': ['true'],
        }));
        expect(result.filteredItems.map((item) => item.data.element.id)).toEqual(['item-1']);
    });
    (0, globals_1.test)('Filtering Item with a non existing group.', function () {
        const schema = (0, test_utils_1.jsToSchema)({
            groups: {
                color: ['red', 'blue'],
            },
            items: [{
                    name: 'item-1',
                    groups: {
                        color: [test_data_1.red],
                        size: [test_data_1.small],
                    },
                }],
        });
        const filtering = new filtering_1.Filtering(schema);
        expect(filtering.filter(new filtering_1.FilterData()).filteredItems.length).toBe(1);
        expect(filtering.filter((0, test_utils_1.createFilterData)({
            'color': ['red'],
        })).filteredItems.length).toBe(1);
        expect(filtering.filter((0, test_utils_1.createFilterData)({
            'color': ['blue'],
        })).filteredItems.length).toBe(0);
    });
    (0, globals_1.test)('Filtering Item with filter not in any group.', function () {
        const schema = (0, test_utils_1.jsToSchema)({
            groups: {
                color: ['red', 'blue'],
            },
            items: [{
                    name: 'item-1',
                    groups: {
                        color: [test_data_1.green],
                    },
                }],
        });
        const filtering = new filtering_1.Filtering(schema);
        expect(filtering.filter(new filtering_1.FilterData()).filteredItems.length).toBe(1);
        expect(filtering.filter((0, test_utils_1.createFilterData)({
            'color': ['red'],
        })).filteredItems.length).toBe(0);
    });
});
