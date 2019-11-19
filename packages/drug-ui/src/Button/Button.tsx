import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from '@drug-ui/styles';
import { capitalize } from '../utils';
import Ripple from './Ripple';
import Icons from '../Icon';
import { styles } from './Button.style';
import { Theme } from '../styles'

export type Variant = 'text' | 'outlined' | 'contained' | 'fab';
export type Color = 'default' | 'primary' | 'secondary' | 'inherit';
export type Size = 'small' | 'medium' | 'large';

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
    children?: React.ReactNode,
    component?: React.ElementType;
    ref?: React.Ref<HTMLButtonElement>
}

type ButtonClassProps =
    'root'
    | 'contained'
    | 'containedPrimary'
    | 'containedSecondary'
    | 'text'
    | 'textPrimary'
    | 'textSecondary'
    | 'outlined'
    | 'outlinedPrimary'
    | 'outlinedSecondary'
    | 'fab'
    | 'fabPrimary'
    | 'fabSecondary'
    | 'icon'
    | 'colorInherit'
    | 'fullWidth'
    | 'disabled';

const name = 'Button';

const useStyles = createUseStyles<Theme, ButtonClassProps>(styles, { name });

// todo Fab 组件
const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, variant = 'text', color = 'default', size, disabled, disableRipple, component, fullWidth: defaultFullWidth, href, round, fab, icon, loading, children, ...rest } = props;
    const Component = href ? 'a' : component === void 0 ? 'button' : component;
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        [classes[variant]],
        {
            [classes[`${ variant }${ capitalize(color) }`]]: color !== 'inherit' && color !== 'default',
            [classes.colorInherit]: color === 'inherit',
            [classes.fullWidth]: defaultFullWidth,
            [classes.icon]: icon,
            [classes.disabled]: disabled
        }
    );

    const newChildren = React.Children.map(children, child => {
        const type = typeof child;
        if (type === 'string' || type === 'number') {
            return <span className='label'>{ child }</span>;
        }
        return child;
    });

    return (
        <Component
            className={ classNames }
            ref={ ref }
            href={ href }
            disabled={ disabled }
            { ...rest }>
            { newChildren }
            { loading ? <Icons className="icon-spin" name="loading"/> : null }
            { !disableRipple ? <Ripple center={ icon }/> : null }
        </Component>
    );
});

Button.displayName = name;
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
