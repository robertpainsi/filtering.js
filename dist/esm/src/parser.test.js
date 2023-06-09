import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { describe, expect, test } from '@jest/globals';
import { Parser } from './parser';
import { jsxToHtml, testFilterData, testSchema, testSchemaGroups, testSchemaItems } from '../test/test-utils';
import { Schema } from './schema';
describe('Parser', function () {
    const schemaTestData = [{
            name: 'One group with one filter',
            html: (_jsx("div", { id: "filtering", children: _jsx("div", { className: "filtering-group", "data-group-name": "color", children: _jsx("div", { className: "filtering-filter", "data-filter-name": "red" }) }) })),
            schema: {
                groups: {
                    color: ['red'],
                },
            },
        }, {
            name: 'One group with no filters',
            html: (_jsx("div", { id: "filtering", children: _jsx("div", { className: "filtering-group", "data-group-name": "color" }) })),
            schema: {
                groups: {
                    color: [],
                },
            },
        }, {
            name: 'Multiple groups with one filter',
            html: (_jsxs("div", { id: "filtering", children: [_jsx("div", { className: "filtering-group", "data-group-name": "color", children: _jsx("div", { className: "filtering-filter", "data-filter-name": "red" }) }), _jsx("div", { className: "filtering-group", "data-group-name": "size", children: _jsx("div", { className: "filtering-filter", "data-filter-name": "small" }) })] })),
            schema: {
                groups: {
                    color: ['red'],
                    size: ['small'],
                },
            },
        }, {
            name: 'One group with one filter which is not directly a descendant',
            html: (_jsx("div", { id: "filtering", children: _jsx("div", { className: "filtering-group", "data-group-name": "color", children: _jsx("div", { children: _jsx("div", { className: "filtering-filter", "data-filter-name": "red" }) }) }) })),
            schema: {
                groups: {
                    color: ['red'],
                },
            },
        }, {
            name: 'Custom group and filter name',
            html: (_jsx("div", { id: "filtering", children: _jsx("div", { className: "custom-group", "data-group-name": "color", children: _jsx("div", { className: "custom-filter", "data-filter-name": "red" }) }) })),
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
            html: (_jsx("div", { id: "items", children: _jsx("div", { id: "item-1", className: "filtering-item", "data-filter-color": "red" }) })),
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
            html: (_jsxs("div", { id: "items", children: [_jsx("div", { id: "item-1", className: "filtering-item", "data-filter-color": "red", "data-filter-size": "small" }), _jsx("div", { id: "item-2", className: "filtering-item", "data-filter-color": "blue", "data-filter-size": "large" })] })),
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
            html: (_jsx("div", { id: "items", children: _jsx("div", { id: "item-1", className: "custom-item", "data-filter-color": "red" }) })),
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
            html: (_jsx("div", { id: "items", children: _jsx("div", { id: "item-1", className: "filtering-item", "data-foo-color": "red" }) })),
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
    const filterDataTestData = [{
            name: 'One checked filter',
            html: (_jsx("div", { id: "filtering", children: _jsxs("div", { className: "filtering-group", "data-group-name": "color", children: [_jsx("div", { className: "filtering-filter checked", "data-filter-name": "red" }), _jsx("div", { className: "filtering-filter", "data-filter-name": "blue" })] }) })),
            schema: {
                groups: {
                    color: ['red'],
                },
            },
        }, {
            name: 'Multiple checked filters',
            html: (_jsx("div", { id: "filtering", children: _jsxs("div", { className: "filtering-group", "data-group-name": "color", children: [_jsx("div", { className: "filtering-filter checked", "data-filter-name": "red" }), _jsx("div", { className: "filtering-filter checked", "data-filter-name": "blue" })] }) })),
            schema: {
                groups: {
                    color: ['red', 'blue'],
                },
            },
        }, {
            name: 'No checked filter',
            html: (_jsx("div", { id: "filtering", children: _jsxs("div", { className: "filtering-group", "data-group-name": "color", children: [_jsx("div", { className: "filtering-filter", "data-filter-name": "red" }), _jsx("div", { className: "filtering-filter", "data-filter-name": "blue" })] }) })),
            schema: {
                groups: {},
            },
        }, {
            name: 'One checked filter in each group',
            html: (_jsxs("div", { id: "filtering", children: [_jsxs("div", { className: "filtering-group", "data-group-name": "color", children: [_jsx("div", { className: "filtering-filter checked", "data-filter-name": "red" }), _jsx("div", { className: "filtering-filter", "data-filter-name": "blue" })] }), _jsxs("div", { className: "filtering-group", "data-group-name": "size", children: [_jsx("div", { className: "filtering-filter", "data-filter-name": "small" }), _jsx("div", { className: "filtering-filter checked", "data-filter-name": "large" })] })] })),
            schema: {
                groups: {
                    color: ['red'],
                    size: ['large'],
                },
            },
        }, {
            name: 'Custom checked class name',
            html: (_jsx("div", { id: "filtering", children: _jsxs("div", { className: "filtering-group", "data-group-name": "color", children: [_jsx("div", { className: "filtering-filter my-checked", "data-filter-name": "red" }), _jsx("div", { className: "filtering-filter", "data-filter-name": "blue" })] }) })),
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
        const root = jsxToHtml(_jsx("div", { id: "filtering", children: _jsx("div", { className: "filtering-group", "data-group-name": "color", children: _jsx("div", { className: "filtering-filter checked", "data-filter-name": "red" }) }) }));
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
        const root = jsxToHtml(_jsx("div", { id: "filtering", children: _jsx("div", { className: "filtering-group", "data-group-name": "color", children: _jsx("div", { className: "filtering-filter checked", "data-filter-name": "red" }) }) }));
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
        const root = jsxToHtml(_jsx("div", { id: "items", children: _jsx("div", { id: "item-1", className: "filtering-item", "data-filter-color": "red" }) }));
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
