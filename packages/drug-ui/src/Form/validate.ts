import * as React from 'react';
import { FormValue } from './Form';
import { NamePath, StoreValue } from './interface';

interface Validate {
    [key: string]: Array<string | Promise<string | undefined>>;
}

interface Errors {
    [key: string]: string[];
}

export interface Rule {
    required?: boolean;
    message?: string;
    min?: number;
    max?: number;
    validator?: (value: StoreValue) => Promise<unknown>;
}

export interface Rules {
    [key: string]: Rule[];
}

const isEmpty = (value: any): boolean => {
    if (value instanceof Array && value.length === 0) return true;
    return value === undefined || value === null || value === '';
};

// export const validate = (formValue: FormValue, rules: Rules, cb: (errors: Errors) => void): Validate => {
//     const errors: Validate = {};
//     const promiseList: Promise<string>[] = [];
//
//     const addError = (key: string, message: string | undefined | Promise<string | undefined>) => {
//         if (errors[key] === undefined) errors[key] = [];
//         if (!message) message = '';
//         errors[key].push(message);
//     };
//
//     for (let key in rules) {
//         const value = formValue[key];
//         rules[key].forEach(rule => {
//             const { required, min, max, validator, message } = rule;
//             if (required && isEmpty(value)) addError(key, message);
//
//             if (!isEmpty(value)) {
//                 const minIsNum = typeof min === 'number';
//                 const maxIsNum = typeof max === 'number';
//                 if (minIsNum && maxIsNum) {
//                     if (value.length < (min as number) || value.length > (max as number)) addError(key, message);
//                 } else if (maxIsNum && value.length > (max as number)) {
//                     if (value.length > (max as number)) addError(key, message);
//                 } else if (minIsNum && value.length < (min as number)) {
//                     if (value.length < (min as number)) addError(key, message);
//                 }
//             }
//
//             if (validator) {
//                 const p = new Promise<string>((resolve, reject) => {
//                     validator!(rule, value, msg => {
//                         msg ? reject({ key, msg}) : resolve();
//                     });
//                 });
//                 // addError(key, p);
//                 promiseList.push(p);
//             }
//         });
//     }
//     if (promiseList.length > 0) {
//         Promise.allSettled(promiseList).then(
//             (res) => {
//                 res.forEach(c => {
//                     if (c.status === 'rejected') addError(c.reason.key, c.reason.msg);
//                 });
//                 cb(errors as Errors);
//             }
//         )
//     } else {
//         cb(errors as Errors);
//     }
//     return errors;
// };

export const validate = (name: NamePath, value: StoreValue, rules: Rule[]): Promise<string[]> => {

    return new Promise((resolve, reject) => {
        const errors: string[] = [];
        const validatorPromise: Promise<unknown>[] = [];
        rules.forEach(rule => {
            const { required, min, max, validator, message } = rule;
            if (message && required && isEmpty(value)) errors.push(message);
            if (message && !isEmpty(value)) {
                const minIsNum = typeof min === 'number';
                const maxIsNum = typeof max === 'number';
                if (minIsNum && maxIsNum) {
                    if (value.length < (min as number) || value.length > (max as number)) errors.push(message);
                } else if (maxIsNum && value.length > (max as number)) {
                    if (value.length > (max as number)) errors.push(message);
                } else if (minIsNum && value.length < (min as number)) {
                    if (value.length < (min as number)) errors.push(message);
                }
            }
            if (validator) {
                validatorPromise.push(validator(value));
            }
        });
        if (validatorPromise.length) {
            Promise.allSettled(validatorPromise).then(results => {
                results.forEach(result => {
                    if (result.status === 'rejected') {
                        errors.push(result.reason);
                    }
                });
                errors.length ? reject(errors) : resolve([]);
            });
        } else {
            errors.length ? reject(errors) : resolve([]);
        }
    });
};
