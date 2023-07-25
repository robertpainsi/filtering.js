import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { blue, expensive, large, medium, red, small } from '../test/test-data';
import { describe, test } from '@jest/globals';
import { createFilterData, getNames, jsToSchema, jsxToHtml, testFiltering } from '../test/test-utils';
import { simpleTestSchema } from '../test/data/simple';
import { mediumTestSchema } from '../test/data/medium';
import { Filter, Group } from './schema';
import { FilterData, Filtering } from './filtering';
import { Parser } from './parser';
describe('Test Tiltering', function () {
    const testData = [{
            name: 'Select one filter in one group',
            schema: simpleTestSchema,
            checked: {
                color: [red],
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
            schema: simpleTestSchema,
            checked: {
                color: [red],
                size: [small],
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
            schema: simpleTestSchema,
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
            schema: mediumTestSchema,
            checked: {
                size: [medium, large],
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
            schema: mediumTestSchema,
            checked: {
                color: [red, blue],
                size: [small, large],
                price: [expensive],
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
        const schema = jsToSchema(singleTest.schema);
        test(singleTest.name, () => testFiltering(schema, singleTest));
    }
    test('Test Filtering callback prefiltering items', () => {
        const testData = {
            name: 'Test Filtering callback prefiltering items',
            schema: simpleTestSchema,
            options: {
                filterItem: (item, schema, filterData) => {
                    return item.getFilterNames('size').has('large'); // Only use large items
                },
            },
            checked: {
                color: [red],
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
        const schema = jsToSchema(testData.schema);
        testFiltering(schema, testData);
    });
    test('FilterData checkFilter with object', () => {
        const filterData = new FilterData();
        const group = new Group('group');
        const filter = new Filter('filter');
        group.addFilter(filter);
        filterData.checkFilter(filter);
        expect(filterData.checkedFilters).toEqual(new Map([
            ['group', new Set(['filter'])],
        ]));
    });
    test('FilterData checkFilter with string group and filter', () => {
        const filterData = new FilterData();
        filterData.checkFilter('group', 'filter');
        expect(filterData.checkedFilters).toEqual(new Map([
            ['group', new Set(['filter'])],
        ]));
    });
    test('items in result should have same order as in schema.items', () => {
        const schema = jsToSchema(mediumTestSchema);
        const filtering = new Filtering(schema);
        const result = filtering.filter(new FilterData());
        expect(getNames(result.filteredItems, 'data.name')).toStrictEqual(getNames(schema.items, 'data.name'));
        expect(getNames(result.allItems, 'data.name')).toStrictEqual(getNames(schema.items, 'data.name'));
        const colorGroup = result.getGroup('color');
        expect(getNames(colorGroup.filteredItems, 'data.name')).toStrictEqual(getNames(schema.items, 'data.name'));
        expect(getNames(colorGroup.allItems, 'data.name')).toStrictEqual(getNames(schema.items, 'data.name'));
        const filterItemNames = ['item-5', 'item-8', 'item-12', 'item-13'];
        const redColorFilter = colorGroup.getFilter('red');
        expect(getNames(redColorFilter.filteredItems, 'data.name')).toStrictEqual(filterItemNames);
        expect(getNames(redColorFilter.possibleItems, 'data.name')).toStrictEqual(filterItemNames);
        expect(getNames(redColorFilter.allItems, 'data.name')).toStrictEqual(filterItemNames);
    });
    test('Filtering with unavailable filter no checked', () => {
        const schema = new Parser().parseSchemaFromHtml(jsxToHtml(_jsxs(_Fragment, { children: [_jsx("div", { className: "filtering-group", "data-group-name": "available", children: _jsx("div", { className: "filtering-filter", "data-filter-name": "true", children: "Available?" }) }), _jsx("div", { id: "item-1", className: "filtering-item", "data-filter-available": "true", children: "1" }), _jsx("div", { id: "item-2", className: "filtering-item", "data-filter-available": "", children: "2" })] })));
        const filtering = new Filtering(schema);
        let result = filtering.filter(new FilterData());
        expect(result.filteredItems.map((item) => item.data.element.id)).toEqual(['item-1', 'item-2']);
    });
    test('Filtering with missing filter no checked', () => {
        const filtering = new Filtering(new Parser().parseSchemaFromHtml(jsxToHtml(_jsxs(_Fragment, { children: [_jsx("div", { className: "filtering-group", "data-group-name": "available", children: _jsx("div", { className: "filtering-filter", "data-filter-name": "true", children: "Available?" }) }), _jsx("div", { id: "item-1", className: "filtering-item", "data-filter-available": "true", children: "1" }), _jsx("div", { id: "item-2", className: "filtering-item", children: "2" })] }))));
        let result = filtering.filter(new FilterData());
        expect(result.filteredItems.map((item) => item.data.element.id)).toEqual(['item-1', 'item-2']);
    });
    test('Filtering with unavailable filter checked', () => {
        const filtering = new Filtering(new Parser().parseSchemaFromHtml(jsxToHtml(_jsxs(_Fragment, { children: [_jsx("div", { className: "filtering-group", "data-group-name": "available", children: _jsx("div", { className: "filtering-filter", "data-filter-name": "true", children: "Available?" }) }), _jsx("div", { id: "item-1", className: "filtering-item", "data-filter-available": "true", children: "1" }), _jsx("div", { id: "item-2", className: "filtering-item", "data-filter-available": "", children: "2" })] }))));
        let result = filtering.filter(createFilterData({
            'available': ['true'],
        }));
        expect(result.filteredItems.map((item) => item.data.element.id)).toEqual(['item-1']);
    });
});
