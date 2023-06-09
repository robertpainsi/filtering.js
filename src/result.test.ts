import {describe, expect, test} from '@jest/globals';
import {Result} from './result';
import {getSortedNames, jsToSchema} from '../test/test-utils';
import {Item} from './schema';
import {simpleTestGroups, simpleTestSchema} from '../test/data/simple';

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
        const result = new Result(schema);

        const expectedFilteredItems: {
            [key: string]: {
                [key: string]: Item[],
            }
        } = {
            color: {
                red: [schema.items[0]],
                blue: [],
            },
            size: {
                small: [schema.items[0]],
                large: [],
            },
        }

        const expectedPossibleItems: {
            [key: string]: {
                [key: string]: Item[],
            }
        } = {
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

        expect(result.filteredItems).toEqual([schema.items[0]]);
        expect(result.allItems).toEqual([schema.items[0], schema.items[1], schema.items[2]]);
        for (const group of schema.groups) {
            for (const filter of group.filters) {
                const filterResult = result.getGroup(group.name).getFilter(filter.name);
                expect(getSortedNames(filterResult.filteredItems, 'data.name'))
                    .toEqual(getSortedNames(expectedFilteredItems[group.name][filter.name], 'data.name'));
                expect(getSortedNames(filterResult.possibleItems, 'data.name'))
                    .toEqual(getSortedNames(expectedPossibleItems[group.name][filter.name], 'data.name'));
            }
        }
    });
});
