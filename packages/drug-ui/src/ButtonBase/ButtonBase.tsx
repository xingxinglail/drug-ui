import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from './ButtonBase.style';
import { createUseStyles } from '../styles';
import Ripple from './Ripple';

export interface ButtonBaseProps {
    className?: string;
    href?: string;
    disabled?: boolean;
    disableRipple?: boolean;
    centerRipple?: boolean;
    children?: React.ReactNode,
    component?: React.ElementType;
}

type ButtonBaseClassProps = 'root' | 'disabled';
const name = 'ButtonBase';
const useStyles = createUseStyles<ButtonBaseClassProps>(styles, name);

const ButtonBase: React.FC<ButtonBaseProps> = React.forwardRef<HTMLButtonElement, ButtonBaseProps>((props, ref) => {
    const { className, component = 'button', disabled, centerRipple, disableRipple, children, ...rest } = props;
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        {
            [classes.disabled]: disabled
        },
        className
    );

    let ComponentProp = component;

    if (ComponentProp === 'button' && rest.href) {
        ComponentProp = 'a';
    }

    return (
        <ComponentProp
            className={ classNames }
            ref={ ref }
            disabled={ disabled }
            { ...rest }>
            { children }
            { !disableRipple ? <Ripple center={ centerRipple } /> : null }
        </ComponentProp>
    );
});

ButtonBase.displayName = name;
ButtonBase.defaultProps = {
    className: undefined,
    disabled: false,
    disableRipple: false,
    centerRipple: false,
    component: 'button'
};

ButtonBase.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disableRipple: PropTypes.bool,
    centerRipple: PropTypes.bool
};

export default ButtonBase;
