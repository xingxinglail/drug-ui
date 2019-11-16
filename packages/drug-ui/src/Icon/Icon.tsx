import * as React from 'react';
import './style/index.scss';
import './importIcons';
import { classes } from '../utils';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    name: string;
    className?: string;
    ref?: React.Ref<SVGSVGElement>
}

const Icon: React.FC<IconProps> = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { name, className, ...rest } = props;
    return (
        <svg
            className={ classes('drug-icon', className) }
            ref={ ref }
            { ...rest }>
            <use xlinkHref={ `#${ name }` }/>
        </svg>
    );
});

export default Icon;
