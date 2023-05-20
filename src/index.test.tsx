import {red, small} from "../test/test-data";
import {describe, test} from "@jest/globals";
import {TestData} from "../test/test-data-types";
import {jsToSchema, testFiltering} from "../test/test-utils";

const testData: TestData[] = [{
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
    test: {
        name: 'test',
        checked: {
            color: [red],
            size: [small],
        },
        filteredItems: ['item-1'],
        possibleItems: ['item-1', 'item-2'],
    },
}];

describe('Test filter', function () {
    for (const data of testData) {
        const schema = jsToSchema(data.schema);
        test(data.test.name, () => testFiltering(schema, data.test));
    }
});
