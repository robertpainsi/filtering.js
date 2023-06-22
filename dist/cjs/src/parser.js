"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const schema_1 = require("./schema");
const filtering_1 = require("./filtering");
const utils_1 = require("./utils");
class Parser {
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
    parseSchemaFromHtml(root, schema = new schema_1.Schema()) {
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
            const group = new schema_1.Group(groupName, {
                element: groupElement,
                label: groupElement.dataset.groupLabel,
            });
            for (const filterElement of groupElement.getElementsByClassName(this.#options.filterClass)) {
                const filterName = filterElement.dataset.filterName;
                if (filterElement.dataset.filterType !== 'all' && filterName === undefined) {
                    continue;
                }
                const filter = new schema_1.Filter(filterName, {
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
            const item = new schema_1.Item({
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
        const filterData = new filtering_1.FilterData();
        for (const groupElement of root.getElementsByClassName(this.#options.groupClass)) {
            const groupName = groupElement.dataset.groupName;
            for (const filterElement of groupElement.getElementsByClassName(this.#options.filterClass)) {
                const filterName = filterElement.dataset.filterName;
                if ((0, utils_1.getTagName)(filterElement) === 'input' && filterElement.checked
                    || (0, utils_1.getTagName)(filterElement) !== 'input' && filterElement.classList.contains(this.#options.filterCheckedClass)) {
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
exports.Parser = Parser;
