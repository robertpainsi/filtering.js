import {describe, expect, test} from "@jest/globals";
import {Result} from "./result";
import {jsToSchema} from "../test/test-utils";
import {simpleTestGroups, simpleTestSchema} from "../test/test-data";

describe('Result', () => {
    test('Result structure should be the same as Schema', () => {
        const schema = jsToSchema({groups: simpleTestGroups});
        const result = new Result(schema);

        for (const group of schema.groups) {
            expect(result.getGroup(group.name).schemaGroup).toBe(group);
            for (const filter of group.filters) {
                expect(result.getGroup(group.name).getFilter(filter.name).schemaFilter).toBe(filter);
            }
        }
    });

    test('Result filtered/possible/all items', () => {
        const schema = jsToSchema(simpleTestSchema);
        const filteredItem = schema.items[0];
        const filteredItems = [filteredItem];
        const possibleItems = [schema.items[1]];
        const allItems = [schema.items[2]];
        const result = new Result(schema);

        result.addFilteredItem(filteredItem);

        expect(result.filteredItems).toEqual(filteredItems);
        expect(result.possibleItems).toEqual(possibleItems);
        expect(result.allItems).toEqual(allItems);
        for (const groupName of filteredItem.getGroupNames()) {
            for (const filterName of filteredItem.getFilterNames(groupName)) {
                const filterResult = result.getGroup(groupName).getFilter(filterName);
                expect(filterResult.filteredItems).toEqual(filteredItems);
            }
        }
    });
});
