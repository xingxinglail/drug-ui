import React, { FC, forwardRef, SVGAttributes } from 'react';
import './style/index.scss';
import './importIcons';
import { classes } from '../_util';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
    name: string;
    className?: string;
    ref?: React.Ref<SVGSVGElement>
}

const Icon: FC<IconProps> = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
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
