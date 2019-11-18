import * as React from 'react';
export declare type Variant = 'text' | 'outlined' | 'contained' | 'fab';
export declare type Color = 'default' | 'primary' | 'secondary' | 'inherit';
export declare type Size = 'small' | 'medium' | 'large';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    color?: Color;
    size?: Size;
    disabled?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    href?: string;
    round?: boolean;
    fab?: boolean;
    icon?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
    component?: React.ElementType;
    ref?: React.Ref<HTMLButtonElement>;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
