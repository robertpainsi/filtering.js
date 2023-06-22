import { Filter, Group, Item, Schema } from './schema';
import { FilterData } from './filtering';
import { getTagName } from './utils';
export class Parser {
    static #defaultOptions = {
        groupClass: 'filtering-group',
        filterClass: 'filtering-filter',
        itemClass: 'filtering-item',
        itemFilterNameAttributePrefix: 'data-filter',
        filterCheckedClass: 'checked',
    };
    #options;
    constructor(options = {}) {
        this.#options = { ...Parser.#defaultOptions, ...options };
    }
    get options() {
        return this.#options;
    }
    parseSchemaFromHtml(root, schema = new Schema()) {
        for (const group of this.parseGroupsAndFiltersFromHtml(root)) {
            schema.addGroup(group);
        }
        for (const item of this.parseItemsFromHtml(root)) {
            schema.addItem(item);
        }
        return schema;
    }
    parseGroupsAndFiltersFromHtml(root, schema = null) {
        const groups = [];
        for (const groupElement of root.getElementsByClassName(this.#options.groupClass)) {
            const groupName = groupElement.dataset.groupName;
            if (groupName === undefined) {
                continue;
            }
            const group = new Group(groupName, {
                element: groupElement,
                label: groupElement.dataset.groupLabel,
            });
            for (const filterElement of groupElement.getElementsByClassName(this.#options.filterClass)) {
                const filterName = filterElement.dataset.filterName;
                if (filterElement.dataset.filterType !== 'all' && filterName === undefined) {
                    continue;
                }
                const filter = new Filter(filterName, {
                    element: filterElement,
                    label: filterElement.dataset.filterLabel,
                });
                group.addFilter(filter);
            }
            groups.push(group);
        }
        if (schema !== null) {
            for (const group of groups) {
                schema.addGroup(group);
            }
        }
        return groups;
    }
    parseItemsFromHtml(root, schema = null) {
        const items = [];
        const attributeRegex = new RegExp(`${this.#options.itemFilterNameAttributePrefix}-(?<groupName>.+)`, 'i');
        for (const itemElement of root.getElementsByClassName(this.#options.itemClass)) {
            const item = new Item({
                element: itemElement,
            });
            for (const { name: attributeName, value: filterNames } of itemElement.attributes) {
                const match = attributeName.match(attributeRegex);
                if (match) {
                    const { groupName } = match.groups;
                    for (const filterName of filterNames.split(/\s*,\s*/)) {
                        item.addFilter(groupName, filterName);
                    }
                }
            }
            items.push(item);
        }
        if (schema !== null) {
            schema.addItems(items);
        }
        return items;
    }
    parseCheckedFilterDataFromHtml(root) {
        const filterData = new FilterData();
        for (const groupElement of root.getElementsByClassName(this.#options.groupClass)) {
            const groupName = groupElement.dataset.groupName;
            for (const filterElement of groupElement.getElementsByClassName(this.#options.filterClass)) {
                const filterName = filterElement.dataset.filterName;
                if (getTagName(filterElement) === 'input' && filterElement.checked
                    || getTagName(filterElement) !== 'input' && filterElement.classList.contains(this.#options.filterCheckedClass)) {
                    if (filterElement.dataset.filterType === 'all') {
                        filterData.disableGroup(groupName);
                    }
                    else {
                        filterData.checkFilter(groupName, filterName);
                    }
                }
            }
        }
        return filterData;
    }
}
