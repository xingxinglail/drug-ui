import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from '@drug-ui/styles';
import { capitalize } from '../utils';
import Ripple from './Ripple';
import Icons from '../Icon';
import { styles } from './Button.style';
import { Theme } from '../styles';
import ButtonBase from '../ButtonBase';

export type Variant = 'text' | 'outlined' | 'contained';
export type Color = 'default' | 'primary' | 'secondary' | 'inherit';
export type Size = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    color?: Color;
    size?: Size;
    disabled?: boolean;
    fullWidth?: boolean;
    href?: string;
    round?: boolean;
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
    | 'disabled'
    | 'containedSizeSmall'
    | 'containedSizeLarge'
    | 'textSizeSmall'
    | 'textSizeLarge'
    | 'outlinedSizeSmall'
    | 'outlinedSizeLarge' | 'round' | 'label' | 'loading';

const name = 'Button';

const useStyles = createUseStyles<Theme, ButtonClassProps>(styles, { name });

const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, variant = 'text', color = 'default', size = 'medium', disabled, component, fullWidth: defaultFullWidth, href, round, loading, children, ...rest } = props;
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        [classes[variant]],
        {
            [classes[`${ variant }${ capitalize(color) }`]]: color !== 'inherit' && color !== 'default',
            [classes[`${ variant }Size${ capitalize(size) }`]]: size !== 'medium',
            [classes.colorInherit]: color === 'inherit',
            [classes.fullWidth]: defaultFullWidth,
            [classes.round]: round,
            [classes.loading]: loading,
            [classes.disabled]: disabled
        }
    );

    const newChildren = React.Children.map(children, child => {
        const type = typeof child;
        if (type === 'string' || type === 'number') {
            return <span className={ classes.label }>{ child }</span>;
        }
        return child;
    });

    return (
        <ButtonBase
            className={ classNames }
            component={ component }
            ref={ ref }
            href={ href }
            disabled={ disabled }
            { ...rest }>
            { newChildren }
            { loading ? <Icons name="loading" className="loading" /> : null }
            {/*{ !disableRipple ? <Ripple center={ icon }/> : null }*/}
        </ButtonBase>
    );
});

Button.displayName = name;
Button.defaultProps = {
    variant: 'text',
    color: 'default',
    size: 'medium',
    disabled: false,
    fullWidth: false,
    loading: false,
    href: undefined,
    round: false,
    component: 'button'
};

Button.propTypes = {
    variant: PropTypes.oneOf<Variant>(['text', 'outlined', 'contained']),
    color: PropTypes.oneOf<Color>(['default', 'primary', 'secondary', 'inherit']),
    size: PropTypes.oneOf<Size>(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    fullWidth: PropTypes.bool,
    href: PropTypes.string,
    round: PropTypes.bool,
    // component: PropTypes.elementType
};

export default Button;
