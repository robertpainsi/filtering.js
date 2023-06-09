"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediumTestSchema = exports.mediumTestItems = exports.mediumTestGroups = void 0;
const test_data_1 = require("../test-data");
exports.mediumTestGroups = {
    color: [test_data_1.red, test_data_1.green, test_data_1.blue],
    size: [test_data_1.small, test_data_1.medium, test_data_1.large],
    price: [test_data_1.cheap, test_data_1.expensive],
};
exports.mediumTestItems = [{
        name: 'item-1',
        groups: {
            color: [
                test_data_1.green,
            ],
            size: [
                test_data_1.medium,
            ],
            price: [
                test_data_1.cheap,
            ],
        },
    }, {
        name: 'item-2',
        groups: {
            color: [
                test_data_1.green,
            ],
            size: [
                test_data_1.small,
                test_data_1.medium,
            ],
            price: [
                test_data_1.expensive,
            ],
        },
    }, {
        name: 'item-3',
        groups: {
            color: [
                test_data_1.blue,
            ],
            size: [
                test_data_1.small,
            ],
            price: [
                test_data_1.cheap,
            ],
        },
    }, {
        name: 'item-4',
        groups: {
            color: [
                test_data_1.green,
            ],
            size: [
                test_data_1.medium,
            ],
            price: [
                test_data_1.expensive,
            ],
        },
    }, {
        name: 'item-5',
        groups: {
            color: [
                test_data_1.red,
            ],
            size: [
                test_data_1.large,
            ],
            price: [
                test_data_1.expensive,
            ],
        },
    }, {
        name: 'item-6',
        groups: {
            color: [
                test_data_1.green,
            ],
            size: [
                test_data_1.medium,
            ],
            price: [
                test_data_1.cheap,
            ],
        },
    }, {
        name: 'item-7',
        groups: {
            color: [
                test_data_1.blue,
                test_data_1.green,
            ],
            size: [
                test_data_1.large,
            ],
            price: [
                test_data_1.expensive,
            ],
        },
    }, {
        name: 'item-8',
        groups: {
            color: [
                test_data_1.red,
                test_data_1.blue,
            ],
            size: [
                test_data_1.small,
            ],
            price: [
                test_data_1.expensive,
            ],
        },
    }, {
        name: 'item-9',
        groups: {
            color: [
                test_data_1.green,
            ],
            size: [
                test_data_1.medium,
                test_data_1.large,
            ],
            price: [
                test_data_1.expensive,
            ],
        },
    }, {
        name: 'item-10',
        groups: {
            color: [
                test_data_1.green,
            ],
            size: [
                test_data_1.small,
                test_data_1.medium,
                test_data_1.large,
            ],
            price: [
                test_data_1.expensive,
            ],
        },
    }, {
        name: 'item-11',
        groups: {
            color: [
                test_data_1.blue,
            ],
            size: [
                test_data_1.medium,
            ],
            price: [
                test_data_1.cheap,
            ],
        },
    }, {
        name: 'item-12',
        groups: {
            color: [
                test_data_1.red,
            ],
            size: [
                test_data_1.large,
            ],
            price: [
                test_data_1.expensive,
            ],
        },
    }, {
        name: 'item-13',
        groups: {
            color: [
                test_data_1.red,
            ],
            size: [
                test_data_1.small,
            ],
            price: [
                test_data_1.cheap,
            ],
        },
    }, {
        name: 'item-14',
        groups: {
            color: [
                test_data_1.blue,
            ],
            size: [
                test_data_1.medium,
            ],
            price: [
                test_data_1.cheap,
            ],
        },
    }, {
        name: 'item-15',
        groups: {
            color: [
                test_data_1.green,
            ],
            size: [
                test_data_1.large,
            ],
            price: [
                test_data_1.cheap,
            ],
        },
    }, {
        name: 'item-16',
        groups: {
            color: [
                test_data_1.green,
            ],
            size: [
                test_data_1.medium,
                test_data_1.large,
            ],
            price: [
                test_data_1.expensive,
            ],
        },
    }];
exports.mediumTestSchema = {
    groups: exports.mediumTestGroups,
    items: exports.mediumTestItems,
};
