"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_data_1 = require("../test/test-data");
const globals_1 = require("@jest/globals");
const test_utils_1 = require("../test/test-utils");
const simple_1 = require("../test/data/simple");
const medium_1 = require("../test/data/medium");
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
    (0, globals_1.test)('Test Filltering callback prefiltering items', () => {
        const testData = {
            name: 'Test Filltering callback prefiltering items',
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
});
