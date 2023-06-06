import {Schema} from "./schema";
import {Parser, ParserOptions} from "./parser";
import {Filtering} from "./filtering";
import {Result} from './result';

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

        this.#parser = this.initializeParser();
        this.#schema = this.initializeSchema();
        this.#filtering = this.initializeFiltering();
        this.initializeFilterListener();

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

    initializeParser(parserOptions?: ParserOptions): Parser {
        return new Parser(parserOptions);
    }

    initializeSchema(): Schema {
        return this.parser.parseSchemaFromHtml(this.root);
    }

    initializeFiltering(): Filtering {
        return new Filtering(this.schema);
    }

    initializeFilterListener() {
        for (const group of this.schema.groups) {
            for (const filter of group.filters) {
                const filterElement = filter.data.element as HTMLElement;
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
                })
            }
        }
    }

    beforeFilter(filterElement: HTMLElement) {
        return true;
    }

    filter() {
        // Parse checked filter from HTML
        const filterData = this.parser.parseCheckedFilterDataFromHtml(this.root);
        const result = this.filtering.filter(filterData);

        this.handleFilterResult(result);
    }

    handleFilterResult(result: Result) {
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
