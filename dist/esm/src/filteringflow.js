import { Parser } from './parser';
import { Filtering } from './filtering';
export class FilteringFlow {
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
        this.#parser = this.initializeParser();
        this.#schema = this.initializeSchema();
        this.#filtering = this.initializeFiltering();
        this.initializeFilterListener();
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
    initializeParser(parserOptions) {
        return new Parser(parserOptions);
    }
    initializeSchema() {
        return this.parser.parseSchemaFromHtml(this.root);
    }
    initializeFiltering() {
        return new Filtering(this.schema);
    }
    initializeFilterListener() {
        for (const group of this.schema.groups) {
            for (const filter of group.filters) {
                const filterElement = filter.data.element;
                filterElement.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (filterElement.classList.contains(this.options.disabledFilterClass)) {
                        // Ignore click if the filter would give 0 results
                        return;
                    }
                    if (this.beforeFilter(filterElement)) {
                        filterElement.classList.toggle(this.parser.options.filterCheckedClass); // Check or uncheck filter
                        this.filter();
                    }
                });
            }
        }
    }
    beforeFilter(filterElement) {
        return true;
    }
    filter() {
        // Parse checked filter from HTML
        const filterData = this.parser.parseCheckedFilterDataFromHtml(this.root);
        const result = this.filtering.filter(filterData);
        this.handleFilterResult(result);
    }
    handleFilterResult(result) {
        for (const group of result.groups) {
            for (const filter of group.filters) {
                const filterElement = filter.schemaFilter.data.element;
                // Disable filter if it would give 0 results
                filterElement.classList.toggle(this.options.disabledFilterClass, filter.possibleItems.length === 0);
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
