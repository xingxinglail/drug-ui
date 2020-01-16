import * as React from 'react';
import { PropTypes as ComponentPropTypes } from '../index';
import { Variant } from '../Button';
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: Variant;
    color?: ComponentPropTypes.Color;
    size?: ComponentPropTypes.Size;
    ref?: React.Ref<HTMLDivElement>;
}
declare const ButtonGroup: React.FC<ButtonGroupProps>;
export default ButtonGroup;
