import {describe, expect, test} from "@jest/globals";
import {findOne} from "./utils";


describe('Utils findOne', function () {
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
