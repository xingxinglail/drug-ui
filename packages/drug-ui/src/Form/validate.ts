import { NamePath, StoreValue, FormInstance } from './interface';

export interface RuleConfig {
    required?: boolean;
    message?: string;
    min?: number;
    max?: number;
    validator?: (value: StoreValue) => Promise<unknown>;
}

export type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);

export interface Rules {
    [key: string]: Rule[];
}

const isEmpty = (value: any): boolean => {
    if (value instanceof Array && value.length === 0) return true;
    return value === undefined || value === null || value === '';
};

export const validate = (name: NamePath, value: StoreValue, rules: RuleConfig[]): Promise<string[]> => {
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
