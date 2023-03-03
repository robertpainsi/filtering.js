import {describe, test} from "@jest/globals";
import {TestData, testFiltering} from "../test/test-utils";
import {anotherSimpleTestData, cheap, red, simpleTestGroups, small} from "../test/test-data";

const testData: TestData[] = [{
    name: 'Simple test',
    items: anotherSimpleTestData,
    groups: simpleTestGroups,
    expected: {
        groups: {
            color: [red],
            size: [small],
            price: [cheap],
        },
        items: [
            'item-12',
            'item-19',
            'item-24',
            'item-27',
        ],
        possibleItems: [
            'item-10',
            'item-11',
            'item-12',
            'item-13',
            'item-14',
            'item-15',
            'item-16',
            'item-17',
            'item-18',
            'item-19',
            'item-2',
            'item-20',
            'item-21',
            'item-24',
            'item-26',
            'item-27',
            'item-29',
            'item-30',
            'item-31',
            'item-4',
            'item-6',
            'item-7',
            'item-9',
        ],
    },
}];

describe('Test filter', function () {
    for (const data of testData) {
        test(data.name, async () => {
            await testFiltering(data);
        });
    }
});
