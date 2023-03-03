import {describe, test} from "@jest/globals";
import {parseSchemaFromHtml} from "./parser";
import {jsxToHtml, testSchema} from "../test/test-utils";
import {blue, green, large, red, small} from "../test/test-data";

describe('Parser', function () {
    test('Simple parser', () => {
        const schema = parseSchemaFromHtml(jsxToHtml(
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
        ));
        const expectedSchema = {
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
                name: 'item-2',
                groups: {
                    color: ['blue'],
                    size: ['large'],
                }
            }]
        }

        testSchema(schema, expectedSchema);
    });
});
