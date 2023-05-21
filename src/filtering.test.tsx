import {blue, expensive, large, medium, red, small} from "../test/test-data";
import {describe, test} from "@jest/globals";
import {TestDataFiltering} from "../test/test-data-types";
import {jsToSchema, testFiltering} from "../test/test-utils";
import {simpleTestSchema} from "../test/data/simple";
import {mediumTestSchema} from "../test/data/medium";
import {FilterData, Item, Schema} from './schema';

describe('Test Tiltering', function () {
    const testData: TestDataFiltering[] = [{
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

    test('Test Filltering callback prefiltering items', () => {
        const testData: TestDataFiltering = {
            name: 'Test Filltering callback prefiltering items',
            schema: simpleTestSchema,
            options: {
                filterItem: (item: Item, schema: Schema, filterData: FilterData) => {
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
});
