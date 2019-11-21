import * as React from 'react';
export interface ButtonBaseProps {
    className?: string;
    disabled?: boolean;
    disableRipple?: boolean;
    centerRipple?: boolean;
    href?: string;
    children?: React.ReactNode;
    component?: React.ElementType;
}
declare const ButtonBase: React.FC<ButtonBaseProps>;
export default ButtonBase;
