"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const globals_1 = require("@jest/globals");
const filteringflow_1 = require("./filteringflow");
const test_utils_1 = require("../test/test-utils");
const schema_1 = require("./schema");
const parser_1 = require("./parser");
const filtering_1 = require("./filtering");
(0, globals_1.describe)('FilteringFlow', () => {
    (0, globals_1.test)('FilteringFlow calls initialize methods', () => {
        const initializeParserSpy = globals_1.jest.spyOn(filteringflow_1.FilteringFlow.prototype, 'initializeParser');
        const initializeSchemaSpy = globals_1.jest.spyOn(filteringflow_1.FilteringFlow.prototype, 'initializeSchema');
        const initializeFilteringSpy = globals_1.jest.spyOn(filteringflow_1.FilteringFlow.prototype, 'initializeFiltering');
        const initializeFilterListenerSpy = globals_1.jest.spyOn(filteringflow_1.FilteringFlow.prototype, 'initializeFilterListener');
        const filterListenerSpy = globals_1.jest.spyOn(filteringflow_1.FilteringFlow.prototype, 'filter');
        new filteringflow_1.FilteringFlow((0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsx)("div", {})));
        (0, globals_1.expect)(initializeParserSpy).toBeCalledTimes(1);
        (0, globals_1.expect)(initializeSchemaSpy).toBeCalledTimes(1);
        (0, globals_1.expect)(initializeFilteringSpy).toBeCalledTimes(1);
        (0, globals_1.expect)(initializeFilterListenerSpy).toBeCalledTimes(1);
        (0, globals_1.expect)(filterListenerSpy).toBeCalledTimes(1);
    });
    (0, globals_1.test)('FilteringFlow triggerFilterAfterInitializing', () => {
        const filterListenerSpyDisabled = globals_1.jest.spyOn(filteringflow_1.FilteringFlow.prototype, 'filter');
        filterListenerSpyDisabled.mockClear();
        new filteringflow_1.FilteringFlow((0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsx)("div", {})), {
            triggerFilterAfterInitializing: false,
        });
        (0, globals_1.expect)(filterListenerSpyDisabled).toBeCalledTimes(0);
        const filterListenerSpyEnabled = globals_1.jest.spyOn(filteringflow_1.FilteringFlow.prototype, 'filter');
        new filteringflow_1.FilteringFlow((0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsx)("div", {})), {
            triggerFilterAfterInitializing: true,
        });
        (0, globals_1.expect)(filterListenerSpyEnabled).toBeCalledTimes(1);
    });
    (0, globals_1.test)('FilteringFlow filter', () => {
        const parser = new parser_1.Parser();
        const schema = new schema_1.Schema();
        const filtering = new filtering_1.Filtering(schema);
        class MyFilteringFlow extends filteringflow_1.FilteringFlow {
            initializeParser(parserOptions) {
                return parser;
            }
            initializeSchema() {
                return schema;
            }
            initializeFiltering(filteringOptions) {
                return filtering;
            }
        }
        const myFilteringFlow = new MyFilteringFlow((0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsx)("div", {})));
        (0, globals_1.expect)(myFilteringFlow.parser).toBe(parser);
        (0, globals_1.expect)(myFilteringFlow.schema).toBe(schema);
        (0, globals_1.expect)(myFilteringFlow.filtering).toBe(filtering);
    });
    /*
    test('FilteringFlow initializeFilterListener', () => {
        const jsx = (
            <div>
                <div id="filtering">
                    <div className="filtering-group" data-group-name="color">
                        <div className="filtering-filter" data-filter-name="red"></div>
                        <div className="filtering-filter" data-filter-name="blue"></div>
                    </div>
                </div>
                <div id="items">
                    <div id="item-1" className="filtering-item" data-filter-color="red"></div>
                    <div id="item-2" className="filtering-item" data-filter-color="blue"></div>
                </div>
            </div>
        );
        const html = jsxToHtml(jsx);
        const filteringFlow = new FilteringFlow(html);

        expect(html.querySelector('*[data-filter-name="red"]').classList.contains('checked')).toBe(true);
        expect(html.querySelector('*[data-filter-name="blue"]').classList.contains('checked')).toBe(false);
        expect(html.querySelector('#item-1').classList.contains('filtered')).toBe(true);
        expect(html.querySelector('#item-2').classList.contains('filtered')).toBe(false);
    });
     */
});
