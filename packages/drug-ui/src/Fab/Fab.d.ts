import * as React from 'react';
import { PropTypes as ComponentPropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';
export interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
    color?: ComponentPropTypes.Color;
    size?: ComponentPropTypes.Size;
    href?: string;
    disabled?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
}
declare const Fab: React.FC<FabProps>;
export default Fab;
