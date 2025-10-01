import { Pojo } from './utils';
export interface Event {
    source: {};
    data?: Pojo;
}
export type EventCallback = (event: Event) => undefined;
export interface EventSubscribable {
    addEventListener(eventName: string, callback: EventCallback, priority?: number): () => void;
}
export declare class EventEmitter implements EventSubscribable {
    #private;
    emit(eventName: string, event: Event): any[];
    addEventListener(eventName: string, callback: EventCallback, priority?: number): () => void;
}
