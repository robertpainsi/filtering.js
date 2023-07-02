import { jsx as _jsx } from "react/jsx-runtime";
import { describe, expect, jest, test } from '@jest/globals';
import { FilteringFlow } from './filteringflow';
import { jsxToHtml } from '../test/test-utils';
import { Schema } from './schema';
import { Parser } from './parser';
import { FilterData, Filtering } from './filtering';
import { jsxColors, jsxColorsSingleSelect, jsxColorsSingleSelectInput, jsxColorsWithTypeAll, jsxColorsWithTypeAllInput, } from '../test/data/colors';
describe('FilteringFlow', () => {
    test('FilteringFlow calls initialize methods', () => {
        const initializeParserSpy = jest.spyOn(FilteringFlow.prototype, 'initializeParser');
        const initializeSchemaSpy = jest.spyOn(FilteringFlow.prototype, 'initializeSchema');
        const initializeFilteringSpy = jest.spyOn(FilteringFlow.prototype, 'initializeFiltering');
        const initializeFilterListenerSpy = jest.spyOn(FilteringFlow.prototype, 'initializeFilterListener');
        const filterListenerSpy = jest.spyOn(FilteringFlow.prototype, 'filter');
        new FilteringFlow(jsxToHtml(_jsx("div", {})));
        expect(initializeParserSpy).toBeCalledTimes(1);
        expect(initializeSchemaSpy).toBeCalledTimes(1);
        expect(initializeFilteringSpy).toBeCalledTimes(1);
        expect(initializeFilterListenerSpy).toBeCalledTimes(1);
        expect(filterListenerSpy).toBeCalledTimes(1);
    });
    test('FilteringFlow triggerFilterAfterInitializing', () => {
        const filterListenerSpyDisabled = jest.spyOn(FilteringFlow.prototype, 'filter');
        filterListenerSpyDisabled.mockClear();
        new FilteringFlow(jsxToHtml(_jsx("div", {})), {
            triggerFilterAfterInitializing: false,
        });
        expect(filterListenerSpyDisabled).toBeCalledTimes(0);
        const filterListenerSpyEnabled = jest.spyOn(FilteringFlow.prototype, 'filter');
        new FilteringFlow(jsxToHtml(_jsx("div", {})), {
            triggerFilterAfterInitializing: true,
        });
        expect(filterListenerSpyEnabled).toBeCalledTimes(1);
    });
    test('FilteringFlow filter', () => {
        const parser = new Parser();
        const schema = new Schema();
        const filtering = new Filtering(schema);
        class MyFilteringFlow extends FilteringFlow {
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
        const myFilteringFlow = new MyFilteringFlow(jsxToHtml(_jsx("div", {})));
        expect(myFilteringFlow.parser).toBe(parser);
        expect(myFilteringFlow.schema).toBe(schema);
        expect(myFilteringFlow.filtering).toBe(filtering);
    });
    test('FilteringFlow filter with parameter', () => {
        const filteringFlow = new FilteringFlow(jsxColors);
        expect(filteringFlow.filter().filteredItems.length).toBe(3);
        const filterData = new FilterData();
        filterData.checkFilter('color', 'red');
        const result = filteringFlow.filter(filterData);
        expect(result.filteredItems.length).toBe(1);
        expect(result.filteredItems[0].data.element.dataset.filterColor).toBe('red');
        expect(result.getGroup('color').getFilter('red').schemaFilter.data.element.classList.contains('checked')).toBeTruthy();
        expect(result.getGroup('color').getFilter('green').schemaFilter.data.element.classList.contains('checked')).toBeFalsy();
        expect(result.getGroup('color').getFilter('blue').schemaFilter.data.element.classList.contains('checked')).toBeFalsy();
    });
    test('FilteringFlow single select filter', () => {
        const filteringFlow = new FilteringFlow(jsxColorsSingleSelect);
        const schema = filteringFlow.schema;
        schema.getGroup('color').getFilter('red').data.element.click();
        expect(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeTruthy();
        expect(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeFalsy();
        expect(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeFalsy();
        schema.getGroup('color').getFilter('blue').data.element.click();
        expect(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeFalsy();
        expect(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeFalsy();
        expect(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeTruthy();
    });
    test('FilteringFlow select all filters', () => {
        const filteringFlow = new FilteringFlow(jsxColorsWithTypeAll);
        const schema = filteringFlow.schema;
        schema.getGroup('color').getFilter('red').data.element.click();
        schema.getGroup('color').getFilter('green').data.element.click();
        expect(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeTruthy();
        expect(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeTruthy();
        expect(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeFalsy();
        schema.getGroup('color').getFilter('all').data.element.click();
        expect(schema.getGroup('color').getFilter('all').data.element.classList.contains('checked')).toBeTruthy();
        expect(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeFalsy();
        expect(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeFalsy();
        expect(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeFalsy();
        schema.getGroup('color').getFilter('red').data.element.click();
        expect(schema.getGroup('color').getFilter('all').data.element.classList.contains('checked')).toBeFalsy();
        expect(schema.getGroup('color').getFilter('red').data.element.classList.contains('checked')).toBeTruthy();
        expect(schema.getGroup('color').getFilter('green').data.element.classList.contains('checked')).toBeFalsy();
        expect(schema.getGroup('color').getFilter('blue').data.element.classList.contains('checked')).toBeFalsy();
    });
    test('FilteringFlow single select filter with input', () => {
        const filteringFlow = new FilteringFlow(jsxColorsSingleSelectInput);
        const schema = filteringFlow.schema;
        schema.getGroup('color').getFilter('red').data.element.click();
        expect(schema.getGroup('color').getFilter('red').data.element.checked).toBeTruthy();
        expect(schema.getGroup('color').getFilter('green').data.element.checked).toBeFalsy();
        expect(schema.getGroup('color').getFilter('blue').data.element.checked).toBeFalsy();
        schema.getGroup('color').getFilter('blue').data.element.click();
        expect(schema.getGroup('color').getFilter('red').data.element.checked).toBeFalsy();
        expect(schema.getGroup('color').getFilter('green').data.element.checked).toBeFalsy();
        expect(schema.getGroup('color').getFilter('blue').data.element.checked).toBeTruthy();
    });
    test('FilteringFlow select all filters with input', () => {
        const filteringFlow = new FilteringFlow(jsxColorsWithTypeAllInput);
        const schema = filteringFlow.schema;
        schema.getGroup('color').getFilter('red').data.element.click();
        schema.getGroup('color').getFilter('green').data.element.click();
        expect(schema.getGroup('color').getFilter('red').data.element.checked).toBeTruthy();
        expect(schema.getGroup('color').getFilter('green').data.element.checked).toBeTruthy();
        expect(schema.getGroup('color').getFilter('blue').data.element.checked).toBeFalsy();
        schema.getGroup('color').getFilter('all').data.element.click();
        expect(schema.getGroup('color').getFilter('red').data.element.checked).toBeFalsy();
        expect(schema.getGroup('color').getFilter('green').data.element.checked).toBeFalsy();
        expect(schema.getGroup('color').getFilter('blue').data.element.checked).toBeFalsy();
    });
});
