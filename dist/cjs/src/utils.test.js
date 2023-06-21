"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const utils_1 = require("./utils");
const test_utils_1 = require("../test/test-utils");
(0, globals_1.describe)('Utils.findOne', function () {
    (0, globals_1.test)('Empty lists', () => {
        (0, globals_1.expect)((0, utils_1.findOne)(new Set([]), new Set([]))).toBe(false);
        (0, globals_1.expect)((0, utils_1.findOne)(new Set([1, 2, 3]), new Set([]))).toBe(false);
        (0, globals_1.expect)((0, utils_1.findOne)(new Set([]), new Set([1, 2, 3]))).toBe(false);
    });
    (0, globals_1.test)('Intersection', () => {
        (0, globals_1.expect)((0, utils_1.findOne)(new Set([1, 2, 3]), new Set([2]))).toBe(true);
        (0, globals_1.expect)((0, utils_1.findOne)(new Set([2]), new Set([1, 2, 3]))).toBe(true);
    });
    (0, globals_1.test)('No intersection', () => {
        (0, globals_1.expect)((0, utils_1.findOne)(new Set([1, 2, 3]), new Set([4]))).toBe(false);
        (0, globals_1.expect)((0, utils_1.findOne)(new Set([4]), new Set([1, 2, 3]))).toBe(false);
    });
    (0, globals_1.test)('Multiple intersections', () => {
        (0, globals_1.expect)((0, utils_1.findOne)(new Set([1, 2, 3]), new Set([2, 3]))).toBe(true);
        (0, globals_1.expect)((0, utils_1.findOne)(new Set([1, 2]), new Set([1, 2, 3]))).toBe(true);
    });
});
(0, globals_1.describe)('Utils.mapProperty', function () {
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
        (0, globals_1.test)(testName, () => {
            const result = (0, test_utils_1.getProperty)(object, propertyName);
            (0, globals_1.expect)(result).toEqual(expectedResult);
        });
    }
});
