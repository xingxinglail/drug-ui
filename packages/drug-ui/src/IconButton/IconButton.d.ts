import * as React from 'react';
import { PropTypes as ComponentPropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
    color?: ComponentPropTypes.Color;
    size?: ComponentPropTypes.Size;
    href?: string;
    disabled?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
}
declare const IconButton: React.FC<IconButtonProps>;
export default IconButton;
