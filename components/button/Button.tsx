import { createElement, ElementType, FC, ReactNode, useRef } from 'react';
import PropTypes from 'prop-types';
import { classes, scopedClassMaker } from '../_util';
import { useRipple } from '../_use';

import './style/index.scss';

type Variant = 'text' | 'outlined' | 'contained' | 'fab';
type Color = 'default' | 'primary' | 'secondary' | 'inherit';
type Size = 'small' | 'medium' | 'large';

export interface ButtonProps {
    variant?: Variant;
    color?: Color;
    size?: Size;
    disabled?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    href?: string;
    round?: boolean;
    fab?: boolean;
    children?: ReactNode,
    component?: ElementType;
}

const scopedClass = scopedClassMaker('drug-button');

const Button: FC<ButtonProps> = (props) => {
    const { variant, color, size, disabled, disableRipple, component, fullWidth, href, round, fab, children } = props;
    const ref = useRef<HTMLElement>(null);
    const _component = href ? 'a' : component === void 0 ? 'button' : component;
    if (!disableRipple) useRipple({ ref });

    let colorClassName = '';
    if (color === 'inherit') {
        colorClassName = scopedClass('color-inherit');
    } else if (color !== 'default') {
        colorClassName = scopedClass(`${ variant }-${ color }`);
    }

    const className = classes(
        scopedClass(),
        scopedClass(variant),
        colorClassName,
        round ? scopedClass('round') : '',
        size !== 'medium' ? scopedClass(`${ variant }-${ size }`) : '',
        fullWidth ? scopedClass('full-width') : '',
        fab ? scopedClass('fab') : '',
        disabled ? scopedClass(`${ variant }-disabled`) : '',
        disabled ? scopedClass('disabled') : '');

    return createElement(_component, {
        className,
        ref,
        href,
        disabled
    }, createElement('span', {
        className: scopedClass('label')
    }, children));
};

Button.defaultProps = {
    variant: 'text',
    color: 'default',
    size: 'medium',
    disabled: false,
    disableRipple: false,
    fullWidth: false,
    href: undefined,
    round: false,
    component: 'button'
};

Button.propTypes = {
    variant: PropTypes.oneOf(['text', 'outlined', 'contained', 'fab']),
    color: PropTypes.oneOf(['default', 'primary', 'secondary', 'inherit']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    disableRipple: PropTypes.bool,
    fullWidth: PropTypes.bool,
    href: PropTypes.string,
    round: PropTypes.bool
    // component: PropTypes.elementType
};

export default Button;
