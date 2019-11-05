import React, { FC, SVGAttributes } from 'react';
import './style/index.scss';
import './importIcons';
import { classes } from '../_util';

interface IconProps extends SVGAttributes<SVGElement> {
    name: string;
}

const Index: FC<IconProps> = ({ className, name, ...rest }) => {
    return (
        <svg className={ classes('drug-icon', className) }
            { ...rest }>
            <use xlinkHref={ `#${ name }` }/>
        </svg>
    );
};

export default Index;
