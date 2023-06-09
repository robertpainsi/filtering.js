import {describe, expect, test} from '@jest/globals';
import {Parser} from './parser';
import {jsxToHtml, testFilterData, testSchema, testSchemaGroups, testSchemaItems} from '../test/test-utils';
import {blue, large, red, small} from '../test/test-data';
import {TestDataParserWithHtml} from '../test/test-data-types';
import {Schema} from './schema';

describe('Parser', function () {
    const schemaTestData: TestDataParserWithHtml[] = [{
        name: 'One group with one filter',
        html: (
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div className="filtering-filter" data-filter-name="red"></div>
                </div>
            </div>
        ),
        schema: {
            groups: {
                color: ['red'],
            },
        },
    }, {
        name: 'One group with no filters',
        html: (
            <div id="filtering">
                <div className="filtering-group" data-group-name="color"></div>
            </div>
        ),
        schema: {
            groups: {
                color: [],
            },
        },
    }, {
        name: 'Multiple groups with one filter',
        html: (
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div className="filtering-filter" data-filter-name="red"></div>
                </div>
                <div className="filtering-group" data-group-name="size">
                    <div className="filtering-filter" data-filter-name="small"></div>
                </div>
            </div>
        ),
        schema: {
            groups: {
                color: ['red'],
                size: ['small'],
            },
        },
    }, {
        name: 'One group with one filter which is not directly a descendant',
        html: (
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div>
                        <div className="filtering-filter" data-filter-name="red"></div>
                    </div>
                </div>
            </div>
        ),
        schema: {
            groups: {
                color: ['red'],
            },
        },
    }, {
        name: 'Custom group and filter name',
        html: (
            <div id="filtering">
                <div className="custom-group" data-group-name="color">
                    <div className="custom-filter" data-filter-name="red"></div>
                </div>
            </div>
        ),
        schema: {
            groups: {
                color: ['red'],
            },
        },
        options: {
            groupClass: 'custom-group',
            filterClass: 'custom-filter',
        },
    }, {
        name: 'One item with one group and one filter',
        html: (
            <div id="items">
                <div id="item-1" className="filtering-item" data-filter-color="red"></div>
            </div>
        ),
        schema: {
            items: [{
                name: 'item-1',
                groups: {
                    color: ['red'],
                },
            }],
        },
    }, {
        name: 'Multiple items with multiple groups and multiple filter',
        html: (
            <div id="items">
                <div id="item-1" className="filtering-item" data-filter-color="red" data-filter-size="small"></div>
                <div id="item-2" className="filtering-item" data-filter-color="blue" data-filter-size="large"></div>
            </div>
        ),
        schema: {
            items: [{
                name: 'item-1',
                groups: {
                    color: ['red'],
                    size: ['small'],
                },
            }, {
                name: 'item-2',
                groups: {
                    color: ['blue'],
                    size: ['large'],
                },
            }],
        },
    }, {
        name: 'Custom item class name',
        html: (
            <div id="items">
                <div id="item-1" className="custom-item" data-filter-color="red"></div>
            </div>
        ),
        schema: {
            items: [{
                name: 'item-1',
                groups: {
                    color: ['red'],
                },
            }],
        },
        options: {
            itemClass: 'custom-item',
        },
    }, {
        name: `Custom prefix attribute for item's group name`,
        html: (
            <div id="items">
                <div id="item-1" className="filtering-item" data-foo-color="red"></div>
            </div>
        ),
        schema: {
            items: [{
                name: 'item-1',
                groups: {
                    color: ['red'],
                },
            }],
        },
        options: {
            itemFilterNameAttributePrefix: 'foo',
        },
    }];

    for (const singleTest of schemaTestData) {
        test(singleTest.name, () => {
            const schema = new Parser(singleTest.options).parseSchemaFromHtml(jsxToHtml(singleTest.html));
            testSchema(schema, singleTest.schema);
        });
    }

    const filterDataTestData: TestDataParserWithHtml[] = [{
        name: 'One checked filter',
        html: (
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div className="filtering-filter checked" data-filter-name="red"></div>
                    <div className="filtering-filter" data-filter-name="blue"></div>
                </div>
            </div>
        ),
        schema: {
            groups: {
                color: ['red'],
            },
        },
    }, {
        name: 'Multiple checked filters',
        html: (
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div className="filtering-filter checked" data-filter-name="red"></div>
                    <div className="filtering-filter checked" data-filter-name="blue"></div>
                </div>
            </div>
        ),
        schema: {
            groups: {
                color: ['red', 'blue'],
            },
        },
    }, {
        name: 'No checked filter',
        html: (
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div className="filtering-filter" data-filter-name="red"></div>
                    <div className="filtering-filter" data-filter-name="blue"></div>
                </div>
            </div>
        ),
        schema: {
            groups: {},
        },
    }, {
        name: 'One checked filter in each group',
        html: (
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div className="filtering-filter checked" data-filter-name="red"></div>
                    <div className="filtering-filter" data-filter-name="blue"></div>
                </div>
                <div className="filtering-group" data-group-name="size">
                    <div className="filtering-filter" data-filter-name="small"></div>
                    <div className="filtering-filter checked" data-filter-name="large"></div>
                </div>
            </div>
        ),
        schema: {
            groups: {
                color: ['red'],
                size: ['large'],
            },
        },
    }, {
        name: 'Custom checked class name',
        html: (
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div className="filtering-filter my-checked" data-filter-name="red"></div>
                    <div className="filtering-filter" data-filter-name="blue"></div>
                </div>
            </div>
        ),
        schema: {
            groups: {
                color: ['red'],
            },
        },
        options: {
            filterCheckedClass: 'my-checked',
        },
    }];
    for (const singleTest of filterDataTestData) {
        test(singleTest.name, () => {
            const schema = new Parser(singleTest.options).parseCheckedFilterDataFromHtml(jsxToHtml(singleTest.html));
            testFilterData(schema, singleTest.schema);
        });
    }

    test('Parser.parseSchemaFromHtml optional Schema', () => {
        const root = jsxToHtml(
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div className="filtering-filter checked" data-filter-name="red"></div>
                </div>
            </div>,
        );

        const parsedSchema = new Parser().parseSchemaFromHtml(root);
        testSchema(parsedSchema, {
            groups: {
                color: ['red'],
            },
        });

        const schema = new Schema();
        expect(new Parser().parseSchemaFromHtml(root, schema)).toBe(schema);
        testSchema(schema, {
            groups: {
                color: ['red'],
            },
        });
    });

    test('Parser.parseGroupsAndFiltersFromHtml optional Schema', () => {
        const root = jsxToHtml(
            <div id="filtering">
                <div className="filtering-group" data-group-name="color">
                    <div className="filtering-filter checked" data-filter-name="red"></div>
                </div>
            </div>,
        );

        const parsedGroups = new Parser().parseGroupsAndFiltersFromHtml(root);
        testSchemaGroups(parsedGroups, {
            color: ['red'],
        });

        const schema = new Schema();
        new Parser().parseGroupsAndFiltersFromHtml(root, schema);
        testSchema(schema, {
            groups: {
                color: ['red'],
            },
        });
    });

    test('Parser.parseItemsFromHtml optional Schema', () => {
        const root = jsxToHtml(
            <div id="items">
                <div id="item-1" className="filtering-item" data-filter-color="red"></div>
            </div>,
        );

        const parsedItems = new Parser().parseItemsFromHtml(root);
        testSchemaItems(parsedItems, [{
            name: 'item-1',
            groups: {
                color: ['red'],
            },
        }]);

        const schema = new Schema();
        new Parser().parseItemsFromHtml(root, schema);
        testSchema(schema, {
            items: [{
                name: 'item-1',
                groups: {
                    color: ['red'],
                },
            }],
        });
    });

});
