import {describe, expect, test} from "@jest/globals";
import {compareStrings, findOne, mapProperty} from "./utils";


describe('Utils.findOne', function () {
    test('Empty lists', () => {
        expect(findOne(new Set([]), new Set([]))).toBe(false);
        expect(findOne(new Set([1, 2, 3]), new Set([]))).toBe(false);
        expect(findOne(new Set([]), new Set([1, 2, 3]))).toBe(false);
    });

    test('Intersection', () => {
        expect(findOne(new Set([1, 2, 3]), new Set([2]))).toBe(true);
        expect(findOne(new Set([2]), new Set([1, 2, 3]))).toBe(true);
    });

    test('No intersection', () => {
        expect(findOne(new Set([1, 2, 3]), new Set([4]))).toBe(false);
        expect(findOne(new Set([4]), new Set([1, 2, 3]))).toBe(false);
    });

    test('Multiple intersections', () => {
        expect(findOne(new Set([1, 2, 3]), new Set([2, 3]))).toBe(true);
        expect(findOne(new Set([1, 2]), new Set([1, 2, 3]))).toBe(true);
    });
});

describe('Utils.mapProperty', function () {
    const scenarios = [{
        testName: 'Simple object, simple property',
        object: {a: 1, b: 2, c: 3},
        propertyName: 'a',
        expectedResult: 1,
    }, {
        testName: 'Simple object, nested property',
        object: {a: {b: {c: 1}}},
        propertyName: 'a.b.c',
        expectedResult: 1,
    }, {
        testName: 'Complex object, simple property',
        object: {a: {b: {c: 1}}, d: {e: {f: 2}}},
        propertyName: 'd',
        expectedResult: {e: {f: 2}},
    }, {
        testName: 'Complex object, nested property',
        object: {a: {b: {c: 1}}, d: {e: {f: 2}}},
        propertyName: 'a.b',
        expectedResult: {c: 1},
    }, {
        testName: 'Complex object, nested property that doesn\'t exist',
        object: {a: {b: {c: 1}}, d: {e: {f: 2}}},
        propertyName: 'a.b.c.d',
        expectedResult: undefined,
    }];

    for (const {testName, object, propertyName, expectedResult} of scenarios) {
        test(testName, () => {
            const result = mapProperty(object, propertyName);
            expect(result).toEqual(expectedResult);
        });
    }
});

describe('Utils.compareStrings', function () {
    const scenarios = [{
        testName: 'Empty strings',
        string1: '',
        string2: '',
        expectedResult: 0,
    }, {
        testName: 'Equal strings',
        string1: 'a',
        string2: 'a',
        expectedResult: 0,
    }, {
        testName: 'First string less than second',
        string1: 'a',
        string2: 'b',
        expectedResult: -1,
    }, {
        testName: 'First string greater than second',
        string1: 'b',
        string2: 'a',
        expectedResult: 1,
    }, {
        testName: 'Case-sensitive',
        string1: 'a',
        string2: 'A',
        expectedResult: 1,
    }, {
        testName: 'First string longer than second',
        string1: 'aa',
        string2: 'a',
        expectedResult: 1,
    }, {
        testName: 'First string shorter than second',
        string1: 'a',
        string2: 'aa',
        expectedResult: -1,
    }, {
        testName: 'First string longer than second, but first string greater than second',
        string1: 'ba',
        string2: 'aa',
        expectedResult: 1,
    }];
    for (const {expectedResult, string1, string2, testName} of scenarios) {
        test(testName, () => {
            expect(compareStrings(string1, string2)).toBe(expectedResult);
        });
    }
})
