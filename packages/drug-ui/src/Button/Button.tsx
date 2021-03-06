import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PropTypes as ComponentPropTypes } from '..';
import classnames from 'classnames';
import { capitalize } from '../utils';
import { styles } from './Button.style';
import { createUseStyles } from '../styles';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';

export type Variant = 'text' | 'outlined' | 'contained';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
    variant?: Variant;
    color?: ComponentPropTypes.Color;
    size?: ComponentPropTypes.Size;
    fullWidth?: boolean;
    href?: string;
    round?: boolean;
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
    | 'colorInherit'
    | 'fullWidth'
    | 'disabled'
    | 'containedSizeSmall'
    | 'containedSizeLarge'
    | 'textSizeSmall'
    | 'textSizeLarge'
    | 'outlinedSizeSmall'
    | 'outlinedSizeLarge'
    | 'round'
    | 'label';

export const name = 'Button';

const useStyles = createUseStyles<ButtonClassProps>(styles, name);

const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, variant = 'text', color = 'default', size = 'medium', disabled, component, fullWidth: defaultFullWidth, round, children, ...rest } = props;
    const classes = useStyles();
    const colorClass = classes[`${ variant }${ capitalize(color) }`];
    const sizeClass = classes[`${ variant }Size${ capitalize(size) }`];
    const classNames = classnames(
        classes.root,
        [classes[variant]],
        {
            [colorClass]: color !== colorClass && 'inherit' && color !== 'default',
            [sizeClass]: sizeClass && size !== 'medium',
            [classes.colorInherit]: color === 'inherit',
            [classes.fullWidth]: defaultFullWidth,
            [classes.round]: round,
            [classes.disabled]: disabled
        },
        className
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
            disabled={ disabled }
            { ...rest }>
            { newChildren }
        </ButtonBase>
    );
});

Button.displayName = name;

Button.defaultProps = {
    variant: 'text',
    color: 'default',
    size: 'medium',
    fullWidth: false,
    round: false
};

Button.propTypes = {
    variant: PropTypes.oneOf<Variant>(['text', 'outlined', 'contained']),
    color: PropTypes.oneOf<ComponentPropTypes.Color>(['default', 'primary', 'secondary', 'inherit']),
    size: PropTypes.oneOf<ComponentPropTypes.Size>(['small', 'medium', 'large']),
    fullWidth: PropTypes.bool,
    round: PropTypes.bool,
    href: PropTypes.string
};

if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    Button.useStyles = useStyles;
}

export default Button;
