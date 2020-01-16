import * as React from 'react';
import { PropTypes as ComponentPropTypes, SimpleSpread } from '..';
interface PropsExtra {
    size?: ComponentPropTypes.Size;
}
export interface InputProps extends SimpleSpread<React.InputHTMLAttributes<HTMLInputElement>, PropsExtra> {
    defaultValue?: string;
    value?: string;
    label?: string;
    id?: string;
    placeholder?: string;
    error?: boolean;
    onChange?: (e: React.ChangeEvent) => void;
    ref?: React.Ref<HTMLInputElement>;
}
declare const Input: React.FC<InputProps>;
export default Input;
