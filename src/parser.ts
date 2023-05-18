import {Filter, FilterData, Group, Item, Schema} from "./schema";

export interface ParserOptions {
    groupClass: string,
    filterClass: string,
    itemClass: string,
    itemFilterNameAttributePrefix: string,
    filterCheckedClass: string,
}

export class Parser {

    static readonly #defaultOptions: ParserOptions = {
        groupClass: 'filtering-group',
        filterClass: 'filtering-filter',
        itemClass: 'filtering-item',
        itemFilterNameAttributePrefix: 'data-filter',
        filterCheckedClass: 'checked',
    }

    readonly #options: ParserOptions;

    constructor(options?: ParserOptions | {}) {
        this.#options = {...Parser.#defaultOptions, ...options};
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
            if (groupName === undefined) {
                continue;
            }
            const group = new Group(groupName, {
                element: groupElement,
                label: groupElement.dataset.groupLabel,
            });

            const filterElements = [...groupElement.querySelectorAll(`.${this.#options.filterClass}`)] as HTMLElement[];
            for (const filterElement of filterElements) {
                const filterName = filterElement.dataset.filterName;
                if (filterName === undefined) {
                    continue;
                }
                const filter = new Filter(filterName, {
                    element: filterElement,
                    label: filterElement.dataset.filterLabel,
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

    parseCheckedFilterDataFromHtml(element: HTMLElement) {
        const filterData = new FilterData();
        const groupElements = [...element.querySelectorAll(`.${this.#options.groupClass}`)] as HTMLElement[];
        for (const groupElement of groupElements) {
            const groupName = groupElement.dataset.groupName;

            const filterElements = [...groupElement.querySelectorAll(`.${this.#options.filterClass}`)] as HTMLElement[];
            for (const filterElement of filterElements) {
                const filterName = filterElement.dataset.filterName;

                if (filterElement.classList.contains(this.#options.filterCheckedClass)) {
                    filterData.checkFilter(groupName, filterName);
                }
            }
        }
        return filterData;
    }
}
