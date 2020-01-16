import * as React from 'react';
import { Rule } from '../Form/validate';
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string;
    error?: boolean;
    rules?: Rule[];
    children: React.ReactElement;
    onSubmit?: (e: React.FormEvent) => void;
    ref?: React.Ref<HTMLDivElement>;
}
declare const FormField: React.FC<FormFieldProps>;
export default FormField;
