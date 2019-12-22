import { FormValue } from './Form';

interface Validate {
    [key: string]: Array<string | Promise<string | undefined>>;
}

export interface Rule {
    required?: boolean;
    message?: string;
    min?: number;
    max?: number;
    validator?: (rule: Rule, value: any, cb: (str?: string) => void) => void;
}

export interface Rules {
    [key: string]: Rule[];
}

const isEmpty = (value: any): boolean => {
    if (value instanceof Array && value.length === 0) return true;
    return value === undefined || value === null || value === '';
};

export const validate = (formValue: FormValue, rules: Rules): Validate => {
    const errors: Validate = {};

    const addError = (key: string, message: string | undefined | Promise<string | undefined>) => {
        if (errors[key] === undefined) errors[key] = [];
        if (!message) message = '';
        errors[key].push(message);
    };

    for (let key in rules) {
        const value = formValue[key];
        rules[key].forEach(rule => {
            const { required, min, max, validator, message } = rule;
            if (required && isEmpty(value)) addError(key, message);

            if (!isEmpty(value)) {
                const minIsNum = typeof min === 'number';
                const maxIsNum = typeof max === 'number';
                if (minIsNum && maxIsNum) {
                    if (value.length < (min as number) || value.length > (max as number)) addError(key, message);
                } else if (maxIsNum && value.length > (max as number)) {
                    if (value.length > (max as number)) addError(key, message);
                } else if (minIsNum && value.length < (min as number)) {
                    if (value.length < (min as number)) addError(key, message);
                }
            }

            if (validator) {
                addError(key, new Promise((resolve, reject) => {
                    validator!(rule, value, msg => {
                        msg ? reject(msg) : resolve();
                    });
                }));
            }
        });
    }
    return errors;
};
