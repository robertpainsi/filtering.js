"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const globals_1 = require("@jest/globals");
const filteringflow_1 = require("./filteringflow");
const test_utils_1 = require("../test/test-utils");
const schema_1 = require("./schema");
const parser_1 = require("./parser");
const filtering_1 = require("./filtering");
const colors_1 = require("../test/data/colors");
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
    (0, globals_1.test)('FilteringFlow filter with parameter', () => {
        const filteringFlow = new filteringflow_1.FilteringFlow(colors_1.jsxColors);
        (0, globals_1.expect)(filteringFlow.filter().filteredItems.length).toBe(3);
        const filterData = new filtering_1.FilterData();
        filterData.checkFilter('color', 'red');
        const result = filteringFlow.filter(filterData);
        (0, globals_1.expect)(result.filteredItems.length).toBe(1);
        (0, globals_1.expect)(result.filteredItems[0].data.element.dataset.filterColor).toBe('red');
        (0, globals_1.expect)(result.getGroup('color').getFilter('red').schemaFilter.data.element.classList.contains('checked')).toBeTruthy();
        (0, globals_1.expect)(result.getGroup('color').getFilter('green').schemaFilter.data.element.classList.contains('checked')).toBeFalsy();
        (0, globals_1.expect)(result.getGroup('color').getFilter('blue').schemaFilter.data.element.classList.contains('checked')).toBeFalsy();
    });
    (0, globals_1.test)('FilteringFlow single select filter', () => {
        const filteringFlow = new filteringflow_1.FilteringFlow(colors_1.jsxColorsSingleSelect);
        const schema = filteringFlow.schema;
        schema.getGroup('color').getFilter('red').data.element.click();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeTruthy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeFalsy();
        schema.getGroup('color').getFilter('blue').data.element.click();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeTruthy();
    });
    (0, globals_1.test)('FilteringFlow select all filters', () => {
        const filteringFlow = new filteringflow_1.FilteringFlow(colors_1.jsxColorsWithTypeAll);
        const schema = filteringFlow.schema;
        schema.getGroup('color').getFilter('red').data.element.click();
        schema.getGroup('color').getFilter('green').data.element.click();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeTruthy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeTruthy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeFalsy();
        schema.getGroup('color').getFilter('all').data.element.click();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('all').data.element.classList.contains('checked')).toBeTruthy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeFalsy();
        schema.getGroup('color').getFilter('red').data.element.click();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('all').data.element.classList.contains('checked')).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeTruthy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeFalsy();
    });
    (0, globals_1.test)('FilteringFlow single select filter with input', () => {
        const filteringFlow = new filteringflow_1.FilteringFlow(colors_1.jsxColorsSingleSelectInput);
        const schema = filteringFlow.schema;
        schema.getGroup('color').getFilter('red').data.element.click();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('red').data.element.checked).toBeTruthy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('green').data.element.checked).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('blue').data.element.checked).toBeFalsy();
        schema.getGroup('color').getFilter('blue').data.element.click();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('red').data.element.checked).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('green').data.element.checked).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('blue').data.element.checked).toBeTruthy();
    });
    (0, globals_1.test)('FilteringFlow select all filters with input', () => {
        const filteringFlow = new filteringflow_1.FilteringFlow(colors_1.jsxColorsWithTypeAllInput);
        const schema = filteringFlow.schema;
        schema.getGroup('color').getFilter('red').data.element.click();
        schema.getGroup('color').getFilter('green').data.element.click();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('red').data.element.checked).toBeTruthy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('green').data.element.checked).toBeTruthy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('blue').data.element.checked).toBeFalsy();
        schema.getGroup('color').getFilter('all').data.element.click();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('red').data.element.checked).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('green').data.element.checked).toBeFalsy();
        (0, globals_1.expect)(schema.getGroup('color').getFilter('blue').data.element.checked).toBeFalsy();
    });
});
