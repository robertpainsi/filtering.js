import {describe, test} from "@jest/globals";
import {Parser} from "./parser";
import {jsxToHtml, testSchema} from "../test/test-utils";
import {blue, green, large, red, small} from "../test/test-data";
import {TestDataParserWithHtml} from "../test/test-data-types";

describe('Parser', function () {
    const testData: TestDataParserWithHtml[] = [{
        name: 'Simple parser',
        html: (
            <div>
                <div id="filtering">
                    <div className="filtering-group" data-group-name="color">
                        <div className="filtering-filter" data-filter-name="red">Red</div>
                        <div className="filtering-filter" data-filter-name="green">Green</div>
                        <div className="filtering-filter" data-filter-name="blue">Blue</div>
                    </div>
                    <div className="filtering-group" data-group-name="size">
                        <div className="filtering-filter" data-filter-name="small">Small</div>
                        <div className="filtering-filter" data-filter-name="large">Medium</div>
                    </div>
                </div>

                <div id="items">
                    <div id="item-1" className="filtering-item" data-filter-color="red" data-filter-size="small"></div>
                    <div id="item-2" className="filtering-item" data-filter-color="blue" data-filter-size="large"></div>
                </div>
            </div>
        ),
        schema: {
            groups: {
                color: ['red', 'green', 'blue'],
                size: ['small', 'large'],
            },
            items: [{
                name: 'item-1',
                groups: {
                    color: ['red'],
                    size: ['small'],
                }
            }, {
                name: 'item-3',
                groups: {
                    color: ['blue'],
                    size: ['large'],
                }
            }]
        }
    }];

    for (const singleTest of testData) {
        test(singleTest.name, () => {
            const schema = new Parser().parseSchemaFromHtml(jsxToHtml(singleTest.html));
            testSchema(schema, singleTest.schema);
        });
    }
});
