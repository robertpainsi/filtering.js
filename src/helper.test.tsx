import {describe, expect, jest, test} from "@jest/globals";
import {FilteringFlow} from './helper';
import {jsxToHtml} from '../test/test-utils';
import {Schema} from './schema';
import {Parser, ParserOptions} from './parser';
import {Filtering, FilteringOptions} from './filtering';

describe('helper.FilteringFlow', () => {
    test('FilteringFlow calls initialize methods', () => {
        const initializeParserSpy = jest.spyOn(FilteringFlow.prototype, 'initializeParser');
        const initializeSchemaSpy = jest.spyOn(FilteringFlow.prototype, 'initializeSchema');
        const initializeFilteringSpy = jest.spyOn(FilteringFlow.prototype, 'initializeFiltering');
        const initializeFilterListenerSpy = jest.spyOn(FilteringFlow.prototype, 'initializeFilterListener');
        const filterListenerSpy = jest.spyOn(FilteringFlow.prototype, 'filter');
        new FilteringFlow(jsxToHtml(<div></div>));

        expect(initializeParserSpy).toBeCalledTimes(1);
        expect(initializeSchemaSpy).toBeCalledTimes(1);
        expect(initializeFilteringSpy).toBeCalledTimes(1);
        expect(initializeFilterListenerSpy).toBeCalledTimes(1);
        expect(filterListenerSpy).toBeCalledTimes(1);
    });

    test('FilteringFlow triggerFilterAfterInitializing', () => {
        const filterListenerSpyDisabled = jest.spyOn(FilteringFlow.prototype, 'filter');
        new FilteringFlow(jsxToHtml(<div></div>), {
            triggerFilterAfterInitializing: false,
        });

        expect(filterListenerSpyDisabled).toBeCalledTimes(0);

        const filterListenerSpyEnabled = jest.spyOn(FilteringFlow.prototype, 'filter');
        new FilteringFlow(jsxToHtml(<div></div>), {
            triggerFilterAfterInitializing: true,
        });

        expect(filterListenerSpyEnabled).toBeCalledTimes(1);
    });

    test('FilteringFlow filter', () => {
        const parser = new Parser();
        const schema = new Schema();
        const filtering = new Filtering(schema);

        class MyFilteringFlow extends FilteringFlow {
            initializeParser(parserOptions?: ParserOptions): Parser {
                return parser;
            }

            initializeSchema(): Schema {
                return schema;
            }

            initializeFiltering(filteringOptions?: FilteringOptions): Filtering {
                return filtering;
            }
        }

        const myFilteringFlow = new MyFilteringFlow(jsxToHtml(<div></div>));

        expect(myFilteringFlow.parser).toBe(parser);
        expect(myFilteringFlow.schema).toBe(schema);
        expect(myFilteringFlow.filtering).toBe(filtering);
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
})
