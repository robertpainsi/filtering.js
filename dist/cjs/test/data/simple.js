"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleTestSchema = exports.simpleTestItems = exports.simpleTestGroups = void 0;
const test_data_1 = require("../test-data");
exports.simpleTestGroups = {
    color: ['red', 'blue'],
    size: ['small', 'large'],
};
exports.simpleTestItems = [{
        name: 'item-1',
        groups: {
            color: [test_data_1.red],
            size: [test_data_1.small],
        },
    }, {
        name: 'item-2',
        groups: {
            color: [test_data_1.red],
            size: [test_data_1.large],
        },
    }, {
        name: 'item-3',
        groups: {
            color: [test_data_1.blue],
            size: [test_data_1.large],
        },
    }];
exports.simpleTestSchema = {
    groups: exports.simpleTestGroups,
    items: exports.simpleTestItems,
};
