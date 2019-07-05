export declare type IPipe<T> = (something: T) => any;
export declare interface FluentPipe<T, U> {
    to: (...fns: Array<IPipe<U>>) => T
}
