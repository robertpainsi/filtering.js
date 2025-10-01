import {describe, test} from '@jest/globals';
import {Event, EventEmitter} from './eventemitter';

function checkCallOrder(functions: jest.Mock[]) {
    for (let i = 1; i < functions.length; i++) {
        expect(functions[i - 1].mock.invocationCallOrder[0])
            .toBeLessThan(functions[i].mock.invocationCallOrder[0]);
    }
}

describe('EventEmitter', () => {

    let eventEmitter: EventEmitter;
    const event: Event = {source: {}, data: {}};

    beforeEach(() => {
        eventEmitter = new EventEmitter();
    });

    test('Registered callback called', () => {
        const callback = jest.fn();
        eventEmitter.addEventListener('event', callback);

        eventEmitter.emit('event', event);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Multiple registered callback called', () => {
        const callbacks = [jest.fn(), jest.fn(), jest.fn()];

        for (const callback of callbacks) {
            eventEmitter.addEventListener('event', callback);
        }
        eventEmitter.emit('event', event);
        for (const callback of callbacks) {
            expect(callback).toHaveBeenCalledTimes(1);
        }
    });

    test('Event triggers correct callback', () => {
        const firstCallback = jest.fn();
        const secondCallback = jest.fn();
        eventEmitter.addEventListener('first', firstCallback);
        eventEmitter.addEventListener('second', secondCallback);

        eventEmitter.emit('first', event);
        expect(firstCallback).toHaveBeenCalledTimes(1);
        expect(secondCallback).toHaveBeenCalledTimes(0);

        eventEmitter.emit('second', event);
        expect(firstCallback).toHaveBeenCalledTimes(1);
        expect(secondCallback).toHaveBeenCalledTimes(1);
    });

    test('Test unregistered callback not triggered', () => {
        const callback = jest.fn();
        const removeEventListener = eventEmitter.addEventListener('event', callback);

        removeEventListener();
        eventEmitter.emit('event', event);

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('Test unregistering callback multiple times', () => {
        const callback = jest.fn();
        const removeEventListener = eventEmitter.addEventListener('event', callback);

        removeEventListener();

        expect(removeEventListener).not.toThrow();
    });

    test('Callbacks triggered in same order as registered', () => {
        const callbacks = [];
        for (let i = 0; i < 10; i++) {
            const callback = jest.fn();
            callbacks.push(callback)
            eventEmitter.addEventListener('event', callback);
        }

        eventEmitter.emit('event', event);

        for (const callback of callbacks) {
            expect(callback).toHaveBeenCalledTimes(1);
        }
        checkCallOrder(callbacks);
    });

    test('Callback priority', () => {
        const lowestPriority = jest.fn();
        const lowerPriority = jest.fn();
        const lowPriority = jest.fn();
        const middlePriority = jest.fn();
        const highPriority = jest.fn();
        const higherPriority = jest.fn();
        const highestPriority = jest.fn();

        eventEmitter.addEventListener('event', middlePriority, 30);
        eventEmitter.addEventListener('event', higherPriority, 50);
        eventEmitter.addEventListener('event', lowPriority, 20);
        eventEmitter.addEventListener('event', lowestPriority, 0);
        eventEmitter.addEventListener('event', highestPriority, 60);
        eventEmitter.addEventListener('event', lowerPriority, 10);
        eventEmitter.addEventListener('event', highPriority, 40);

        eventEmitter.emit('event', event);

        checkCallOrder([
            highestPriority, higherPriority, highPriority,
            middlePriority,
            lowPriority, lowerPriority, lowestPriority,
        ]);
    });

    test('Negative priority', () => {
        const negativePriority = jest.fn();
        const normalPriority = jest.fn();

        eventEmitter.addEventListener('event', normalPriority);
        eventEmitter.addEventListener('event', negativePriority, -1);

        eventEmitter.emit('event', event);

        checkCallOrder([normalPriority, negativePriority]);
    });

    // TODO: Check if actual event (source, data) is emitted
})