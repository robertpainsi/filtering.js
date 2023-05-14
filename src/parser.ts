import {Filter, FilterData, FilterType, Group, GroupType, Item, Schema} from "./schema";

export interface ParseSchemaOptions {
    groupClass: string,
    filterClass: string,
    itemClass: string,
    itemFilterNameAttributePrefix: string,
    filterEnabledClass: string,
}

export class FilteringParser {

    static readonly #defaultOptions: ParseSchemaOptions = {
        groupClass: 'filtering-group',
        filterClass: 'filtering-filter',
        itemClass: 'filtering-item',
        itemFilterNameAttributePrefix: 'data-filter',
        filterEnabledClass: 'enabled',
    }

    readonly #options: ParseSchemaOptions;

    constructor(options?: ParseSchemaOptions | {}) {
        this.#options = {...FilteringParser.#defaultOptions, ...options};
    }

    parseSchemaFromHtml(element: HTMLElement, schema: Schema = new Schema()) {
        this.parseGroupsAndFiltersFromHtml(element, schema);
        for (const item of this.parseItemsFromHtml(element)) {
            schema.addItem(item);
        }
        return schema;
    }

    parseGroupsAndFiltersFromHtml(element: HTMLElement, schema: Schema) {
        const groupElements = [...element.querySelectorAll(`.${this.#options.groupClass}`)] as HTMLElement[];
        for (const groupElement of groupElements) {
            const groupName = groupElement.dataset.groupName;
            const groupLabel = groupElement.dataset.groupLabel || groupName;
            const groupType = groupElement.dataset.groupType as GroupType;
            const group = new Group(groupName, groupLabel, groupType, {
                element: groupElement,
            });

            const filterElements = [...groupElement.querySelectorAll(`.${this.#options.filterClass}`)] as HTMLElement[];
            for (const filterElement of filterElements) {
                const filterName = filterElement.dataset.filterName;
                const filterLabel = filterElement.dataset.filterLabel || filterName;
                const filterType = filterElement.dataset.filterType as FilterType;
                const filter = new Filter(filterName, filterLabel, filterType, {
                    element: filterElement,
                });

                group.addFilter(filter);
            }
            schema.addGroup(group);
        }
    }

    parseItemsFromHtml(element: HTMLElement) {
        const items: Item[] = [];

        const attributeRegex = new RegExp(`${this.#options.itemFilterNameAttributePrefix}-(?<groupName>.+)`, 'i');
        const itemElements = [...element.querySelectorAll(`.${this.#options.itemClass}`)] as HTMLElement[];
        for (const itemElement of itemElements) {
            const item = new Item({
                element: itemElement
            });
            for (const {name: attributeName, value: filterNames} of itemElement.attributes) {
                const match = attributeName.match(attributeRegex);
                if (match) {
                    const {groupName} = match.groups;
                    for (const filterName of filterNames.split(/\s*,\s*/)) {
                        item.addFilter(groupName, filterName);
                    }
                }
            }
            items.push(item);
        }
        return items;
    }

    parseEnabledFilterDataFromHtml(element: HTMLElement) {
        const filterData = new FilterData();
        const groupElements = [...element.querySelectorAll(`.${this.#options.groupClass}`)] as HTMLElement[];
        for (const groupElement of groupElements) {
            const groupName = groupElement.dataset.groupName;

            const filterElements = [...groupElement.querySelectorAll(`.${this.#options.filterClass}`)] as HTMLElement[];
            for (const filterElement of filterElements) {
                const filterName = filterElement.dataset.filterName;
                const filterType = filterElement.dataset.filterType as FilterType;

                if (filterElement.classList.contains(this.#options.filterEnabledClass)) {
                    if (filterType === FilterType.all) {
                        filterData.enableAllFilter(groupName);
                        break;
                    } else {
                        filterData.enableFilter(groupName, filterName);
                    }
                }
            }
        }
        return filterData;
    }
}
