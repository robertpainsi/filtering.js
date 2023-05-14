import {Filter, FilterData, FilterType, Group, GroupType, Item, Schema} from "./schema";

export function parseSchemaFromHtml(element: HTMLElement) {
    const schema = new Schema();
    const groupElements = [...element.querySelectorAll('.filtering-group')] as HTMLElement[];
    for (const groupElement of groupElements) {
        const groupName = groupElement.dataset.groupName;
        const groupLabel = groupElement.dataset.groupLabel || groupName;
        const groupType = groupElement.dataset.groupType as GroupType;
        const group = new Group(groupName, groupLabel, groupType, {
            element: groupElement,
        });

        const filterElements = [...groupElement.querySelectorAll('.filtering-filter')] as HTMLElement[];
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

    for (const item of parseItemsFromHtml(element)) {
        schema.addItem(item);
    }
    return schema;
}

export function parseEnabledFilterDataFromHtml(element: HTMLElement) {
    const filterData = new FilterData();
    const groupElements = [...element.querySelectorAll('.filtering-group')] as HTMLElement[];
    for (const groupElement of groupElements) {
        const groupName = groupElement.dataset.groupName;

        const filterElements = [...groupElement.querySelectorAll('.filtering-filter')] as HTMLElement[];
        for (const filterElement of filterElements) {
            const filterName = filterElement.dataset.filterName;
            const filterType = filterElement.dataset.filterType as FilterType;

            if (filterElement.classList.contains('enabled')) {
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

export function parseItemsFromHtml(element: HTMLElement) {
    const items: Item[] = [];

    const itemElements = [...element.querySelectorAll('.filtering-item')] as HTMLElement[];
    for (const itemElement of itemElements) {
        const item = new Item({
            element: itemElement
        });
        for (const {name: attributeName, value: filterNames} of itemElement.attributes) {
            const match = attributeName.match(/data-filter-(?<groupName>.+)/i);
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
