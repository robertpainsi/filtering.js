import {TestDataGroups} from '../test-data-types';
import {blue, cheap, expensive, green, large, medium, red, small} from '../test-data';

export const mediumTestGroups: TestDataGroups = {
    color: [red, green, blue],
    size: [small, medium, large],
    price: [cheap, expensive],
}
export const mediumTestItems = [{
    name: 'item-1',
    groups: {
        color: [
            green,
        ],
        size: [
            medium,
        ],
        price: [
            cheap,
        ],
    },
}, {
    name: 'item-2',
    groups: {
        color: [
            green,
        ],
        size: [
            small,
            medium,
        ],
        price: [
            expensive,
        ],
    },
}, {
    name: 'item-3',
    groups: {
        color: [
            blue,
        ],
        size: [
            small,
        ],
        price: [
            cheap,
        ],
    },
}, {
    name: 'item-4',
    groups: {
        color: [
            green,
        ],
        size: [
            medium,
        ],
        price: [
            expensive,
        ],
    },
}, {
    name: 'item-5',
    groups: {
        color: [
            red,
        ],
        size: [
            large,
        ],
        price: [
            expensive,
        ],
    },
}, {
    name: 'item-6',
    groups: {
        color: [
            green,
        ],
        size: [
            medium,
        ],
        price: [
            cheap,
        ],
    },
}, {
    name: 'item-7',
    groups: {
        color: [
            blue,
            green,
        ],
        size: [
            large,
        ],
        price: [
            expensive,
        ],
    },
}, {
    name: 'item-8',
    groups: {
        color: [
            red,
            blue,
        ],
        size: [
            small,
        ],
        price: [
            expensive,
        ],
    },
}, {
    name: 'item-9',
    groups: {
        color: [
            green,
        ],
        size: [
            medium,
            large,
        ],
        price: [
            expensive,
        ],
    },
}, {
    name: 'item-10',
    groups: {
        color: [
            green,
        ],
        size: [
            small,
            medium,
            large,
        ],
        price: [
            expensive,
        ],
    },
}, {
    name: 'item-11',
    groups: {
        color: [
            blue,
        ],
        size: [
            medium,
        ],
        price: [
            cheap,
        ],
    },
}, {
    name: 'item-12',
    groups: {
        color: [
            red,
        ],
        size: [
            large,
        ],
        price: [
            expensive,
        ],
    },
}, {
    name: 'item-13',
    groups: {
        color: [
            red,
        ],
        size: [
            small,
        ],
        price: [
            cheap,
        ],
    },
}, {
    name: 'item-14',
    groups: {
        color: [
            blue,
        ],
        size: [
            medium,
        ],
        price: [
            cheap,
        ],
    },
}, {
    name: 'item-15',
    groups: {
        color: [
            green,
        ],
        size: [
            large,
        ],
        price: [
            cheap,
        ],
    },
}, {
    name: 'item-16',
    groups: {
        color: [
            green,
        ],
        size: [
            medium,
            large,
        ],
        price: [
            expensive,
        ],
    },
}];
export const mediumTestSchema = {
    groups: mediumTestGroups,
    items: mediumTestItems,
};
