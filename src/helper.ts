import {Schema} from "./schema";
import {Parser, ParserOptions} from "./parser";
import {Filtering, FilteringOptions} from "./filtering";

export class FilteringFlow {

    readonly options: FilteringFlowOptions;
    static readonly defaultOptions: FilteringFlowOptions = {
        triggerFilterAfterInitializing: true,
        disabledFilterClass: 'disabled',
        filteredItemClass: 'filtered',
    }

    readonly root: HTMLElement;
    schema: Schema;
    parser: Parser;
    filtering: Filtering;

    constructor(root: HTMLElement, options: FilteringFlowOptions = {}) {
        this.root = root;
        this.options = {...FilteringFlow.defaultOptions, ...options};

        this.initializeParser();
        this.initializeSchema();
        this.initializeFiltering();
        this.initializeFilterListener();

        if (this.options.triggerFilterAfterInitializing) {
            this.filter();
        }
    }

    initializeParser(parserOptions?: ParserOptions) {
        this.parser = new Parser(parserOptions);
        return this.parser;
    }

    initializeSchema() {
        this.schema = this.parser.parseSchemaFromHtml(this.root);
        return this.schema;
    }

    initializeFiltering(filteringOptions?: FilteringOptions) {
        this.filtering = new Filtering(this.schema, filteringOptions);
        return this.filtering;
    }

    initializeFilterListener() {
        for (const filterElement of this.root.getElementsByClassName(this.parser.options.filterClass) as HTMLCollectionOf<HTMLElement>) {
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

    beforeFilter(filterElement: HTMLElement) {
        return true;
    }

    filter() {
        // Parse checked filter from HTML
        const filterData = this.parser.parseCheckedFilterDataFromHtml(this.root);
        const result = this.filtering.filter(filterData);
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
        return result;
    }
}

interface FilteringFlowOptions {
    disabledFilterClass?: string,
    filteredItemClass?: string,
    triggerFilterAfterInitializing?: boolean,
}
