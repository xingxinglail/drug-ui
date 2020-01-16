import * as React from 'react';
import { Rules } from './validate';
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    initialState?: {
        [key: string]: any;
    };
    onSubmit?: (e: React.FormEvent) => void;
    rules?: Rules;
    ref?: React.Ref<HTMLFormElement>;
}
export interface FormValue {
    [key: string]: any;
}
declare const Form: React.FC<FormProps>;
export default Form;
