import * as React from 'react';
import { PropTypes as ComponentPropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';
export declare type Variant = 'text' | 'outlined' | 'contained';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
    variant?: Variant;
    color?: ComponentPropTypes.Color;
    size?: ComponentPropTypes.Size;
    fullWidth?: boolean;
    round?: boolean;
    loading?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
