"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteringFlow = void 0;
const parser_1 = require("./parser");
const filtering_1 = require("./filtering");
const utils_1 = require("./utils");
class FilteringFlow {
    #options;
    static defaultOptions = {
        triggerFilterAfterInitializing: true,
        disabledFilterClass: 'disabled',
        filteredItemClass: 'filtered',
    };
    #root;
    #schema;
    #parser;
    #filtering;
    constructor(root, options = {}) {
        this.#root = root;
        this.#options = { ...FilteringFlow.defaultOptions, ...options };
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
    get options() {
        return this.#options;
    }
    get root() {
        return this.#root;
    }
    get schema() {
        return this.#schema;
    }
    get parser() {
        return this.#parser;
    }
    get filtering() {
        return this.#filtering;
    }
    beforeInitializing() {
    }
    initializeParser() {
        return new parser_1.Parser(this.parserOptions);
    }
    get parserOptions() {
        return undefined;
    }
    initializeSchema() {
        return this.parser.parseSchemaFromHtml(this.root);
    }
    initializeFiltering() {
        return new filtering_1.Filtering(this.schema, this.filteringOptions);
    }
    get filteringOptions() {
        return undefined;
    }
    initializeFilterListener() {
        for (const group of this.schema.groups) {
            const groupElement = group.data.element;
            for (const filter of group.filters) {
                const filterElement = filter.data.element;
                if ((0, utils_1.getTagName)(filterElement) === 'input') {
                    filterElement.addEventListener('change', (event) => {
                        if (this.beforeFilter(filterElement)) {
                            if (filterElement.dataset.filterType === 'all') {
                                this.#uncheckAllFiltersInGroup(group);
                                filterElement.checked = true;
                            }
                            else {
                                this.#uncheckAllFilterInGroup(group);
                            }
                            this.filter();
                        }
                    });
                }
                else {
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
                            }
                            else {
                                if (groupElement.dataset.selectType === 'single' && !filterElement.classList.contains(this.parser.options.filterCheckedClass)) {
                                    this.#uncheckAllFiltersInGroup(group);
                                }
                                else if (filterElement.dataset.filterType !== 'all') {
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
    #uncheckAllFiltersInGroup(group) {
        for (const filter of group.filters) {
            const filterElement = filter.data.element;
            if ((0, utils_1.getTagName)(filterElement) === 'input') {
                filterElement.checked = false;
            }
            else {
                filterElement.classList.remove(this.parser.options.filterCheckedClass);
            }
        }
    }
    #uncheckAllFilterInGroup(group) {
        for (const filter of group.filters) {
            const filterElement = filter.data.element;
            if (filterElement.dataset.filterType === 'all') {
                if ((0, utils_1.getTagName)(filterElement) === 'input') {
                    filterElement.checked = false;
                }
                else {
                    filterElement.classList.remove(this.parser.options.filterCheckedClass);
                }
            }
        }
    }
    afterInitializing() {
    }
    beforeFilter(filterElement) {
        return true;
    }
    filter(filterData) {
        if (!filterData) {
            // Parse checked filter from HTML
            filterData = this.parser.parseCheckedFilterDataFromHtml(this.root);
        }
        else {
            // Check/uncheck filters using passed argument filterData
            for (const group of this.schema.groups) {
                for (const filter of group.filters) {
                    const filterElement = filter.data.element;
                    if ((0, utils_1.getTagName)(filterElement) === 'input') {
                        filterElement.checked = !!filterData.checkedFilters.get(group.name)?.has(filter.name);
                    }
                    else {
                        filterElement.classList.toggle(this.parser.options.filterCheckedClass, filterData.checkedFilters.get(group.name)?.has(filter.name));
                    }
                }
            }
        }
        const result = this.filtering.filter(filterData);
        this.handleFilterResult(result, filterData);
        return result;
    }
    handleFilterResult(result, filterData) {
        for (const group of result.groups) {
            for (const filter of group.filters) {
                const filterElement = filter.schemaFilter.data.element;
                if (filterElement.dataset.filterType === 'all') {
                    continue;
                }
                // Disable filter if it would give 0 results
                if ((0, utils_1.getTagName)(filterElement) === 'input') {
                    filterElement.disabled = filter.possibleItems.length === 0;
                }
                else {
                    filterElement.classList.toggle(this.options.disabledFilterClass, filter.possibleItems.length === 0);
                }
            }
        }
        for (const item of result.allItems) {
            // Show or hide items
            item.data.element.classList.toggle(this.options.filteredItemClass, !result.filteredItems.includes(item));
        }
        for (const item of this.schema.items) {
            item.data.element.classList.toggle(this.options.filteredItemClass, !result.filteredItems.includes(item) || !result.allItems.includes(item));
        }
    }
}
exports.FilteringFlow = FilteringFlow;
