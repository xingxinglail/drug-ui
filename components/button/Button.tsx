import
    React, {
    forwardRef,
    ElementType,
    FC,
    ReactNode,
    Children,
    ButtonHTMLAttributes
} from 'react';
import PropTypes from 'prop-types';
import { classes, scopedClassMaker } from '../_util';
import Ripple from './Ripple';

import './style/index.scss';
import { Icon } from '../index';

export type Variant = 'text' | 'outlined' | 'contained' | 'fab';
export type Color = 'default' | 'primary' | 'secondary' | 'inherit';
export type Size = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    children?: ReactNode,
    component?: ElementType;
    ref?: React.Ref<HTMLButtonElement>
}

const scopedClass = scopedClassMaker('drug-button');

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { variant, color, size, disabled, disableRipple, component, fullWidth, href, round, fab, icon, loading, children, ...rest } = props;
    const Component = href ? 'a' : component === void 0 ? 'button' : component;
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
        icon ? scopedClass('icon') : '',
        loading ? scopedClass('loading') : '',
        disabled ? scopedClass(`${ variant }-disabled`) : '',
        disabled ? scopedClass('disabled') : '');

    const newChildren = Children.map(children, child => {
        const type = typeof child;
        if (type === 'string' || type === 'number') {
            return <span className={ scopedClass('label') }>{ child }</span>;
        }
        return child;
    });

    return (
        <Component
            className={ className }
            ref={ ref }
            href={ href }
            disabled={ disabled }
            { ...rest }>
            { newChildren }
            { loading ? <Icon className="icon-spin" name="loading" /> : null }
            { !disableRipple ? <Ripple center={ icon }/> : null }
        </Component>
    );
});


Button.defaultProps = {
    variant: 'text',
    color: 'default',
    size: 'medium',
    disabled: false,
    disableRipple: false,
    fullWidth: false,
    href: undefined,
    round: false,
    icon: false,
    loading: false,
    component: 'button'
};

Button.propTypes = {
    variant: PropTypes.oneOf<Variant>(['text', 'outlined', 'contained', 'fab']),
    color: PropTypes.oneOf<Color>(['default', 'primary', 'secondary', 'inherit']),
    size: PropTypes.oneOf<Size>(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    disableRipple: PropTypes.bool,
    fullWidth: PropTypes.bool,
    href: PropTypes.string,
    round: PropTypes.bool,
    icon: PropTypes.bool,
    loading: PropTypes.bool
    // component: PropTypes.elementType
};

export default Button;
