import {TestDataGroups} from "../test-data-types";
import {black, blue, cheap, expensive, free, green, large, medium, orange, priceless, red, small, white, xl} from "../test-data";

export const complexTestGroups: TestDataGroups = {
    color: [red, green, blue, black, white, orange],
    size: [small, medium, large, xl],
    price: [free, cheap, expensive, priceless],
};
export const complexTestItems = [{
    name: 'item-1',
    groups: {
        color: [black, blue, orange],
        size: [xl, large, medium, small],
        price: [priceless, expensive],
    },
}, {
    name: 'item-2',
    groups: {
        color: [red, orange, black, green, blue, white],
        size: [small],
        price: [priceless],
    },
}, {
    name: 'item-3',
    groups: {
        color: [white, orange, black, green],
        size: [small, xl, medium, large],
        price: [free],
    },
}, {
    name: 'item-4',
    groups: {
        color: [black, white, blue, green, orange],
        size: [small, medium, large, xl],
        price: [free, cheap, expensive, priceless],
    },
}, {
    name: 'item-5',
    groups: {
        color: [black, orange],
        size: [xl, large],
        price: [free],
    },
}, {
    name: 'item-6',
    groups: {
        color: [red, black, white, green],
        size: [xl, large, medium, small],
        price: [priceless, free, expensive],
    },
}, {
    name: 'item-7',
    groups: {
        color: [blue, orange, green],
        size: [large, xl, medium, small],
        price: [priceless, free, cheap, expensive],
    },
}, {
    name: 'item-8',
    groups: {
        color: [black, blue, orange, white],
        size: [small, medium, large, xl],
        price: [priceless],
    },
}, {
    name: 'item-9',
    groups: {
        color: [red, white, black, green, blue, orange],
        size: [xl],
        price: [free, expensive, cheap, priceless],
    },
}, {
    name: 'item-10',
    groups: {
        color: [red, green, orange],
        size: [small],
        price: [priceless],
    },
}, {
    name: 'item-11',
    groups: {
        color: [black, white],
        size: [small, medium, large, xl],
        price: [free, cheap, expensive, priceless],
    },
}, {
    name: 'item-12',
    groups: {
        color: [green, red, blue],
        size: [xl, small, medium],
        price: [free, priceless, cheap, expensive],
    },
}, {
    name: 'item-13',
    groups: {
        color: [orange, blue, green, black, white],
        size: [xl, large, medium, small],
        price: [free, cheap],
    },
}, {
    name: 'item-14',
    groups: {
        color: [blue],
        size: [small],
        price: [priceless, expensive, cheap],
    },
}, {
    name: 'item-15',
    groups: {
        color: [red, orange, green, blue, black, white],
        size: [small, medium, xl, large],
        price: [priceless],
    },
}, {
    name: 'item-16',
    groups: {
        color: [red, green, orange, blue, white],
        size: [medium, xl],
        price: [cheap, expensive],
    },
}, {
    name: 'item-17',
    groups: {
        color: [orange, blue, black, green, red, white],
        size: [xl, large, medium, small],
        price: [expensive, priceless],
    },
}, {
    name: 'item-18',
    groups: {
        color: [blue, green, orange],
        size: [small],
        price: [expensive, free, cheap, priceless],
    },
}, {
    name: 'item-19',
    groups: {
        color: [white, red, orange],
        size: [small, large],
        price: [cheap, free, priceless],
    },
}, {
    name: 'item-20',
    groups: {
        color: [black, blue, white, green],
        size: [xl, small],
        price: [cheap, priceless],
    },
}, {
    name: 'item-21',
    groups: {
        color: [red, green, blue, black, white, orange],
        size: [small, medium, large],
        price: [priceless, free, expensive],
    },
}, {
    name: 'item-22',
    groups: {
        color: [white, blue, orange],
        size: [large, xl],
        price: [expensive],
    },
}, {
    name: 'item-23',
    groups: {
        color: [black, blue],
        size: [large, xl],
        price: [free],
    },
}, {
    name: 'item-24',
    groups: {
        color: [black, white, orange, red],
        size: [small],
        price: [cheap, expensive, priceless],
    },
}, {
    name: 'item-25',
    groups: {
        color: [green],
        size: [small, xl, large, medium],
        price: [priceless],
    },
}, {
    name: 'item-26',
    groups: {
        color: [blue, white, black],
        size: [medium, small],
        price: [free, expensive, priceless, cheap],
    },
}, {
    name: 'item-27',
    groups: {
        color: [orange, red, green, black, blue],
        size: [small],
        price: [free, cheap],
    },
}, {
    name: 'item-28',
    groups: {
        color: [orange, white, black, blue, green],
        size: [xl, large],
        price: [cheap, free],
    },
}, {
    name: 'item-29',
    groups: {
        color: [black, green],
        size: [small],
        price: [cheap, free, expensive, priceless],
    },
}, {
    name: 'item-30',
    groups: {
        color: [green],
        size: [medium, xl, small],
        price: [cheap, expensive, free],
    },
}, {
    name: 'item-31',
    groups: {
        color: [blue, orange, black, green, white, red],
        size: [large],
        price: [expensive, cheap, free, priceless],
    },
}, {
    name: 'item-32',
    groups: {
        color: [blue],
        size: [small, medium, large],
        price: [expensive],
    },
}];
export const complexSchema = {
    groups: complexTestGroups,
    items: complexTestItems,
}
