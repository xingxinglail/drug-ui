import { NamePath, InternalNamePath, Store, EventArgs, StoreValue } from '../interface';
import { toArray, set } from '.';

export const getNamePath = (namePath: NamePath | null): InternalNamePath => {
    return toArray(namePath);
};

export const getValue = (store: Store, namePath: InternalNamePath) => {
    let current = store;
    for (let i = 0; i < namePath.length; i++) {
        if (current === undefined || current === null) return undefined;
        current = current[namePath[i]];
    }
    return current;
};

export function setValue (store: Store, namePath: InternalNamePath, value: StoreValue): Store {
    return set(store, namePath, value);
}

export const defaultGetValueFromEvent = (valuePropName: string, ...args: EventArgs) => {
    const event = args[0];
    if (event && event.target && valuePropName in event.target) {
        return (event.target as HTMLInputElement)[valuePropName];
    }
    return event;
};

function isObject (obj: StoreValue) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Copy values into store and return a new values object
 * ({ a: 1, b: { c: 2 } }, { a: 4, b: { d: 5 } }) => { a: 4, b: { c: 2, d: 5 } }
 */
function internalSetValues<T> (store: T, values: T): T {
    const newStore: T = (Array.isArray(store) ? [...store] : { ...store }) as T;

    if (!values) {
        return newStore;
    }

    Object.keys(values).forEach(key => {
        const prevValue = newStore[key];
        const value = values[key];

        // If both are object (but target is not array), we use recursion to set deep value
        const recursive = isObject(prevValue) && isObject(value);
        newStore[key] = recursive ? internalSetValues(prevValue, value || {}) : value;
    });

    return newStore;
}

export function setValues<T> (store: T, ...restValues: T[]): T {
    return restValues.reduce(
        (current: T, newStore: T): T => internalSetValues<T>(current, newStore),
        store,
    );
}
