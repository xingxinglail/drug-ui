import { FormValue } from './Form';
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
    validator?: (rule: Rule, value: any, cb: (str?: string) => void) => void;
}
export interface Rules {
    [key: string]: Rule[];
}
export declare const validate: (formValue: FormValue, rules: Rules, cb: (errors: Errors) => void) => Validate;
export {};
