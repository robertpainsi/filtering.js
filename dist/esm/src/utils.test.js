import { describe, expect, test } from '@jest/globals';
import { findOne } from './utils';
import { getProperty } from '../test/test-utils';
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
            object: { a: 1, b: 2, c: 3 },
            propertyName: 'a',
            expectedResult: 1,
        }, {
            testName: 'Simple object, nested property',
            object: { a: { b: { c: 1 } } },
            propertyName: 'a.b.c',
            expectedResult: 1,
        }, {
            testName: 'Complex object, simple property',
            object: { a: { b: { c: 1 } }, d: { e: { f: 2 } } },
            propertyName: 'd',
            expectedResult: { e: { f: 2 } },
        }, {
            testName: 'Complex object, nested property',
            object: { a: { b: { c: 1 } }, d: { e: { f: 2 } } },
            propertyName: 'a.b',
            expectedResult: { c: 1 },
        }, {
            testName: 'Complex object, nested property that doesn\'t exist',
            object: { a: { b: { c: 1 } }, d: { e: { f: 2 } } },
            propertyName: 'a.b.c.d',
            expectedResult: undefined,
        }];
    for (const { testName, object, propertyName, expectedResult } of scenarios) {
        test(testName, () => {
            const result = getProperty(object, propertyName);
            expect(result).toEqual(expectedResult);
        });
    }
});
