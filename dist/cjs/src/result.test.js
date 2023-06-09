"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const result_1 = require("./result");
const test_utils_1 = require("../test/test-utils");
const simple_1 = require("../test/data/simple");
(0, globals_1.describe)('Result', () => {
    (0, globals_1.test)('Result structure should be the same as Schema', () => {
        const schema = (0, test_utils_1.jsToSchema)({ groups: simple_1.simpleTestGroups });
        const result = new result_1.Result(schema);
        for (const group of schema.groups) {
            (0, globals_1.expect)(result.getGroup(group.name).schemaGroup).toBe(group);
            for (const filter of group.filters) {
                (0, globals_1.expect)(result.getGroup(group.name).getFilter(filter.name).schemaFilter).toBe(filter);
            }
        }
    });
    (0, globals_1.test)('Result filtered/possible/all items', () => {
        const schema = (0, test_utils_1.jsToSchema)(simple_1.simpleTestSchema);
        const result = new result_1.Result(schema);
        const expectedFilteredItems = {
            color: {
                red: [schema.items[0]],
                blue: [],
            },
            size: {
                small: [schema.items[0]],
                large: [],
            },
        };
        const expectedPossibleItems = {
            color: {
                red: [schema.items[0], schema.items[2]],
                blue: [],
            },
            size: {
                small: [schema.items[0]],
                large: [],
            },
        };
        result.addFilteredItem(schema.items[0]);
        result.addAllItem(schema.items[1]);
        result.getGroup('color')
            .getFilter('red')
            .addPossibleItem(schema.items[2]);
        (0, globals_1.expect)(result.filteredItems).toEqual([schema.items[0]]);
        (0, globals_1.expect)(result.allItems).toEqual([schema.items[0], schema.items[1], schema.items[2]]);
        for (const group of schema.groups) {
            for (const filter of group.filters) {
                const filterResult = result.getGroup(group.name).getFilter(filter.name);
                (0, globals_1.expect)((0, test_utils_1.getSortedNames)(filterResult.filteredItems, 'data.name'))
                    .toEqual((0, test_utils_1.getSortedNames)(expectedFilteredItems[group.name][filter.name], 'data.name'));
                (0, globals_1.expect)((0, test_utils_1.getSortedNames)(filterResult.possibleItems, 'data.name'))
                    .toEqual((0, test_utils_1.getSortedNames)(expectedPossibleItems[group.name][filter.name], 'data.name'));
            }
        }
    });
});
