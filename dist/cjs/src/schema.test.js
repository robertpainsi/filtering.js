"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const schema_1 = require("./schema");
const filtering_1 = require("./filtering");
(0, globals_1.describe)('Schema', () => {
    (0, globals_1.test)('addGroup', () => {
        const schema = new schema_1.Schema();
        const group = new schema_1.Group('group');
        schema.addGroup(group);
        (0, globals_1.expect)(schema.groups.length).toBe(1);
        (0, globals_1.expect)(schema.groups).toContain(group);
    });
    (0, globals_1.test)('Schema.addGroup already added', () => {
        const schema = new schema_1.Schema();
        const group = new schema_1.Group('group');
        schema.addGroup(group);
        (0, globals_1.expect)(() => schema.addGroup(group)).toThrow();
    });
    (0, globals_1.test)('Schema.addGroup name already added', () => {
        const schema = new schema_1.Schema();
        const group1 = new schema_1.Group('group');
        const group2 = new schema_1.Group('group');
        schema.addGroup(group1);
        (0, globals_1.expect)(() => schema.addGroup(group2)).toThrow();
    });
    (0, globals_1.test)('Group.addFilter', () => {
        const group = new schema_1.Group('group');
        const filter = new schema_1.Filter('filter');
        group.addFilter(filter);
        (0, globals_1.expect)(group.filters.length).toBe(1);
        (0, globals_1.expect)(group.filters).toContain(filter);
    });
    (0, globals_1.test)('Group.addFilter already added', () => {
        const group = new schema_1.Group('group');
        const filter = new schema_1.Filter('filter');
        group.addFilter(filter);
        (0, globals_1.expect)(() => group.addFilter(filter)).toThrow();
    });
    (0, globals_1.test)('Group.addFilter name already added', () => {
        const group = new schema_1.Group('group');
        const filter1 = new schema_1.Filter('filter');
        const filter2 = new schema_1.Filter('filter');
        group.addFilter(filter1);
        (0, globals_1.expect)(() => group.addFilter(filter2)).toThrow();
    });
    (0, globals_1.test)('Item.addFilter with string group and filter', () => {
        const item = new schema_1.Item({ name: 'item' });
        item.addFilter('group-1', 'filter-1');
        item.addFilter('group-2', 'filter-2');
        (0, globals_1.expect)([...item.getGroupNames()].sort()).toEqual(['group-1', 'group-2'].sort());
        (0, globals_1.expect)([...item.getFilterNames('group-1')]).toEqual(['filter-1']);
        (0, globals_1.expect)([...item.getFilterNames('group-2')]).toEqual(['filter-2']);
    });
    (0, globals_1.test)('Item.addFilter with Filter object', () => {
        const item = new schema_1.Item({ name: 'item' });
        const group = new schema_1.Group('group');
        const filter = new schema_1.Filter('filter');
        group.addFilter(filter);
        item.addFilter(filter);
        (0, globals_1.expect)([...item.getGroupNames()].sort()).toEqual(['group'].sort());
        (0, globals_1.expect)([...item.getFilterNames('group')]).toEqual(['filter']);
    });
    (0, globals_1.test)('FilterData.checkFilter', () => {
        const filterData = new filtering_1.FilterData();
        filterData.checkFilter('group', 'filter');
        (0, globals_1.expect)(filterData.checkedFilters.has('group')).toBe(true);
        (0, globals_1.expect)(filterData.checkedFilters.get('group').has('filter')).toBe(true);
    });
    (0, globals_1.test)('FilterData.disableGroup', () => {
        const filterData = new filtering_1.FilterData();
        filterData.checkFilter('group', 'filter');
        filterData.disableGroup('group');
        (0, globals_1.expect)(filterData.checkedFilters.has('group')).toBe(false);
        filterData.checkFilter('group', 'filter');
        (0, globals_1.expect)(filterData.checkedFilters.has('group')).toBe(false);
    });
    (0, globals_1.test)('FilterData.clone', () => {
        const filterData = new filtering_1.FilterData();
        filterData.checkFilter('group', 'filter');
        const clone = filterData.clone();
        (0, globals_1.expect)(filterData).not.toBe(clone);
        (0, globals_1.expect)(filterData.checkedFilters).not.toBe(clone.checkedFilters);
        (0, globals_1.expect)(filterData.checkedFilters).toEqual(clone.checkedFilters);
    });
});
