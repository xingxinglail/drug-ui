import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PropTypes as ComponentPropTypes } from '..';
import classnames from 'classnames';
import { createUseStyles } from '@drug-ui/styles';
import { Loading } from '@drug-ui/icons';
import { capitalize } from '../utils';
import { styles } from './Button.style';
import { Theme } from '../styles';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';

export type Variant = 'text' | 'outlined' | 'contained';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
    variant?: Variant;
    color?: ComponentPropTypes.Color;
    size?: ComponentPropTypes.Size;
    fullWidth?: boolean;
    round?: boolean;
    loading?: boolean;
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
    | 'outlinedSizeLarge'
    | 'round'
    | 'label'
    | 'loading';

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
            <Loading/>
            { newChildren }
            {/*{ loading ? <Icons name="loading" className="loading"/> : null }*/ }
        </ButtonBase>
    );
});

Button.displayName = name;

Button.defaultProps = {
    variant: 'text',
    color: 'default',
    size: 'medium',
    fullWidth: false,
    loading: false,
    round: false
};

Button.propTypes = {
    variant: PropTypes.oneOf<Variant>(['text', 'outlined', 'contained']),
    color: PropTypes.oneOf<ComponentPropTypes.Color>(['default', 'primary', 'secondary', 'inherit']),
    size: PropTypes.oneOf<ComponentPropTypes.Size>(['small', 'medium', 'large']),
    loading: PropTypes.bool,
    fullWidth: PropTypes.bool,
    round: PropTypes.bool
};

export default Button;
