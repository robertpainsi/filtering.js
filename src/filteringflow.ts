import {Group, Schema} from './schema';
import {Parser} from './parser';
import {FilterData, Filtering} from './filtering';
import {Result} from './result';
import {getTagName} from './utils';

export class FilteringFlow {

    readonly #options: FilteringFlowOptions;
    static readonly defaultOptions: FilteringFlowOptions = {
        triggerFilterAfterInitializing: true,
        disabledFilterClass: 'disabled',
        filteredItemClass: 'filtered',
    }

    readonly #root: HTMLElement;
    readonly #schema: Schema;
    readonly #parser: Parser;
    readonly #filtering: Filtering;

    constructor(root: HTMLElement, options: FilteringFlowOptions = {}) {
        this.#root = root;
        this.#options = {...FilteringFlow.defaultOptions, ...options};

        this.beforeInitializing();
        this.#parser = this.initializeParser();
        this.#schema = this.initializeSchema();
        this.#filtering = this.initializeFiltering();
        this.initializeFilterListener();
        this.afterInitializing();

        if (this.options.triggerFilterAfterInitializing) {
            this.filter();
        }
    }

    get options(): FilteringFlowOptions {
        return this.#options;
    }

    get root(): HTMLElement {
        return this.#root;
    }

    get schema(): Schema {
        return this.#schema;
    }

    get parser(): Parser {
        return this.#parser;
    }

    get filtering(): Filtering {
        return this.#filtering;
    }

    beforeInitializing() {
    }

    initializeParser(): Parser {
        return new Parser(this.parserOptions);
    }

    get parserOptions() {
        return undefined;
    }

    initializeSchema(): Schema {
        return this.parser.parseSchemaFromHtml(this.root);
    }

    initializeFiltering(): Filtering {
        return new Filtering(this.schema, this.filteringOptions);
    }

    get filteringOptions() {
        return undefined;
    }

    initializeFilterListener() {
        for (const group of this.schema.groups) {
            const groupElement = group.data.element as HTMLElement;
            for (const filter of group.filters) {
                const filterElement = filter.data.element as HTMLElement;
                if (getTagName(filterElement) === 'input') {
                    filterElement.addEventListener('change', (event) => {
                        if (this.beforeFilter(filterElement)) {
                            if (filterElement.dataset.filterType === 'all') {
                                this.#uncheckAllFiltersInGroup(group);
                                (filterElement as HTMLInputElement).checked = true;
                            } else {
                                this.#uncheckAllFilterInGroup(group);
                            }
                            this.filter();
                        }
                    })
                } else {
                    filterElement.addEventListener('click', (event) => {
                        event.preventDefault();
                        if (filterElement.classList.contains(this.options.disabledFilterClass)) {
                            // Ignore click if the filter would give 0 results
                            return;
                        }
                        if (this.beforeFilter(filterElement)) {
                            if (filterElement.dataset.filterType === 'all') {
                                this.#uncheckAllFiltersInGroup(group);
                                filterElement.classList.add(this.parser.options.filterCheckedClass);
                            } else {
                                if (groupElement.dataset.selectType === 'single' && !filterElement.classList.contains(this.parser.options.filterCheckedClass)) {
                                    this.#uncheckAllFiltersInGroup(group);
                                } else if (filterElement.dataset.filterType !== 'all') {
                                    this.#uncheckAllFilterInGroup(group);
                                }
                                filterElement.classList.toggle(this.parser.options.filterCheckedClass);
                            }
                            this.filter();
                        }
                    });
                }
            }
        }
    }

    #uncheckAllFiltersInGroup(group: Group) {
        for (const filter of group.filters) {
            const filterElement = filter.data.element;
            if (getTagName(filterElement) === 'input') {
                filterElement.checked = false;
            } else {
                filterElement.classList.remove(this.parser.options.filterCheckedClass);
            }
        }
    }

    #uncheckAllFilterInGroup(group: Group) {
        for (const filter of group.filters) {
            const filterElement = filter.data.element;
            if (filterElement.dataset.filterType === 'all') {
                if (getTagName(filterElement) === 'input') {
                    filterElement.checked = false;
                } else {
                    filterElement.classList.remove(this.parser.options.filterCheckedClass);
                }
            }
        }
    }

    afterInitializing() {
    }

    beforeFilter(filterElement: HTMLElement) {
        return true;
    }

    filter(filterData?: FilterData) {
        if (!filterData) {
            // Parse checked filter from HTML
            filterData = this.parser.parseCheckedFilterDataFromHtml(this.root);
        } else {
            // Check/uncheck filters using passed argument filterData
            for (const group of this.schema.groups) {
                for (const filter of group.filters) {
                    const filterElement = filter.data.element;
                    if (getTagName(filterElement) === 'input') {
                        filterElement.checked = !!filterData.checkedFilters.get(group.name)?.has(filter.name);
                    } else {
                        filterElement.classList.toggle(this.parser.options.filterCheckedClass, !!filterData.checkedFilters.get(group.name)?.has(filter.name));
                    }
                }
            }
        }
        const result = this.filtering.filter(filterData);
        this.handleFilterResult(result, filterData);
        return result;
    }

    handleFilterResult(result: Result, filterData?: FilterData) {
        for (const group of result.groups) {
            for (const filter of group.filters) {
                const filterElement = filter.schemaFilter.data.element;

                if (filterElement.dataset.filterType === 'all') {
                    continue;
                }

                // Disable filter if it would give 0 results
                if (getTagName(filterElement) === 'input') {
                    filterElement.disabled = filter.possibleItems.length === 0;
                } else {
                    filterElement.classList.toggle(this.options.disabledFilterClass, filter.possibleItems.length === 0);
                }
            }
        }
        for (const item of result.allItems) {
            // Show or hide items
            item.data.element.classList.toggle(this.options.filteredItemClass, !result.filteredItems.includes(item));
        }
        for (const item of this.schema.items) {
            item.data.element.classList.toggle(this.options.filteredItemClass,
                !result.filteredItems.includes(item) || !result.allItems.includes(item),
            );
        }
    }
}

interface FilteringFlowOptions {
    disabledFilterClass?: string,
    filteredItemClass?: string,
    triggerFilterAfterInitializing?: boolean,
}
