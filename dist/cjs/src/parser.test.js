"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const globals_1 = require("@jest/globals");
const parser_1 = require("./parser");
const test_utils_1 = require("../test/test-utils");
const schema_1 = require("./schema");
(0, globals_1.describe)('Parser', function () {
    const schemaTestData = [{
            name: 'One group with one filter',
            html: ((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "color", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "red" }) }) })),
            schema: {
                groups: {
                    color: ['red'],
                },
            },
        }, {
            name: 'One group with no filters',
            html: ((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "color" }) })),
            schema: {
                groups: {
                    color: [],
                },
            },
        }, {
            name: 'Multiple groups with one filter',
            html: ((0, jsx_runtime_1.jsxs)("div", { id: "filtering", children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "color", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "red" }) }), (0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "size", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "small" }) })] })),
            schema: {
                groups: {
                    color: ['red'],
                    size: ['small'],
                },
            },
        }, {
            name: 'One group with one filter which is not directly a descendant',
            html: ((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "color", children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "red" }) }) }) })),
            schema: {
                groups: {
                    color: ['red'],
                },
            },
        }, {
            name: 'Custom group and filter name',
            html: ((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsx)("div", { className: "custom-group", "data-group-name": "color", children: (0, jsx_runtime_1.jsx)("div", { className: "custom-filter", "data-filter-name": "red" }) }) })),
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
            html: ((0, jsx_runtime_1.jsx)("div", { id: "items", children: (0, jsx_runtime_1.jsx)("div", { id: "item-1", className: "filtering-item", "data-filter-color": "red" }) })),
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
            html: ((0, jsx_runtime_1.jsxs)("div", { id: "items", children: [(0, jsx_runtime_1.jsx)("div", { id: "item-1", className: "filtering-item", "data-filter-color": "red", "data-filter-size": "small" }), (0, jsx_runtime_1.jsx)("div", { id: "item-2", className: "filtering-item", "data-filter-color": "blue", "data-filter-size": "large" })] })),
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
            html: ((0, jsx_runtime_1.jsx)("div", { id: "items", children: (0, jsx_runtime_1.jsx)("div", { id: "item-1", className: "custom-item", "data-filter-color": "red" }) })),
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
            html: ((0, jsx_runtime_1.jsx)("div", { id: "items", children: (0, jsx_runtime_1.jsx)("div", { id: "item-1", className: "filtering-item", "data-foo-color": "red" }) })),
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
        (0, globals_1.test)(singleTest.name, () => {
            const schema = new parser_1.Parser(singleTest.options).parseSchemaFromHtml((0, test_utils_1.jsxToHtml)(singleTest.html));
            (0, test_utils_1.testSchema)(schema, singleTest.schema);
        });
    }
    const filterDataTestData = [{
            name: 'One checked filter',
            html: ((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsxs)("div", { className: "filtering-group", "data-group-name": "color", children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-filter checked", "data-filter-name": "red" }), (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "blue" })] }) })),
            schema: {
                groups: {
                    color: ['red'],
                },
            },
        }, {
            name: 'Multiple checked filters',
            html: ((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsxs)("div", { className: "filtering-group", "data-group-name": "color", children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-filter checked", "data-filter-name": "red" }), (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter checked", "data-filter-name": "blue" })] }) })),
            schema: {
                groups: {
                    color: ['red', 'blue'],
                },
            },
        }, {
            name: 'No checked filter',
            html: ((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsxs)("div", { className: "filtering-group", "data-group-name": "color", children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "red" }), (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "blue" })] }) })),
            schema: {
                groups: {},
            },
        }, {
            name: 'One checked filter in each group',
            html: ((0, jsx_runtime_1.jsxs)("div", { id: "filtering", children: [(0, jsx_runtime_1.jsxs)("div", { className: "filtering-group", "data-group-name": "color", children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-filter checked", "data-filter-name": "red" }), (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "blue" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "filtering-group", "data-group-name": "size", children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "small" }), (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter checked", "data-filter-name": "large" })] })] })),
            schema: {
                groups: {
                    color: ['red'],
                    size: ['large'],
                },
            },
        }, {
            name: 'Custom checked class name',
            html: ((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsxs)("div", { className: "filtering-group", "data-group-name": "color", children: [(0, jsx_runtime_1.jsx)("div", { className: "filtering-filter my-checked", "data-filter-name": "red" }), (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter", "data-filter-name": "blue" })] }) })),
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
        (0, globals_1.test)(singleTest.name, () => {
            const schema = new parser_1.Parser(singleTest.options).parseCheckedFilterDataFromHtml((0, test_utils_1.jsxToHtml)(singleTest.html));
            (0, test_utils_1.testFilterData)(schema, singleTest.schema);
        });
    }
    (0, globals_1.test)('Parser.parseSchemaFromHtml optional Schema', () => {
        const root = (0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "color", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter checked", "data-filter-name": "red" }) }) }));
        const parsedSchema = new parser_1.Parser().parseSchemaFromHtml(root);
        (0, test_utils_1.testSchema)(parsedSchema, {
            groups: {
                color: ['red'],
            },
        });
        const schema = new schema_1.Schema();
        (0, globals_1.expect)(new parser_1.Parser().parseSchemaFromHtml(root, schema)).toBe(schema);
        (0, test_utils_1.testSchema)(schema, {
            groups: {
                color: ['red'],
            },
        });
    });
    (0, globals_1.test)('Parser.parseGroupsAndFiltersFromHtml optional Schema', () => {
        const root = (0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsx)("div", { id: "filtering", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-group", "data-group-name": "color", children: (0, jsx_runtime_1.jsx)("div", { className: "filtering-filter checked", "data-filter-name": "red" }) }) }));
        const parsedGroups = new parser_1.Parser().parseGroupsAndFiltersFromHtml(root);
        (0, test_utils_1.testSchemaGroups)(parsedGroups, {
            color: ['red'],
        });
        const schema = new schema_1.Schema();
        new parser_1.Parser().parseGroupsAndFiltersFromHtml(root, schema);
        (0, test_utils_1.testSchema)(schema, {
            groups: {
                color: ['red'],
            },
        });
    });
    (0, globals_1.test)('Parser.parseItemsFromHtml optional Schema', () => {
        const root = (0, test_utils_1.jsxToHtml)((0, jsx_runtime_1.jsx)("div", { id: "items", children: (0, jsx_runtime_1.jsx)("div", { id: "item-1", className: "filtering-item", "data-filter-color": "red" }) }));
        const parsedItems = new parser_1.Parser().parseItemsFromHtml(root);
        (0, test_utils_1.testSchemaItems)(parsedItems, [{
                name: 'item-1',
                groups: {
                    color: ['red'],
                },
            }]);
        const schema = new schema_1.Schema();
        new parser_1.Parser().parseItemsFromHtml(root, schema);
        (0, test_utils_1.testSchema)(schema, {
            items: [{
                    name: 'item-1',
                    groups: {
                        color: ['red'],
                    },
                }],
        });
    });
});
