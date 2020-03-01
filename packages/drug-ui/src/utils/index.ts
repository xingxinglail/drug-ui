export const capitalize = (str: string): string => {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isNumeric = (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

export const isEmptyObject = (value: object): boolean => {
    if (Object.prototype.toString.call(value) !== '[object Object]') return false;
    for (let k in value) {
        if (value.hasOwnProperty(k)) return false;
    }
    return true;
};

export const throttle = (fn: Function, wait: number = 0): (...args: any[]) => any => {
    if (typeof fn !== 'function') throw new Error('fn is not a function');
    let startTime = 0;
    let result: any;
    return (...args: any[]) => {
        if (Date.now() - startTime >= wait) {
            result = fn(...args);
            startTime = Date.now();
        }
        return result;
    };
};
