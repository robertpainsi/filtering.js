import {red, small} from "../test/test-data";
import {describe, test} from "@jest/globals";
import {TestDataFiltering} from "../test/test-data-types";
import {jsToSchema, testFiltering} from "../test/test-utils";

const testData: TestDataFiltering[] = [{
    name: 'test',
    schema: {
        groups: {
            color: ['red', 'blue', 'green'],
            size: ['small', 'large'],
        },
        items: [{
            name: 'item-1',
            groups: {
                color: ['red'],
                size: ['small'],
            },
        }, {
            name: 'item-2',
            groups: {
                color: ['blue'],
                size: ['small'],
            }
        }, {
            name: 'item-3',
            groups: {
                color: ['green'],
                size: ['large'],
            }
        }],
    },
    checked: {
        color: [red],
        size: [small],
    },
    filteredItems: ['item-1'],
    possibleItems: ['item-1', 'item-2'],
}];

describe('Test filter', function () {
    for (const singleTest of testData) {
        const schema = jsToSchema(singleTest.schema);
        test(singleTest.name, () => testFiltering(schema, singleTest));
    }
});
