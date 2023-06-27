import { describe, expect, test } from '@jest/globals';
import { Filter, Group, Item, Schema } from './schema';
import { FilterData } from './filtering';
describe('Schema', () => {
    test('addGroup', () => {
        const schema = new Schema();
        const group = new Group('group');
        schema.addGroup(group);
        expect(schema.groups.length).toBe(1);
        expect(schema.groups).toContain(group);
    });
    test('Schema.addGroup already added', () => {
        const schema = new Schema();
        const group = new Group('group');
        schema.addGroup(group);
        expect(() => schema.addGroup(group)).toThrow();
    });
    test('Schema.addGroup name already added', () => {
        const schema = new Schema();
        const group1 = new Group('group');
        const group2 = new Group('group');
        schema.addGroup(group1);
        expect(() => schema.addGroup(group2)).toThrow();
    });
    test('Group.addFilter', () => {
        const group = new Group('group');
        const filter = new Filter('filter');
        group.addFilter(filter);
        expect(group.filters.length).toBe(1);
        expect(group.filters).toContain(filter);
    });
    test('Group.addFilter already added', () => {
        const group = new Group('group');
        const filter = new Filter('filter');
        group.addFilter(filter);
        expect(() => group.addFilter(filter)).toThrow();
    });
    test('Group.addFilter name already added', () => {
        const group = new Group('group');
        const filter1 = new Filter('filter');
        const filter2 = new Filter('filter');
        group.addFilter(filter1);
        expect(() => group.addFilter(filter2)).toThrow();
    });
    test('Item.addFilter with string group and filter', () => {
        const item = new Item({ name: 'item' });
        item.addFilter('group-1', 'filter-1');
        item.addFilter('group-2', 'filter-2');
        expect([...item.getGroupNames()].sort()).toEqual(['group-1', 'group-2'].sort());
        expect([...item.getFilterNames('group-1')]).toEqual(['filter-1']);
        expect([...item.getFilterNames('group-2')]).toEqual(['filter-2']);
    });
    test('Item.addFilter with Filter object', () => {
        const item = new Item({ name: 'item' });
        const group = new Group('group');
        const filter = new Filter('filter');
        group.addFilter(filter);
        item.addFilter(filter);
        expect([...item.getGroupNames()].sort()).toEqual(['group'].sort());
        expect([...item.getFilterNames('group')]).toEqual(['filter']);
    });
    test('FilterData.checkFilter', () => {
        const filterData = new FilterData();
        filterData.checkFilter('group', 'filter');
        expect(filterData.checkedFilters.has('group')).toBe(true);
        expect(filterData.checkedFilters.get('group').has('filter')).toBe(true);
    });
    test('FilterData.disableGroup', () => {
        const filterData = new FilterData();
        filterData.checkFilter('group', 'filter');
        filterData.disableGroup('group');
        expect(filterData.checkedFilters.has('group')).toBe(false);
        filterData.checkFilter('group', 'filter');
        expect(filterData.checkedFilters.has('group')).toBe(false);
    });
    test('FilterData.clone', () => {
        const filterData = new FilterData();
        filterData.checkFilter('group', 'filter');
        const clone = filterData.clone();
        expect(filterData).not.toBe(clone);
        expect(filterData.checkedFilters).not.toBe(clone.checkedFilters);
        expect(filterData.checkedFilters).toEqual(clone.checkedFilters);
    });
});
