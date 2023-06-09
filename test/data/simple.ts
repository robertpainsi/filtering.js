import {TestDataGroups} from "../test-data-types";
import {blue, large, red, small} from "../test-data";

export const simpleTestGroups: TestDataGroups = {
    color: ['red', 'blue'],
    size: ['small', 'large'],
};
export const simpleTestItems = [{
    name: 'item-1',
    groups: {
        color: [red],
        size: [small],
    },
}, {
    name: 'item-2',
    groups: {
        color: [red],
        size: [large],
    },
}, {
    name: 'item-3',
    groups: {
        color: [blue],
        size: [large],
    },
}];
export const simpleTestSchema = {
    groups: simpleTestGroups,
    items: simpleTestItems,
}
