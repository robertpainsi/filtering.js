export class EventEmitter {
    #eventListeners = new Map();
    emit(eventName, event) {
        const results = [];
        if (this.#eventListeners.has(eventName)) {
            for (const listener of this.#eventListeners.get(eventName)) {
                results.push(listener.callback(event));
            }
        }
        return results;
    }
    addEventListener(eventName, callback, priority = 0) {
        if (!this.#eventListeners.has(eventName)) {
            this.#eventListeners.set(eventName, []);
        }
        const id = Symbol(`Event(${eventName})`);
        const listeners = this.#eventListeners.get(eventName);
        let insertIndex;
        for (insertIndex = 0; insertIndex < listeners.length && listeners[insertIndex].priority >= priority; insertIndex++) {
            // TODO: Improve by using binary insertion sort
        }
        listeners.splice(insertIndex, 0, { id, priority, callback });
        return () => {
            if (this.#eventListeners.has(eventName)) {
                this.#eventListeners.set(eventName, this.#eventListeners.get(eventName).filter((eventListener) => eventListener.id !== id));
                if (this.#eventListeners.get(eventName).length === 0) {
                    this.#eventListeners.delete(eventName);
                }
            }
        };
    }
}
